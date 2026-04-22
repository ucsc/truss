import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { JsonDocs, JsonDocsComponent } from '@stencil/core/internal';

const PascalCase = (tag: string) =>
  tag
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');

const toDeclaration = (component: JsonDocsComponent) => ({
  kind: 'class' as const,
  name: PascalCase(component.tag),
  tagName: component.tag,
  description: component.docs ?? '',
  customElement: true as const,
  attributes: component.props
    .filter((prop) => !!prop.attr)
    .map((prop) => ({
      name: prop.attr as string,
      description: prop.docs ?? '',
      type: { text: prop.type },
      default: prop.default,
      fieldName: prop.name,
    })),
  members: [
    ...component.props.map((prop) => ({
      kind: 'field' as const,
      name: prop.name,
      description: prop.docs ?? '',
      type: { text: prop.type },
      default: prop.default,
      attribute: prop.attr,
    })),
    ...component.methods.map((method) => ({
      kind: 'method' as const,
      name: method.name,
      description: method.docs ?? '',
      return: { type: { text: method.returns.type } },
    })),
  ],
  events: component.events.map((event) => ({
    name: event.event,
    description: event.docs ?? '',
    type: { text: event.detail },
  })),
  slots: component.slots.map((slot) => ({
    name: slot.name,
    description: slot.docs ?? '',
  })),
  cssProperties: component.styles.map((style) => ({
    name: style.name,
    description: style.docs ?? '',
  })),
  cssParts: component.parts.map((part) => ({
    name: part.name,
    description: part.docs ?? '',
  })),
});

const toModule = (component: JsonDocsComponent) => {
  const path = `${component.filePath ?? component.dirPath ?? component.tag}`;
  const declaration = toDeclaration(component);
  return {
    kind: 'javascript-module' as const,
    path,
    declarations: [declaration],
    exports: [
      {
        kind: 'custom-element-definition' as const,
        name: component.tag,
        declaration: { name: declaration.name, module: path },
      },
    ],
  };
};

export async function writeCustomElementsManifest(
  docs: JsonDocs,
  outputPath: string,
) {
  const manifest = {
    schemaVersion: '1.0.0',
    readme: '',
    modules: docs.components.map(toModule),
  };
  const next = JSON.stringify(manifest, null, 2);
  const absolute = resolve(outputPath);
  const current = await readFile(absolute, 'utf8').catch(() => null);
  if (current === next) return;
  await writeFile(absolute, next);
}
