import { friendly_date, safe_url } from './utils';

describe('format', () => {
  it('returns empty string for no dates defined', () => {
    expect(friendly_date(undefined)).toEqual('');
  });

  it('returns empty string for an unparseable date', () => {
    expect(friendly_date('not a date')).toEqual('');
  });

  it('formats a basic date', () => {
    expect(friendly_date('2022-03-07T09:00:00-08:00')).toEqual('March 7, 2022');
  });
});

describe('safe_url', () => {
  it('allows http and https URLs', () => {
    expect(safe_url('https://news.ucsc.edu/story')).toEqual('https://news.ucsc.edu/story');
    expect(safe_url('http://example.com')).toEqual('http://example.com');
  });

  it('blocks mailto URLs', () => {
    expect(safe_url('mailto:info@ucsc.edu')).toBeUndefined();
  });

  it('blocks javascript: URLs', () => {
    expect(safe_url('javascript:alert(1)')).toBeUndefined();
  });

  it('blocks javascript: URLs with leading whitespace/control chars', () => {
    expect(safe_url('\tjavascript:alert(1)')).toBeUndefined();
    expect(safe_url('  javascript:alert(1)')).toBeUndefined();
  });

  it('blocks data: URLs', () => {
    expect(safe_url('data:text/html,<script>alert(1)</script>')).toBeUndefined();
  });

  it('returns undefined for empty or missing input', () => {
    expect(safe_url('')).toBeUndefined();
    expect(safe_url(undefined)).toBeUndefined();
  });
});
