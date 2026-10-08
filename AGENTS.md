# Architecture rules
- Header owns the localized navigation inventory; desktop product columns and mobile accordion groups receive the same items so destinations remain consistent.
- Public product navigation renders from local items and existing gallery images without waiting for database queries, keeping navigation usable during service latency.
- Navigation-only copy is maintained in a six-language dictionary and grouped by destination; retain all existing resource links when changing layout.
