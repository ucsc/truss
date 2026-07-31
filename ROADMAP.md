# ROADMAP

Tracked bugs, security issues, and hardening work for `@ucsantacruz/truss`.

Findings are grouped by severity. Each item lists the affected location, the
problem, and the proposed fix. The static components (`alert`, `footer`,
`you-belong`, `logo`, `site-title`, `breadcrumbs`, `card`, `header`) are clean;
everything below is concentrated in the two feed components
(`trss-news-list`, `trss-events-list`) and shared utilities.

---

## Security

### ✅ 1. `javascript:` URL XSS via feed data rendered into `href` — Medium

**Status:** Fixed. Added `safe_url()` to `src/utils/utils.ts` (protocol allowlist
via `URL` parsing) and applied it to both feed `href` bindings
(`trss-news-list.tsx:37`, `trss-events-list.tsx:55`). Covered by tests in
`src/utils/utils.spec.ts`.

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

### ✅ 2. `getEncodedText` is an ineffective "sanitizer" (footgun) — Low

**Status:** Fixed. Dropped the useless `<script>` regex and replaced the
per-component `getEncodedText` method with a shared, clearly named
`decode_entities()` in `src/utils/utils.ts` whose doc comment states it is NOT
a sanitizer and must not be fed to `innerHTML`. Both feed components now import
it (`trss-news-list.tsx`, `trss-events-list.tsx`). Guard path covered in
`src/utils/utils.spec.ts` (the DOM-dependent decoding is browser-only —
mock-doc's `<textarea>` doesn't implement `innerHTML`→`value`).

---

## Correctness / crash bugs

### ✅ 3. `event.image.url` crashes when an event has no image — Medium

**Status:** Fixed. Guarded the image access so events returning
`image: false`/`undefined` no longer throw and abort the list render (now
`event.image && event.image.url` after #9 typed `image` as `EventImage | false`;
originally optional chaining). Also wrapped the image `src` in `safe_url()` for
defense-in-depth on feed-supplied URLs.

### ✅ 4. List render crashes on an error/empty API response — Medium

**Status:** Fixed. Added `fetch_cached_json()` to `src/utils/utils.ts`, which
wraps fetch + cache + parse in `try/catch`, checks `response.ok`, and returns
`null` on any failure (network error, non-OK status, invalid JSON, storage
unavailable); only successful responses are cached. Both components now coerce
the result to an array (`Array.isArray(data?.items) ? … : []`), so `.slice`
can never throw. Added an HTML fallback via a new `fallback` **named slot**
(consumers supply their own markup; detected with `@Element` + `querySelector`
since these are non-shadow components) with a built-in default message, shown
whenever the feed fails or is empty. The `getFeedId` duplication was folded into
the util.

### ✅ 5. Random-UUID cache key defeats caching and leaks `sessionStorage` — Medium

**Status:** Fixed. `getFeedId` in both feed components now returns
`hash_string(url)` — a deterministic, low-collision hash (cyrb53) of the full
`source` URL added to `src/utils/utils.ts`. Same URL → same key, so cached
responses are reused instead of a new random `trss-*-<uuid>` entry piling up on
every render. The full-URL basis also fixes the related collision (URLs
differing only in `per_page`/date filters now key distinctly). Covered by tests
in `src/utils/utils.spec.ts`. Also removed the SSR-unsafe `self.crypto.randomUUID()`.

---

## Minor

### ✅ 6. Leftover debug logging — Low

**Status:** Fixed. The `console.log(match)` was removed as part of the #5
`getFeedId` rewrite in `trss-events-list.tsx`.

### [ ] 7. SSR/prerender safety — Low

**Where:** `componentWillRender` in both feed components

Directly touches `sessionStorage`, `document`, and `self.crypto`. If Stencil's
hydrate/prerender output is ever used, these are undefined server-side and will
throw.

**Fix:** Guard with `typeof window !== 'undefined'` if SSR is in scope.

### ✅ 8. `friendly_date` invalid-input handling — Low

**Status:** Fixed. `friendly_date` now returns `''` for missing input and for
unparseable dates (`isNaN` guard) in `src/utils/utils.ts`, preventing
"Invalid Date" from rendering. Covered by tests in `src/utils/utils.spec.ts`.

### ✅ 9. `any`-typed feed items — Low

**Status:** Fixed. Added `NewsItem` (news) and `EventItem`/`EventImage` (events)
interfaces and typed `listData`/`eventData` and the render `.map` callbacks with
them, dropping the `any = {}` pattern. `EventItem.image` is typed
`EventImage | false` to model the no-image case from #3; the render guard uses
truthiness narrowing (`event.image && event.image.url`) so the compiler handles
the `false` branch. Build type-checks clean; spec suite still 25/25.

---

## Tooling / tests

### ✅ 10. Stale component spec tests — Medium

**Status:** Fixed. Rewrote all 10 failing `*.spec.tsx` suites (trss-card
already passed) from stale full-DOM `toEqualHtml` snapshots to targeted
assertions on the current output — key landmarks/roles, prop-driven classes,
element counts, and slot containers. This avoids brittle transcription of the
inline logo SVG and the you-belong legal copy, and the checks actually guard the
contract (the feed-list suites now assert the #4 fallback; the footer passes an
explicit `year` so it isn't date-dependent; the header verifies `useSearch`
toggles the search form). Full spec suite: 25/25 passing.

**Note:** Scope was spec tests only. The `*.e2e.ts` suites (Puppeteer, run via
`--e2e`) were not touched and may still be stale — see #13.

### [ ] 13. Verify/refresh e2e suites — Low

**Where:** every `src/components/**/test/*.e2e.ts`

Only the spec suites were restored in #10. The Puppeteer e2e suites (`--e2e`)
were likely written against the same old markup and may be stale too. They
weren't run as part of #10.

**Fix:** Run `npm run test` (spec + e2e), update any e2e assertions that no
longer match, and decide whether to migrate off Stencil's deprecated integrated
testing (the runner warns it is removed in Stencil v5 — `@stencil/vitest` /
`@stencil/playwright` are the suggested replacements).

### [ ] 11. `moduleResolution=node10` deprecation — Low

**Where:** `tsconfig.json` (`"moduleResolution": "node"`)

Newer TypeScript reports `node10` (the `"node"` alias) as deprecated; it stops
functioning in TypeScript 7.0.

**Fix:** Switch to `"moduleResolution": "bundler"` (matching how
`.storybook/tsconfig.json` already resolves) and verify the build/tests, or add
`"ignoreDeprecations": "6.0"` as a stopgap.

---

## Accessibility

### [ ] 12. Event images have hardcoded empty `alt` — Low

**Where:** `src/components/trss-events-list/trss-events-list.tsx:53`

```tsx
<img src={safe_url(event.image.url)} alt="" />
```

`alt=""` marks every event image as purely decorative, so screen readers skip
it entirely. Event feature images are meaningful content, so they should carry a
descriptive alt.

**Fix:** Use feed-supplied alt text when available (e.g. `event.image.alt` /
`event.title`), falling back to the event title — e.g.
`alt={decode_entities(event.image?.alt || event.title)}`. Confirm the feed field
name before wiring it up.

---

## Summary

1. **#3, #4, #5** — outright bugs that fire in normal use.
2. **#1** — the real security vector.
3. **#10** — restore the spec suite so the fixes above are actually guarded.
4. **#2, #6, #7, #8, #9, #11** — hardening and cleanup.

Do the code changes on a branch (not `main`) and rebuild (`npm run build`) so the
generated `custom-elements.json` and readmes stay in sync.
