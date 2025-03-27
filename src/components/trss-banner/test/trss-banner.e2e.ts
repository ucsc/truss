import { newE2EPage } from '@stencil/core/testing';

describe('trss-banner', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<trss-banner></trss-banner>');

    const element = await page.find('trss-banner');
    expect(element).toHaveClass('hydrated');
  });
});
