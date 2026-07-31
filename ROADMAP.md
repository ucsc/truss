# ROADMAP

Tracked bugs, security issues, and hardening work for `@ucsantacruz/truss`.

Findings are grouped by severity. Each item lists the affected location, the
problem, and the proposed fix. The static components (`alert`, `footer`,
`you-belong`, `logo`, `site-title`, `breadcrumbs`, `card`, `header`) are clean;
everything below is concentrated in the two feed components
(`trss-news-list`, `trss-events-list`) and shared utilities.

---

## Security

### [ ] 1. `javascript:` URL XSS via feed data rendered into `href` — Medium

**Where:** `src/components/trss-news-list/trss-news-list.tsx:37`,
`src/components/trss-events-list/trss-events-list.tsx:55`

```tsx
<a href={item.url}>{this.getEncodedText(item.title)}</a>
```

Text interpolation is auto-escaped by Stencil, so titles/summaries are safe.
But Stencil does **not** sanitize URL attributes. A feed item whose `url` is
`javascript:…` executes on click. `source` is a public `@Prop`, so any embedding
site can point the component at an attacker-controlled feed, and the trusted
feed is one compromise away.

**Fix:** Validate the protocol before binding `href` (allow only
`http:` / `https:` / `mailto:`); drop or neutralize anything else. Apply the
same guard anywhere feed-supplied URLs reach an attribute.

### [ ] 2. `getEncodedText` is an ineffective "sanitizer" (footgun) — Low

**Where:** `src/components/trss-news-list/trss-news-list.tsx:61-67`,
`src/components/trss-events-list/trss-events-list.tsx:90-96`

```tsx
textArea.innerHTML = text;
const regex = /<script[\d\D]*?>[\d\D]*?<\/script>/gm;
const result = textArea.value.replace(regex, '');
```

It decodes HTML entities and strips only literal `<script>…</script>`. Harmless
today because output lands in an escaped text node, but it is named/shaped like
a sanitizer and the regex is trivially bypassable (`<img onerror>`,
`<svg onload>`, nested `<scr<script>ipt>`). If anyone later renders its output
via `innerHTML` trusting it, that is instant XSS.

**Fix:** Remove the useless script-regex, or replace the whole helper with a
clearly named decode-only utility. Do not rely on it for sanitization.

---

## Correctness / crash bugs

### [ ] 3. `event.image.url` crashes when an event has no image — Medium

**Where:** `src/components/trss-events-list/trss-events-list.tsx:53`

```tsx
{event.image.url && this.image ? <img src={event.image.url} alt="" /> : '' }
```

The Tribe Events API returns `image: false` (or omits it) for events without a
featured image; `event.image.url` then throws `TypeError` and takes down the
whole list render.

**Fix:** Use optional chaining — `event.image?.url`.

### [ ] 4. List render crashes on an error/empty API response — Medium

**Where:** `src/components/trss-news-list/trss-news-list.tsx:34` (`listData.items.slice`),
fetch at `trss-news-list.tsx:53-55` and `trss-events-list.tsx:82-84`

If the fetch returns a non-feed payload (error object `{}`, HTML error page,
rate-limit body), `listData` has no `items` and `.slice` throws. There is no
`response.ok` check and no `try/catch`, so any network failure or non-JSON body
becomes an unhandled rejection and a broken component.

**Fix:** Check `response.ok`, wrap the fetch/parse in `try/catch`, and default
to `{ items: [] }` / `{ events: [] }` on failure.

### [ ] 5. Random-UUID cache key defeats caching and leaks `sessionStorage` — Medium

**Where:** `src/components/trss-news-list/trss-news-list.tsx:69-79`,
`src/components/trss-events-list/trss-events-list.tsx:98-109`

Both **default** sources fail their `getFeedId` regex and fall back to
`self.crypto.randomUUID()` (verified). Because `componentWillRender` runs on
every render, each re-render generates a new key → never a cache hit →
re-fetches every render **and** writes a new `trss-*-<uuid>` entry every render,
growing `sessionStorage` until it throws `QuotaExceededError`.

**Fix:** Derive a stable key from the full `source` URL (e.g. a hash of the
whole URL) rather than a pattern that only matches specific URL shapes.

**Related:** Even on a match, the events key uses only
`organizer/venue/categories/tags` (`trss-events-list.tsx:99`), so two sources
differing only in `per_page` or date filters collide on one cache entry and
serve stale data. A full-URL key fixes this too.

---

## Minor

### [ ] 6. Leftover debug logging — Low

**Where:** `src/components/trss-events-list/trss-events-list.tsx:106`

`console.log(match)` ships to production and prints feed internals. Remove.

### [ ] 7. SSR/prerender safety — Low

**Where:** `componentWillRender` in both feed components

Directly touches `sessionStorage`, `document`, and `self.crypto`. If Stencil's
hydrate/prerender output is ever used, these are undefined server-side and will
throw.

**Fix:** Guard with `typeof window !== 'undefined'` if SSR is in scope.

### [ ] 8. `friendly_date` invalid-input handling — Low

**Where:** `src/utils/utils.ts`

Returns `"Invalid Date"` for unparseable input instead of falling back
gracefully.

**Fix:** Validate the parsed date and return an empty string (or the raw value)
on failure.

### [ ] 9. `any`-typed feed items — Low

**Where:** feed `.map((item: any = {}) => …)` in both feed components

`any` removes the compile-time protection that would have caught items #3 and
#4. Typing the feed response shapes prevents this class of bug.

---

## Suggested order

1. **#3, #4, #5** — outright bugs that fire in normal use.
2. **#1** — the real security vector.
3. **#2, #6, #7, #8, #9** — hardening and cleanup.

Do the code changes on a branch (not `main`) and rebuild (`npm run build`) so the
generated `custom-elements.json` and readmes stay in sync.
