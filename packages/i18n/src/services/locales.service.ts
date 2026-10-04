import { EventDispatcher } from "@ribajs/events";
import type {
  Langcode,
  LocalesEvents,
  LocalesOptions,
  LocalVars,
  MessageTree,
} from "../types/index.js";
import {
  getHtmlLangcode,
  getNavigatorLangcodes,
  getQueryLangcode,
  matchLangcode,
  readStorage,
  setHtmlLangcode,
  writeStorage,
} from "../utils/environment.js";
import { Translator } from "./translator.js";

const DEFAULT_STORAGE_KEY = "riba:i18n:langcode";

/**
 * Base of all locale sources. It owns the language state (source, current,
 * detection, persistence) and delegates the key lookup to the `Translator`.
 * Subclasses only say how the messages of one language are loaded.
 */
export abstract class LocalesService {
  /** Events of this service only, see `LocalesEvents` */
  public readonly event = new EventDispatcher();

  protected readonly options: LocalesOptions;
  protected readonly translator: Translator;
  protected langcodes: string[];
  protected sourceLangcode = "en";
  protected currentLangcode?: string;
  protected trees = new Map<string, MessageTree>();
  protected loading = new Map<string, Promise<void>>();
  protected loaded = new Set<string>();

  private initPromise?: Promise<void>;
  private switchToken = 0;
  private disposed = false;
  private _ready = false;

  constructor(options: LocalesOptions = {}) {
    this.options = options;
    this.langcodes = [...(options.langcodes || [])];
    this.translator = new Translator({
      getTree: (langcode) => this.trees.get(langcode),
      fallbackLangcodes: options.fallbackLangcodes,
    });
  }

  public get ready() {
    return this._ready;
  }

  /**
   * Load the messages of one language.
   * Resolve with `undefined` if this language has no messages of its own.
   */
  protected abstract load(langcode: string): Promise<MessageTree | undefined>;

  /** The selectable languages, called once by `init()` */
  protected async resolveLangcodes(): Promise<string[]> {
    if (!this.langcodes.length) {
      throw new Error(
        "[i18n] The langcodes option is required for this locales service.",
      );
    }
    return this.langcodes;
  }

  /**
   * Detect the initial language and load its messages.
   * Safe to call more than once, every call returns the same promise.
   */
  public init(): Promise<void> {
    if (!this.initPromise) {
      this.initPromise = this.runInit().catch((error: unknown) => {
        const err = error instanceof Error ? error : new Error(String(error));
        this.event.trigger("error", err);
        throw err;
      });
    }
    return this.initPromise;
  }

  /** Resolves once the service is ready, starts `init()` if nobody did */
  public whenReady(): Promise<void> {
    return this.init();
  }

  public getLangcode() {
    return this.currentLangcode;
  }

  public getSourceLangcode() {
    return this.sourceLangcode;
  }

  public getAvailableLangcodes(): Langcode[] {
    return this.langcodes.map((code) => ({
      code,
      active: code === this.currentLangcode,
    }));
  }

  /** Subscribe to a typed event, returns the function that unsubscribes */
  public on<K extends keyof LocalesEvents>(
    name: K,
    callback: (...args: LocalesEvents[K]) => void,
  ): () => void {
    this.event.on(name, callback as (...args: unknown[]) => void);
    return () => this.event.off(name, callback as (...args: unknown[]) => void);
  }

  /**
   * Switch the language and load its messages first, so the `changed` event
   * fires when translations can be read synchronously.
   */
  public async setLangcode(langcode: string): Promise<void> {
    await this.init();
    const target = matchLangcode(langcode, [
      ...this.langcodes,
      this.sourceLangcode,
    ]);
    if (!target) {
      throw new Error(`[i18n] Unknown langcode "${langcode}"`);
    }
    const token = ++this.switchToken;
    try {
      await this.ensureLoaded(target);
    } catch (error) {
      this.event.trigger("error", error);
      throw error;
    }
    // a later switch or dispose() won while the messages were loading
    if (token !== this.switchToken || this.disposed) {
      return;
    }
    this.applyLangcode(target, true);
  }

  /** Load the messages of a language ahead of a switch */
  public async preload(langcode: string): Promise<void> {
    await this.init();
    await this.ensureLoaded(langcode);
  }

  /** Does the active language (or a fallback) have a message for this key? */
  public has(
    path: string | string[],
    langcode = this.currentLangcode,
  ): boolean {
    return this.lookup(path, undefined, langcode) !== undefined;
  }

  /**
   * Read a message without applying the `missing` strategy or emitting `missing`.
   * `undefined` means no language of the fallback chain has the key.
   */
  public lookup(
    path: string | string[],
    vars?: LocalVars,
    langcode = this.currentLangcode,
  ): string | undefined {
    this.assertReady();
    return this.translator.translate(langcode as string, path, vars);
  }

  /**
   * Read a message and apply the `missing` option when no language has it.
   * @throws if the service is not ready
   */
  public translate(
    path: string | string[],
    vars?: LocalVars,
    langcode = this.currentLangcode,
  ): string | undefined {
    const message = this.lookup(path, vars, langcode);
    if (message !== undefined) {
      return message;
    }
    const key = Array.isArray(path) ? path.join(".") : path;
    this.event.trigger("missing", key, langcode);
    switch (this.options.missing) {
      case "marker":
        return `translation missing: "${key}"`;
      case "throw":
        throw new Error(
          `[i18n] Translation missing: "${key}" (${langcode as string})`,
        );
      default:
        return undefined;
    }
  }

  /** Drop all listeners and cached messages, the service is unusable afterwards */
  public dispose() {
    this.disposed = true;
    this.switchToken++;
    this.event.off();
    this.trees.clear();
    this.loading.clear();
    this.loaded.clear();
    this._ready = false;
  }

  protected assertReady() {
    if (!this._ready) {
      throw new Error(
        "[i18n] The locales service is not ready, await init() or wait for the ready event.",
      );
    }
  }

  protected async ensureLoaded(langcode: string) {
    const wanted = this.translator
      .chain(langcode)
      .filter((code) => this.langcodes.includes(code));
    await Promise.all(wanted.map((code) => this.loadOnce(code)));
  }

  private loadOnce(langcode: string): Promise<void> {
    if (this.loaded.has(langcode)) {
      return Promise.resolve();
    }
    let pending = this.loading.get(langcode);
    if (!pending) {
      pending = this.load(langcode)
        .then((tree) => {
          if (tree) {
            this.trees.set(langcode, tree);
          }
          this.loaded.add(langcode);
        })
        .finally(() => this.loading.delete(langcode));
      this.loading.set(langcode, pending);
    }
    return pending;
  }

  private async runInit() {
    // read before anything awaits, the html lang changes with the first switch
    this.sourceLangcode =
      this.options.sourceLangcode || getHtmlLangcode() || "en";
    this.langcodes = await this.resolveLangcodes();
    const initial = this.detectLangcode();
    await this.ensureLoaded(initial);
    if (this.disposed) {
      return;
    }
    this.applyLangcode(initial, false);
    this._ready = true;
    this.event.trigger("ready", initial);
  }

  private detectLangcode(): string {
    const available = [...this.langcodes, this.sourceLangcode];
    const query = this.options.queryParam || "lang";
    const storageKey = this.options.storageKey || DEFAULT_STORAGE_KEY;
    for (const source of this.options.detect || ["html"]) {
      let candidates: Array<string | undefined> = [];
      if (source === "query") {
        candidates = [getQueryLangcode(query)];
      } else if (source === "storage") {
        candidates = [readStorage(storageKey)];
      } else if (source === "html") {
        candidates = [getHtmlLangcode()];
      } else if (source === "navigator") {
        candidates = getNavigatorLangcodes();
      }
      for (const candidate of candidates) {
        const match = candidate && matchLangcode(candidate, available);
        if (match) {
          return match;
        }
      }
    }
    return this.sourceLangcode;
  }

  private applyLangcode(langcode: string, userChoice: boolean) {
    const previous = this.currentLangcode;
    this.currentLangcode = langcode;
    if (this.options.syncHtmlLang !== false) {
      setHtmlLangcode(langcode);
    }
    if (!userChoice) {
      return;
    }
    if (this.options.persist) {
      writeStorage(this.options.storageKey || DEFAULT_STORAGE_KEY, langcode);
    }
    if (previous !== langcode) {
      this.event.trigger("changed", langcode, previous);
    }
  }
}
