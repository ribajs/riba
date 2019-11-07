import { Path } from '@angular-devkit/core';

export interface ElementOptions {
  /**
   * The name of the service.
   */
  name: string;
  /**
   * The path to create the service.
   */
  path?: string;
  /**
   * Directive to insert declaration in module.
   */
  skipImport?: boolean;
  /**
   * Metadata name affected by declaration insertion.
   */
  metadata?: string;
  /**
   * Riba element type name
   */
  type?: string;
  /**
   * Application language.
   */
  language?: 'ts' | 'js';
  /**
   * The source root path
   */
  sourceRoot?: string;
  /**
   * Specifies if a spec file is generated.
   */
  spec?: boolean;
  /**
   * Flag to indicate if a directory is created.
   */
  flat?: boolean;
  /**
   * Which template engine the component should use.
   */
  templateEngine?: 'html' | 'pug';
  /**
   * Which style engine the component should use.
   */
  styleLanguage?: 'scss';
}
