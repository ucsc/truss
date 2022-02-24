import { newSpecPage } from '@stencil/core/testing';
import { TrssSiteTitle } from '../trss-site-title';

describe('trss-site-title', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TrssSiteTitle],
      html: `<trss-site-title link="https://news.ucsc.edu">Campus Newcenter</trss-site-title>`,
    });
    expect(page.root).toEqualHtml(`
      <trss-site-title link="https://news.ucsc.edu">
        <div class="site-title">
          <p><a href="https://news.ucsc.edu">Campus Newcenter</a></p>
        </div>
      </trss-site-title>
    `);
  });
});
