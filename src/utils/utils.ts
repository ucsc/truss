export function friendly_date(date: string | undefined): string {
  if (!date) {
    return '';
  }
  const dateObj = new Date(Date.parse(date));
  if (isNaN(dateObj.getTime())) {
    return '';
  }
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
export function safe_url(url: string | undefined): string | undefined {
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

/**
 * Decodes HTML entities in feed-supplied text (e.g. `Tom &amp; Jerry` →
 * `Tom & Jerry`) so it displays correctly.
 *
 * NOTE: This is NOT a sanitizer. Its output must only be rendered as text (JSX
 * text interpolation, which Stencil auto-escapes) — never assigned to
 * `innerHTML`, which would re-activate any markup the feed had escaped. Use a
 * dedicated sanitizer (e.g. DOMPurify) if raw HTML ever needs to be rendered.
 */
export function decode_entities(text: string | undefined): string {
  if (!text) {
    return '';
  }
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}

/**
 * Produces a short, stable hash of a string, suitable for deriving a
 * deterministic cache key from a URL. Same input always yields the same output
 * (unlike a random UUID), so cached feed responses can actually be reused.
 *
 * Uses the cyrb53 algorithm — fast, dependency-free, and low-collision. Not
 * cryptographically secure; do not use for anything security-sensitive.
 */
export function hash_string(str: string): string {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const hash = 4294967296 * (2097151 & h2) + (h1 >>> 0);
  return hash.toString(36);
}

/**
 * Fetches JSON from `source`, caching successful responses in `sessionStorage`
 * under `cachePrefix` + a stable hash of the URL (so repeat renders reuse the
 * cached copy).
 *
 * Returns the parsed data, or `null` if anything goes wrong — network error,
 * non-OK response, invalid JSON, or storage being unavailable — so callers can
 * render a fallback instead of crashing. Only successful responses are cached.
 */
export async function fetch_cached_json(source: string, cachePrefix: string): Promise<any> {
  const key = cachePrefix + hash_string(source);
  try {
    const cached = sessionStorage.getItem(key);
    if (cached && cached !== '{}') {
      return JSON.parse(cached);
    }
    const response = await fetch(source, {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    sessionStorage.setItem(key, JSON.stringify(data));
    return data;
  } catch {
    return null;
  }
}
