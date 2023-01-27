import { newE2EPage } from '@stencil/core/testing';

describe('trss-carousel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<trss-carousel></trss-carousel>');

    const element = await page.find('trss-carousel');
    expect(element).toHaveClass('hydrated');
  });
});
