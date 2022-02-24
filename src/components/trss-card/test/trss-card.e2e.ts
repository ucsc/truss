import { newE2EPage } from '@stencil/core/testing';

describe('trss-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<trss-card></trss-card>');

    const element = await page.find('trss-card');
    expect(element).toHaveClass('hydrated');
  });
});
