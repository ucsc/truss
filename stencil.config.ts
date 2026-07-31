import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { writeCustomElementsManifest } from './.storybook/stencil-to-cem';

export const config: Config = {
  namespace: 'ucsc-trss',
  globalStyle: 'src/globals/ucsc-trss.scss',
  // .svg imports are inlined by Stencil as base64 data URIs at build time
  // (see e.g. trss-ucsc-header's search-menu icon). Jest doesn't run that
  // transform, so tests map .svg imports to an empty-string mock.
  testing: {
    moduleNameMapper: {
      '\\.svg$': '<rootDir>/src/utils/svg-string-mock.ts',
    },
  },
  devServer: {
    reloadStrategy: 'pageReload'
  },
  outputTargets: [
    {
      type: 'dist',
    },
    {
      type: 'docs-readme',
      strict: true
    },
    {
      type: 'docs-custom',
      generator: (docs) => writeCustomElementsManifest(docs, 'custom-elements.json'),
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [sass({
    injectGlobalPaths: [
      'src/globals/scss/variables.scss',
      'src/globals/scss/mixins.scss'
    ]
  })]
};
