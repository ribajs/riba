import { Path } from "@angular-devkit/core";

export interface DeclarationOptions {
  flat?: boolean;
  name: string;
  collection: string;
  sourceRoot: string;
  path: Path;
  language: string;
  styleLanguage: string;
  templateEngine: string;
  metadata: string;
  type?: string;
  symbol?: string;
  staticOptions?: {
    name: string;
    value: Record<string, any>;
  };
}
