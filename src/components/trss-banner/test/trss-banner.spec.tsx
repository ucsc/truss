import { newSpecPage } from '@stencil/core/testing';
import { TrssBanner } from '../trss-banner';

describe('trss-banner', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TrssBanner],
      html: `<trss-banner appearance="notice" header="YUM!">Yo, Dawg!</trss-banner>`,
    });
    expect(page.root).toEqualHtml(`
      <trss-banner appearance="notice" header="YUM!">
        <div class="ribbon ribbon-notice" role="complementary">
        <div class="inner">
          <h3 class="header">YUM!</h3>
          Yo, Dawg!
        </div>
      </div>
      </trss-banner>
    `);
  });
});
