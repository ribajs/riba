import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import * as monaco from "monaco-editor";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import pugTemplate from "./monaco-editor.component.pug";

interface Scope extends ScopeBase {
  dataValue: string;
  language?: string;
  theme: "vs" | "vs-dark" | "hc-black";
  readOnly: boolean;
  automaticLayout: boolean;
  minimapEnabled: boolean;
  /**
   * Autoformat document on set value
   */
  formatDocument: boolean;
  htmlFormatTabSize: number;
  htmlFormatInsertSpaces: boolean;
  htmlFormatIndentHandlebars: boolean;
  /*
   * Maximum amount of characters per line.
   */
  htmlFormatWrapLineLength: number;
  /**
   * List of tags that shouldn't be reformatted.
   */
  htmlFormatUnformatted: string;
  /**
   * List of tags, comma separated, where the content shouldn't be reformatted.
   */
  htmlFormatContentUnformatted: string;
  /**
   * List of tags that should have an extra newline before them.
   */
  htmlFormatExtraLiners: string;
  /**
   * Whether existing line breaks before elements should be preserved.
   */
  htmlFormatPreserveNewLines: boolean;
  /**
   * Maximum number of line breaks to be preserved in one chunk.
   */
  htmlFormatMaxPreserveNewLines: number;
  /**
   * End with a newline.
   */
  htmlFormatEndWithNewline: boolean;
  /**
   * Indent <head> and <body> sections.
   */
  htmlFormatIndentInnerHtml: boolean;
  /**
   * Wrapping strategy for attributes:
   * * `auto`: Wrap when the line length is exceeded
   * * `force`: Wrap all attributes, except first
   * * `force-aligned`: Wrap all attributes, except first, and align attributes
   * * `force-expand-multiline`: Wrap all attributes
   */
  htmlFormatWrapAttributes:
    | "auto"
    | "force"
    | "force-aligned"
    | "force-expand-multiline";
}

export class MonacoEditorComponent extends Component {
  public static tagName = "monaco-editor";

  protected autobind = true;

  public _debug = true;

  protected editor?: monaco.editor.IStandaloneCodeEditor;

  static get observedAttributes(): string[] {
    return [
      "data-value",
      "language",
      "theme",
      "read-only",
      "automatic-layout",
      "minimap-enabled",
      "format-document",
      "html-format-tabSize",
      "html-format-wrapLineLength",
      "html-format-unformatted",
      "html-format-contentUnformatted",
      "html-format-extraLiners",
      "html-format-preserveNewLines",
      "html-format-maxPreserveNewLines",
      "html-format-endWithNewline",
      "html-format-indentInnerHtml",
      "html-format-wrapAttributes"
    ];
  }

  public scope: Scope = {
    dataValue: "{}",
    /**
     * monaco editor options
     * for all options
     * @see https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html
     */
    language: undefined,
    theme: "vs-dark",
    readOnly: true,
    automaticLayout: false,
    minimapEnabled: false,
    formatDocument: false,
    htmlFormatTabSize: 4,
    htmlFormatInsertSpaces: true,
    htmlFormatIndentHandlebars: true,
    htmlFormatWrapLineLength: 0,
    htmlFormatUnformatted: "inline",
    htmlFormatContentUnformatted: "pre",
    htmlFormatExtraLiners: "head,body,/html",
    htmlFormatPreserveNewLines: true,
    htmlFormatMaxPreserveNewLines: 20,
    htmlFormatEndWithNewline: true,
    htmlFormatIndentInnerHtml: true,
    htmlFormatWrapAttributes: "force-aligned"
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(MonacoEditorComponent.observedAttributes);
  }

  protected async beforeBind() {
    await super.beforeBind();
  }

  protected async afterBind() {
    this.createEditor(this.scope.dataValue);
    await super.afterBind();
  }

  protected createEditor(value: any) {
    if (typeof value === "object") {
      value = JSON.stringify(value, null, 4);
    } else if (typeof value !== "string") {
      value = String(value);
    }

    if (this.editor) {
      return;
    }

    monaco.editor.onDidCreateEditor((/*editor*/) => {
      this.debug("onDidCreateEditor");
      // FIXME remove timeout
      setTimeout(() => {
        this.formatDocument();
      }, 2000);
    });

    monaco.languages.html.htmlDefaults.setOptions({
      format: {
        tabSize: this.scope.htmlFormatTabSize,
        insertSpaces: this.scope.htmlFormatInsertSpaces,
        indentHandlebars: this.scope.htmlFormatIndentHandlebars,
        wrapLineLength: this.scope.htmlFormatWrapLineLength,
        unformatted: this.scope.htmlFormatUnformatted,
        contentUnformatted: this.scope.htmlFormatContentUnformatted,
        extraLiners: this.scope.htmlFormatExtraLiners,
        preserveNewLines: this.scope.htmlFormatPreserveNewLines,
        maxPreserveNewLines: this.scope.htmlFormatMaxPreserveNewLines,
        endWithNewline: this.scope.htmlFormatEndWithNewline,
        indentInnerHtml: this.scope.htmlFormatIndentInnerHtml,
        wrapAttributes: this.scope.htmlFormatWrapAttributes
      }
    });

    this.editor = monaco.editor.create(this, {
      value: value as string,
      language: this.scope.language,
      theme: this.scope.theme,
      readOnly: this.scope.readOnly,
      automaticLayout: this.scope.automaticLayout,
      formatOnType: true, // TODO
      formatOnPaste: true, // TODO
      minimap: {
        enabled: this.scope.minimapEnabled
      }
    });

    this.editor.onDidChangeModelContent((/*event*/) => {
      if (this.editor) {
        this.scope.dataValue = this.editor.getValue();
        if (this.scope.dataValue) {
          this.dispatchEvent(
            new CustomEvent<string>("change", {
              detail: this.scope.dataValue
            })
          );
        }
        // this.debug('onDidChangeContent', this.scope.dataValue);
      }
    });
  }

  protected formatDocument() {
    if (this.editor && this.scope.formatDocument && this.scope.dataValue) {
      // this.editor.trigger(this.scope.dataValue, 'editor.action.formatDocument', {});
      this.debug("Format document");
      this.editor
        .getAction("editor.action.formatDocument")
        .run()
        .then(() => {
          this.debug("Document formatted");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  protected setValue(value: any) {
    if (typeof value === "object") {
      value = JSON.stringify(value, null, 4);
    } else if (typeof value !== "string") {
      value = String(value);
    }
    this.debug("setValue");
    if (this.editor) {
      this.editor.setValue(value);
      this.formatDocument();
    }
  }

  protected requiredAttributes(): string[] {
    return ["language", "dataValue"];
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    );
    this.debug("attributeName", attributeName);
    if (attributeName === "dataValue") {
      if (this.editor) {
        // Make it disable that this value updates automatically
        this.setValue(this.scope.dataValue);
      }
    }
  }

  // deconstruction
  protected disconnectedCallback() {
    if (this.editor) {
      this.editor.dispose();
    }
    super.disconnectedCallback();
  }

  protected template(): ReturnType<TemplateFunction> {
    let template: string | null = null;
    // Only set the component template if there no childs already
    if (this && hasChildNodesTrim(this)) {
      return null;
    } else {
      template = pugTemplate(this.scope);
      this.debug("Use template", template);
      return template;
    }
  }
}
