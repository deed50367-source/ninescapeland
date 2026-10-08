# Architecture rules
- Header owns the localized navigation inventory; desktop product columns and mobile accordion groups receive the same items so destinations remain consistent.
- Public product navigation renders from local items and existing gallery images without waiting for database queries, keeping navigation usable during service latency.
- Navigation-only copy is maintained in a six-language dictionary and grouped by destination; retain all existing resource links when changing layout.
- Site-wide visual roles live in global CSS tokens and shared Button/PageHero components; reuse these so public pages and admin surfaces remain consistent without altering content or access control.
- Selected web fonts are served locally from public/fonts; avoid external font requests for the active typography to keep rendering stable.
