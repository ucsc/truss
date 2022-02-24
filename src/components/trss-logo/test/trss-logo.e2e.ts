import { newE2EPage } from '@stencil/core/testing';

describe('trss-logo', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<trss-logo></trss-logo>');

    const element = await page.find('trss-logo');
    expect(element).toHaveClass('hydrated');
  });
});
