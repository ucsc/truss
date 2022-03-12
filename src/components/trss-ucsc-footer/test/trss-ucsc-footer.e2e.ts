import { newE2EPage } from '@stencil/core/testing';

describe('trss-ucsc-footer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<trss-ucsc-footer></trss-ucsc-footer>');

    const element = await page.find('trss-ucsc-footer');
    expect(element).toHaveClass('hydrated');
  });
});
