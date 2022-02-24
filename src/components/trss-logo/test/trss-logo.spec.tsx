import { newSpecPage } from '@stencil/core/testing';
import { TrssLogo } from '../trss-logo';

describe('trss-logo', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TrssLogo],
      html: `<trss-logo></trss-logo>`,
    });
    expect(page.root).toEqualHtml(`
      <trss-logo>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </trss-logo>
    `);
  });
});
