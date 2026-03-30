import { newSpecPage } from '@stencil/core/testing';
import { TrssNewsList } from '../trss-news-list';

describe('trss-data-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TrssNewsList],
      html: `<trss-news-list></trss-news-list>`,
    });
    expect(page.root).toEqualHtml(`
      <trss-news-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </trss-news-list>
    `);
  });
});
