import { newE2EPage } from '@stencil/core/testing';

describe('trss-crumbs', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<trss-crumbs></trss-crumbs>');

    const element = await page.find('trss-crumbs');
    expect(element).toHaveClass('hydrated');
  });
});
