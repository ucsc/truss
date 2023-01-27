import { newE2EPage } from '@stencil/core/testing';

describe('trss-ucsc-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<trss-ucsc-header></trss-ucsc-header>');

    const element = await page.find('trss-ucsc-header');
    expect(element).toHaveClass('hydrated');
  });
});
