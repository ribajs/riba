import { Component, ScopeBase } from "@ribajs/core";
import { LoremIpsum } from "lorem-ipsum";
import { IGeneratorOptions } from "lorem-ipsum/src/lib/generator";
interface Scope extends ScopeBase {
  generateWords?: number;
  generateSentences?: number;
  generateParagraphs?: number;
  format: "plain" | "html";
}

export class LoremIpsumComponent extends Component {
  public static tagName = "rv-lorem-ipsum";

  protected options: IGeneratorOptions = {
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  };

  protected lorem?: LoremIpsum;

  protected autobind = true;

  static get observedAttributes(): string[] {
    return [
      "sentences-per-paragraph-max",
      "sentences-per-paragraph-min",
      "words-per-sentence-max",
      "words-per-sentence-min",
      "words",
      "generate-words",
      "generate-sentences",
      "generate-paragraphs",
      "format",
    ];
  }

  public scope: Scope = {
    generateParagraphs: 1,
    format: "html",
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(LoremIpsumComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      return view;
    });
  }

  protected async beforeBind() {
    await super.beforeBind();
  }

  protected async afterBind() {
    this.lorem = new LoremIpsum(this.options, this.scope.format);
    if (this.scope.generateWords) {
      this.innerHTML = this.lorem.generateWords(this.scope.generateWords);
    } else if (this.scope.generateSentences) {
      this.innerHTML = this.lorem.generateSentences(
        this.scope.generateSentences,
      );
    } else if (this.scope.generateParagraphs) {
      this.innerHTML = this.lorem.generateParagraphs(
        this.scope.generateParagraphs,
      );
    }
    await super.afterBind();
  }

  protected requiredAttributes() {
    return [];
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null,
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace,
    );
    switch (attributeName) {
      case "sentencesPerParagraphMax":
        if (this.options.sentencesPerParagraph) {
          this.options.sentencesPerParagraph.max = newValue;
        }
        break;
      case "sentencesPerParagraphMin":
        if (this.options.sentencesPerParagraph) {
          this.options.sentencesPerParagraph.min = newValue;
        }
        break;
      case "wordsPerSentenceMax":
        if (this.options.wordsPerSentence) {
          this.options.wordsPerSentence.max = newValue;
        }
        break;
      case "wordsPerSentenceMin":
        if (this.options.wordsPerSentence) {
          this.options.wordsPerSentence.min = newValue;
        }
        break;
      case "words":
        if (this.options.words) {
          this.options.words = newValue;
        }
        break;
    }
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    return null;
  }
}
