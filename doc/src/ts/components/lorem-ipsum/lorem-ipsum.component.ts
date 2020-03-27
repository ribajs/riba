import {
  Component,
} from '@ribajs/core';
import { LoremIpsum } from 'lorem-ipsum';
import { IGeneratorOptions } from 'lorem-ipsum/src/lib/generator';
interface Scope {
  generateWords?: number;
  generateSentences?: number;
  generateParagraphs?: number;
  format: 'plain' | 'html';
}

export class LoremIpsumComponent extends Component {

  public static tagName = 'rv-lorem-ipsum';

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
      'sentences-per-paragraph-max',
      'sentences-per-paragraph-min',
      'words-per-sentence-max',
      'words-per-sentence-min',
      'words',
      'generate-words',
      'generate-sentences',
      'generate-paragraphs',
      'format',
    ];
  }

  protected scope: Scope = {
    generateParagraphs: 1,
    format: 'html',
  };

  constructor(element?: HTMLElement) {
    super(element);
    // console.debug('constructor', this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(LoremIpsumComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes)
    .then((view) => {
      return view;
    });
  }

  protected async beforeBind() {
    await super.beforeBind();
    // console.debug('beforeBind');
  }

  protected async afterBind() {
    await super.afterBind();
    // console.debug('afterBind', this.scope);
    this.lorem = new LoremIpsum(this.options, this.scope.format);
    if (this.scope.generateWords) {
      this.el.innerHTML = this.lorem.generateWords(this.scope.generateWords);
    } else if (this.scope.generateSentences) {
      this.el.innerHTML = this.lorem.generateSentences(this.scope.generateSentences);
    } else if (this.scope.generateParagraphs) {
      this.el.innerHTML = this.lorem.generateParagraphs(this.scope.generateParagraphs);
    }
  }

  protected requiredAttributes() {
    return [];
  }

  protected parsedAttributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null) {
    super.parsedAttributeChangedCallback(attributeName, oldValue, newValue, namespace);
    switch (attributeName) {
      case 'sentencesPerParagraphMax':
        if (this.options.sentencesPerParagraph) {
          this.options.sentencesPerParagraph.max = newValue;
        }
        break;
      case 'sentencesPerParagraphMin':
        if (this.options.sentencesPerParagraph) {
          this.options.sentencesPerParagraph.min = newValue;
        }
        break;
      case 'wordsPerSentenceMax':
          if (this.options.wordsPerSentence) {
            this.options.wordsPerSentence.max = newValue;
          }
          break;
      case 'wordsPerSentenceMin':
        if (this.options.wordsPerSentence) {
          this.options.wordsPerSentence.min = newValue;
        }
        break;
      case 'words':
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
