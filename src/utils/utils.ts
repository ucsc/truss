export function friendly_date(date: string): string {
  let dateObj = new Date(Date.parse(date));
  return dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

const SAFE_URL_PROTOCOLS = ['http:', 'https:'];

/**
 * Returns `url` only if it uses an allowed protocol, otherwise `undefined`.
 *
 * Guards against `javascript:` (and other dangerous scheme) URLs from untrusted
 * feed data being bound to `href`/`src` attributes, where they would execute on
 * click. Parsing via `URL` normalizes leading whitespace and control characters
 * (e.g. `\tjavascript:`) that a naive string check would miss.
 */
export function safe_url(url: string): string | undefined {
  if (!url) {
    return undefined;
  }
  // Resolve relative URLs (common in feeds) against the current document when
  // available; falling back to no base keeps this safe under SSR/prerender.
  const base = typeof window !== 'undefined' ? window.location.href : undefined;
  try {
    const parsed = new URL(url, base);
    return SAFE_URL_PROTOCOLS.includes(parsed.protocol) ? url : undefined;
  } catch {
    return undefined;
  }
}
