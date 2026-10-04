import { Component, ScopeBase } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

import template from "./demo-viewer.component.html?raw";
import { getLocalesService, uiText } from "../../ui-text.js";

/** Where the demo sources live, used for the "source on GitHub" link. */
const SOURCES_URL = "https://github.com/ribajs/riba/tree/main/demos";
/** Issue tracker of the demo repository, used for known-issue links. */
const ISSUES_URL = "https://github.com/ribajs/riba/issues";
/** Where the viewer reads the manifest snapshot that demo.pug embeds. */
const MANIFEST_ELEMENT_ID = "demos-manifest";

/** Frame width in CSS pixels, 0 means "use the full available width". */
const WIDTH_MOBILE = 375;
const WIDTH_TABLET = 768;
const WIDTH_FULL = 0;

/** A demo as written by scripts/build-demos.js into _demos/manifest.json. */
export interface DemoEntry {
  id: string;
  title: string;
  description: string;
  category: string;
  entries: string[];
  sizeKB: number;
  status: string;
  knownIssues: unknown[];
  error?: string;
}

/** A known issue normalized for rendering: a label plus an optional link. */
export interface DemoIssue {
  label: string;
  url: string;
}

/** Notices (English source) for demos that have no build output to show, keyed like `ui.viewer.status_message.<status>`. */
const STATUS_MESSAGES: Record<string, string> = {
  skipped: 'This demo is marked "skip", so there is no iframe to show.',
  "build-failed":
    "The build of this demo failed, so the iframe stays empty.",
};

/**
 * Reads the manifest snapshot that demo.pug embedded as
 * `<script type="application/json" id="demos-manifest">`.
 * The build is static, so the `?id=` query can only be resolved in the browser.
 * @returns demo entries, empty when the page was built without demos
 */
function readManifest(): DemoEntry[] {
  const json = document
    .getElementById(MANIFEST_ELEMENT_ID)
    ?.textContent?.trim();
  if (!json) {
    return [];
  }
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? (parsed as DemoEntry[]) : [];
  } catch (err) {
    console.warn("[rv-demo-viewer] demos manifest is not valid JSON:", err);
    return [];
  }
}

/**
 * Builds an issue link out of a GitHub issue number.
 * @param label text shown in the list
 * @param issue issue number
 */
function issueLink(label: string, issue: string): DemoIssue {
  return { label, url: `${ISSUES_URL}/${issue}` };
}

/**
 * `knownIssues` is free-form in the demo `package.json`, so accept a number, a
 * string or an object and normalize everything to a label plus an optional link.
 * @param issues raw manifest value
 */
function normalizeIssues(issues: unknown): DemoIssue[] {
  if (!Array.isArray(issues)) {
    return [];
  }
  return issues.map((issue) => {
    if (typeof issue === "number") {
      return issueLink(`#${issue}`, String(issue));
    }
    if (typeof issue === "string") {
      const text = issue.trim();
      if (/^https?:\/\//.test(text)) {
        return { label: text, url: text };
      }
      if (/^\d+$/.test(text)) {
        return issueLink(`#${text}`, text);
      }
      return { label: text, url: "" };
    }
    if (issue && typeof issue === "object") {
      const record = issue as Record<string, unknown>;
      const number = record.issue ?? record.number;
      const label = String(
        record.title ?? record.label ?? record.description ?? "",
      );
      const url = String(record.url ?? "");
      if (url) {
        return { label: label || url, url };
      }
      if (number !== undefined && number !== null) {
        return issueLink(label || `#${number}`, String(number));
      }
      return { label, url: "" };
    }
    return { label: String(issue), url: "" };
  });
}

export interface Scope extends ScopeBase {
  found: boolean;
  notFound: boolean;
  requestedId: string;
  demo: DemoEntry;
  /** Title and description in the active language, English from the manifest as the fallback */
  title: string;
  description: string;
  issues: DemoIssue[];
  hasIssues: boolean;
  statusMessage: string;
  frameSrc: string;
  standaloneUrl: string;
  sourceUrl: string;
  frameMaxWidth: string;
  metaInfo: string;
  isMobile: boolean;
  isTablet: boolean;
  isFull: boolean;
  setWidth: DemoViewerComponent["setWidth"];
  reload: DemoViewerComponent["reload"];
}

/**
 * Viewer for a single demo, selected via `?id=<demo id>`.
 *
 * Mirrors IconPreviewComponent: the page itself is static, so the query string is
 * read right before the inner view binds (SPA-safe) and the demo is looked up in
 * the manifest snapshot that demo.pug embedded into the HTML.
 */
export class DemoViewerComponent extends Component {
  public static tagName = "rv-demo-viewer";

  protected autobind = true;

  static get observedAttributes() {
    return [];
  }

  public scope: Scope = {
    found: false,
    notFound: false,
    requestedId: "",
    demo: {
      id: "",
      title: "",
      description: "",
      category: "",
      entries: [],
      sizeKB: 0,
      status: "",
      knownIssues: [],
    },
    title: "",
    description: "",
    issues: [],
    hasIssues: false,
    statusMessage: "",
    frameSrc: "",
    standaloneUrl: "",
    sourceUrl: "",
    frameMaxWidth: "100%",
    metaInfo: "",
    isMobile: false,
    isTablet: false,
    isFull: true,
    setWidth: this.setWidth.bind(this),
    reload: this.reload.bind(this),
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(DemoViewerComponent.observedAttributes);
  }

  protected async beforeBind() {
    this.loadDemoFromLocation();
    const service = getLocalesService();
    if (service) {
      this.unsubscribes.push(
        service.on("ready", this.onLanguageChange),
        service.on("changed", this.onLanguageChange),
      );
    }
    await super.beforeBind();
  }

  protected disconnectedCallback() {
    this.unsubscribes.forEach((unsubscribe) => unsubscribe());
    this.unsubscribes = [];
    super.disconnectedCallback();
  }

  private unsubscribes: Array<() => void> = [];

  private onLanguageChange = () => this.refreshTexts();

  /**
   * Switches the frame between mobile, tablet and full width.
   * @param width frame width in CSS pixels, 0 for full width
   */
  public setWidth(width: number) {
    this.scope.isMobile = width === WIDTH_MOBILE;
    this.scope.isTablet = width === WIDTH_TABLET;
    this.scope.isFull = width === WIDTH_FULL;
    this.scope.frameMaxWidth = width > 0 ? `${width}px` : "100%";
  }

  /** Reloads the demo by resetting the iframe source. */
  public reload() {
    const frame = this.querySelector("iframe") as HTMLIFrameElement | null;
    if (frame && this.scope.frameSrc) {
      frame.src = this.scope.frameSrc;
    }
  }

  protected requiredAttributes() {
    return [];
  }

  protected template() {
    // Only set the component template if there are no child nodes yet.
    return hasChildNodesTrim(this) ? null : template;
  }

  /**
   * The texts that depend on the manifest entry and the active language.
   * The manifest holds the English title and description; a translation
   * from the catalog (`demos.<id>.*`) replaces them.
   */
  private refreshTexts() {
    const { demo } = this.scope;
    if (!this.scope.found) {
      return;
    }
    this.scope.title = uiText(`demos.${demo.id}.title`, demo.title);
    this.scope.description = uiText(
      `demos.${demo.id}.description`,
      demo.description,
    );
    const message = STATUS_MESSAGES[demo.status];
    this.scope.statusMessage = message
      ? uiText(`ui.viewer.status_message.${demo.status}`, message)
      : "";
    const status = uiText(
      `ui.status.${demo.status || "unknown"}`,
      demo.status || "unknown",
    );
    this.scope.metaInfo = [
      demo.category
        ? uiText("ui.viewer.category", "Category: {{ category }}", {
            category: demo.category,
          })
        : "",
      demo.sizeKB ? `${demo.sizeKB} kB` : "",
      uiText("ui.viewer.status", "Status: {{ status }}", { status }),
    ]
      .filter(Boolean)
      .join(" \u00b7 ");
  }

  /** Reads `?id=` from the URL right before the inner view binds (SPA-safe). */
  private loadDemoFromLocation() {
    const id =
      new URLSearchParams(window.location.search).get("id")?.trim() ?? "";
    this.scope.requestedId = id;

    const demo = id ? readManifest().find((entry) => entry.id === id) : undefined;
    this.scope.found = !!demo;
    this.scope.notFound = !!id && !demo;

    if (!demo) {
      this.scope.issues = [];
      this.scope.hasIssues = false;
      this.scope.statusMessage = "";
      this.scope.frameSrc = "";
      this.scope.standaloneUrl = "";
      this.scope.sourceUrl = "";
      this.scope.metaInfo = "";
      return;
    }

    const url = `demos/${demo.id}/`;
    this.scope.demo = demo;
    this.scope.issues = normalizeIssues(demo.knownIssues);
    this.scope.hasIssues = this.scope.issues.length > 0;
    this.scope.frameSrc = url;
    this.scope.standaloneUrl = `./${url}`;
    this.scope.sourceUrl = `${SOURCES_URL}/${demo.id}`;
    this.refreshTexts();
  }
}