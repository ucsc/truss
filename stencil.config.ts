import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { writeCustomElementsManifest } from './.storybook/stencil-to-cem';

export const config: Config = {
  namespace: 'ucsc-trss',
  globalStyle: 'src/globals/ucsc-trss.scss',
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
