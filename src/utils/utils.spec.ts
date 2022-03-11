import { friendly_date } from './utils';

describe('format', () => {
  it('returns empty string for no dates defined', () => {
    expect(friendly_date(undefined)).toEqual('');
  });

  it('formats a basic date', () => {
    expect(friendly_date('2022-03-07T09:00:00-08:00')).toEqual('March 7, 2022');
  });
});
