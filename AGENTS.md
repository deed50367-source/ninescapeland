# Architecture rules
- Customer-service replies share an AI Elements MessageResponse renderer across public and admin transcripts; keep visitor text literal and raw HTML disabled to preserve safe, consistent formatting.
- Visitor message inserts enqueue a database webhook to PushPlus independently of AI replies and human mode; a service-only message claim prevents duplicate sends, and only a generic summary leaves the app.
- Inquiry creation, saved chat contact patterns, explicit human requests, and staff reply/assignment transitions enqueue deduplicated service-only PushPlus events; opaque event references are consumed atomically without forwarding personal details.
- Customer-service chat rejects managed AI fallback and gateway URL overrides; other AI tasks retain their configured routing to isolate customer-service policy.
- Public chat creates sessions with insert-only writes and awaits creation before sending messages; duplicate IDs preserve existing sessions without requiring public read/update access.
- Chat message insert policies check session existence through a narrowly scoped security-definer boolean helper so anonymous session read restrictions do not reject valid messages.
- Header owns the localized navigation inventory; desktop product columns and mobile accordion groups receive the same items so destinations remain consistent.
- Public product navigation renders from local items and existing gallery images without waiting for database queries, keeping navigation usable during service latency.
- Navigation-only copy is maintained in a six-language dictionary and grouped by destination; retain all existing resource links when changing layout.
- Site-wide visual roles live in global CSS tokens and shared Button/PageHero components; reuse these so public pages and admin surfaces remain consistent without altering content or access control.
- Selected web fonts are served locally from public/fonts; avoid external font requests for the active typography to keep rendering stable.

- The interactive world map uses simplified local Natural Earth country outlines and shared region selectors; this keeps geographic rendering deterministic and independent of remote map services.
- Lazy sections with public hash destinations retain placeholder IDs and reveal on hash navigation, so consultation and calculator links work before content mounts.
- Published multilingual blog batches retain a shared slug per article and register all language routes in prerendering and the sitemap so crawlers can discover the same content as readers.
- Exhibition banners, contact-page image overrides and inquiry prefills share an expiry hook so all temporary presentation restores together, including pages left open at expiry.
