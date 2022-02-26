import { newSpecPage } from '@stencil/core/testing';
import { TrssDataList } from '../trss-data-list';

describe('trss-data-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TrssDataList],
      html: `<trss-data-list></trss-data-list>`,
    });
    expect(page.root).toEqualHtml(`
      <trss-data-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </trss-data-list>
    `);
  });
});
