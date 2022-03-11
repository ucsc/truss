import { newSpecPage } from '@stencil/core/testing';
import { TrssBreadcrumbs } from '../trss-breadcrumbs';

describe('trss-breadcrumbs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TrssBreadcrumbs],
      html: `<trss-breadcrumbs></trss-breadcrumbs>`,
    });
    expect(page.root).toEqualHtml(`
      <trss-breadcrumbs>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </trss-breadcrumbs>
    `);
  });
});
