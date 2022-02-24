import { newE2EPage } from '@stencil/core/testing';

describe('trss-site-title', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<trss-site-title></trss-site-title>');

    const element = await page.find('trss-site-title');
    expect(element).toHaveClass('hydrated');
  });
});
