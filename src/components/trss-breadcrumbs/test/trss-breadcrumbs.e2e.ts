import { newE2EPage } from '@stencil/core/testing';

describe('trss-breadcrumbs', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<trss-breadcrumbs></trss-breadcrumbs>');

    const element = await page.find('trss-breadcrumbs');
    expect(element).toHaveClass('hydrated');
  });
});
