import type { Preview } from '@storybook/web-components';
import { defineCustomElements } from '../dist/loader';
import '../src/globals/ucsc-trss.scss';

defineCustomElements();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
