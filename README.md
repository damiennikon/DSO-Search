# DSO Search

A phone-friendly sky guide for deep-sky targets and rough polar alignment.

[Open DSO Search](https://damiennikon.github.io/DSO-Search/)

The live app loads its code from `assets/`. The older root-level scripts and
styles are kept for clients that still have an earlier page cached.

The original target list is in `assets/database.js`. The positions used for
guidance, their sources, and the OpenNGC attribution are in
`assets/catalog-positions.js`. Targets without a source match remain searchable
with guidance disabled.

Run the release checks with `node --test tests/release.test.cjs`.
When changing a released asset, bump the build number in `index.html` (the
build meta tag and asset URLs) and `sw.js`. Keep the service worker at the
same URL so existing installations can update.
