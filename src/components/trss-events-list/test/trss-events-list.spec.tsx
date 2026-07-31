import { newSpecPage } from '@stencil/core/testing';
import { TrssEventsList } from '../trss-events-list';

describe('trss-events-list', () => {
  it('renders the fallback when the feed cannot be loaded', async () => {
    // No `fetch` in the spec environment, so fetch_cached_json returns null and
    // the component renders its empty/error fallback (see ROADMAP #4).
    const page = await newSpecPage({
      components: [TrssEventsList],
      html: `<trss-events-list></trss-events-list>`,
    });
    const root = page.root as HTMLElement;
    const fallback = root.querySelector('.trss-events-list__fallback');
    expect(fallback).not.toBeNull();
    expect(fallback!.getAttribute('role')).toBe('status');
    expect(fallback!.textContent).toContain('No upcoming events found');
  });
});
