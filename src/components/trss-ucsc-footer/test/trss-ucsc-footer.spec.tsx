import { newSpecPage } from '@stencil/core/testing';
import { TrssUcscFooter } from '../trss-ucsc-footer';

describe('trss-ucsc-footer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TrssUcscFooter],
      html: `<trss-ucsc-footer></trss-ucsc-footer>`,
    });
    expect(page.root).toEqualHtml(`
      <trss-ucsc-footer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </trss-ucsc-footer>
    `);
  });
});
