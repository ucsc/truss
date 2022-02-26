import { newSpecPage } from '@stencil/core/testing';
import { TrssLinkList } from '../trss-data-list';

describe('trss-link-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TrssLinkList],
      html: `<trss-link-list></trss-link-list>`,
    });
    expect(page.root).toEqualHtml(`
      <trss-link-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </trss-link-list>
    `);
  });
});
