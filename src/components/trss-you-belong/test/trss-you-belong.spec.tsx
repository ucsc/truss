import { newSpecPage } from '@stencil/core/testing';
import { TrssYouBelong } from '../trss-you-belong';

describe('trss-you-belong', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TrssYouBelong],
      html: `<trss-you-belong appearance="notice" header="YUM!">Yo, Dawg!</trss-you-belong>`,
    });
    expect(page.root).toEqualHtml(`
      <trss-you-belong appearance="notice" header="YUM!">
        <div class="ribbon ribbon-notice" role="complementary">
        <div class="inner">
          <h3 class="header">YUM!</h3>
          Yo, Dawg!
        </div>
      </div>
      </trss-you-belong>
    `);
  });
});
