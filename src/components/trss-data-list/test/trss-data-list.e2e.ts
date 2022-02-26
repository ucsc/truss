import { newE2EPage } from '@stencil/core/testing';

describe('trss-link-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<trss-link-list></trss-link-list>');

    const element = await page.find('trss-link-list');
    expect(element).toHaveClass('hydrated');
  });
});
