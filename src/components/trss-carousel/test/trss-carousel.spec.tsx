import { newSpecPage } from '@stencil/core/testing';
import { TrssCarousel } from '../trss-carousel';

describe('trss-carousel', () => {
  it('renders the carousel with navigation buttons and frames', async () => {
    const page = await newSpecPage({
      components: [TrssCarousel],
      html: `<trss-carousel></trss-carousel>`,
    });
    const root = page.root as HTMLElement;
    expect(root.querySelector('section')).not.toBeNull();
    expect(root.querySelector('.trss-carousel')).not.toBeNull();
    expect(root.querySelectorAll('button').length).toBe(2);
    expect(root.querySelectorAll('.frame').length).toBe(3);
  });
});
