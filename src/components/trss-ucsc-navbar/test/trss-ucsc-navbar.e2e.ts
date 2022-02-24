import { newE2EPage } from '@stencil/core/testing';

describe('trss-ucsc-navbar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<trss-ucsc-navbar></trss-ucsc-navbar>');

    const element = await page.find('trss-ucsc-navbar');
    expect(element).toHaveClass('hydrated');
  });
});
