import { newSpecPage } from '@stencil/core/testing';
import { TrssCarousel } from '../trss-carousel';

describe('trss-carousel', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TrssCarousel],
      html: `<trss-carousel></trss-carousel>`,
    });
    expect(page.root).toEqualHtml(`
      <trss-carousel>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </trss-carousel>
    `);
  });
});
