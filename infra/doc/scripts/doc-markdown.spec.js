import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  findTranslatedMarkdown,
  markdownKey,
  md,
  translationsOf,
} from './doc-markdown.js';

describe('doc-markdown', () => {
  let projectRoot;
  let docDir;
  const roots = () => ({ docDir, projectRoot });

  beforeEach(() => {
    projectRoot = mkdtempSync(join(tmpdir(), 'doc-md-'));
    docDir = join(projectRoot, 'infra', 'doc', 'src', 'doc');
    mkdirSync(join(docDir, 'guide'), { recursive: true });
    mkdirSync(join(projectRoot, 'packages', 'core'), { recursive: true });
    writeFileSync(join(docDir, 'guide', 'plain.md'), '# Plain\n\ntext\n');
    writeFileSync(join(docDir, 'guide', 'install.md'), '# Install\n');
    writeFileSync(join(docDir, 'guide', 'install.de.md'), '# Installation\n');
    writeFileSync(
      join(docDir, 'guide', 'install.de-AT.md'),
      '# Installation\n',
    );
    writeFileSync(
      join(projectRoot, 'packages', 'core', 'README.md'),
      '# Core\n',
    );
    writeFileSync(
      join(projectRoot, 'packages', 'core', 'README.de.md'),
      '# Kern\n',
    );
  });
  afterEach(() => rmSync(projectRoot, { recursive: true, force: true }));

  it('renders the English html unchanged when there is no translation', () => {
    expect(md('guide/plain.md', roots())).toBe('<h1>Plain</h1>\n<p>text</p>\n');
  });

  it('wraps the English html for the binder when a translation exists', () => {
    expect(md('guide/install.md', roots())).toBe(
      `<div class="md-i18n" rv-i18n-html="'md.guide/install'"><h1>Install</h1>\n</div>`,
    );
  });

  it('keys files outside the doc dir by their path from the repo root, without dots', () => {
    const readme = join(projectRoot, 'packages', 'core', 'README.md');
    expect(markdownKey(readme, roots())).toBe('packages/core/README');
    expect(md('../../../../packages/core/README.md', roots())).toContain(
      "'md.packages/core/README'",
    );
    expect(
      markdownKey(join(docDir, 'guide', 'install.md'), roots()),
    ).not.toContain('.');
  });

  it('lists translations next to a file, not those of another file', () => {
    expect(translationsOf(join(docDir, 'guide', 'install.md'))).toEqual([
      'de',
      'de-AT',
    ]);
    expect(translationsOf(join(docDir, 'guide', 'plain.md'))).toEqual([]);
  });

  it('finds every translated file with its English source', () => {
    const found = findTranslatedMarkdown(projectRoot).map(
      ({ lang, source }) => [lang, source.slice(projectRoot.length + 1)],
    );
    expect(found.sort()).toEqual([
      ['de', 'infra/doc/src/doc/guide/install.md'],
      ['de', 'packages/core/README.md'],
      ['de-AT', 'infra/doc/src/doc/guide/install.md'],
    ]);
  });
});
