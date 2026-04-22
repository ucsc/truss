import { newE2EPage } from '@stencil/core/testing';

describe('trss-you-belong', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<trss-you-belong></trss-you-belong>');

    const element = await page.find('trss-you-belong');
    expect(element).toHaveClass('hydrated');
  });
});
