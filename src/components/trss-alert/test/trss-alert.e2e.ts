import { newE2EPage } from '@stencil/core/testing';

describe('trss-alert', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<trss-alert></trss-alert>');

    const element = await page.find('trss-alert');
    expect(element).toHaveClass('hydrated');
  });
});
