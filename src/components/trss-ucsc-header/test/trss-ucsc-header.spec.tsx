import { newSpecPage } from '@stencil/core/testing';
import { TrssUcscHeader } from '../trss-ucsc-header';

describe('trss-ucsc-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TrssUcscHeader],
      html: `<trss-ucsc-header></trss-ucsc-header>`,
    });
    expect(page.root).toEqualHtml(`
      <trss-ucsc-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </trss-ucsc-header>
    `);
  });
});
