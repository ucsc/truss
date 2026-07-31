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
