import { newSpecPage } from '@stencil/core/testing';
import { TrssUcscNavbar } from '../trss-ucsc-navbar';

describe('trss-ucsc-navbar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TrssUcscNavbar],
      html: `<trss-ucsc-navbar></trss-ucsc-navbar>`,
    });
    expect(page.root).toEqualHtml(`
      <trss-ucsc-navbar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </trss-ucsc-navbar>
    `);
  });
});
