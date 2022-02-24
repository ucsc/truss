import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'ucsc-trss',
  globalStyle: 'src/globals/ucsc-trss.scss',
  buildEs5: true,
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
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
