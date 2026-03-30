import { newSpecPage } from '@stencil/core/testing';
import { TrssEventsList } from '../trss-events-list';

describe('trss-events-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TrssEventsList],
      html: `<trss-events-list></trss-events-list>`,
    });
    expect(page.root).toEqualHtml(`
      <trss-events-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </trss-events-list>
    `);
  });
});
