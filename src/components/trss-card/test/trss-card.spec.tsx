import { newSpecPage } from '@stencil/core/testing';
import { TrssCard } from '../trss-card';

describe('trss-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TrssCard],
      html: `<trss-card header="This is a header" image-url="https://via.placeholder.com/480x150" image-alt="Image description">This is the content of a card!</trss-card>`,
    });
    expect(page.root).toEqualHtml(`
      <trss-card header="This is a header" image-url="https://via.placeholder.com/480x150" image-alt="Image description">
        <div class="block">
        <div class="block-media">
          <img alt="Image description" class="block-image" src="https://via.placeholder.com/480x150" />
        </div>
        <div class="block-body">
          <h3 class="block-title">This is a header</h3>
          <p class="block-description">
            This is the content of a card!
          </p>
        </div>
      </div>
      </trss-card>
    `);
  });
});
