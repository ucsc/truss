import { newSpecPage } from '@stencil/core/testing';
import { TrssAlert } from '../trss-alert';

describe('trss-alert', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TrssAlert],
      html: `<trss-alert appearance="notice" header="YUM!">Yo, Dawg!</trss-alert>`,
    });
    expect(page.root).toEqualHtml(`
      <trss-alert appearance="notice" header="YUM!">
        <div class="ribbon ribbon-notice" role="complementary">
        <div class="inner">
          <h3 class="header">YUM!</h3>
          Yo, Dawg!
        </div>
      </div>
      </trss-alert>
    `);
  });
});
