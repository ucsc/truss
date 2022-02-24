import { newSpecPage } from '@stencil/core/testing';
import { TrssCrumbs } from '../trss-crumbs';

describe('trss-crumbs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TrssCrumbs],
      html: `<trss-crumbs></trss-crumbs>`,
    });
    expect(page.root).toEqualHtml(`
      <trss-crumbs>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </trss-crumbs>
    `);
  });
});
