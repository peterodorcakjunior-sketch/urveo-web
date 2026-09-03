# VAYREN render assets

Concept 01 currently uses intentional CSS media placeholders. Replace them with responsive local images as the final architectural renders become available.

Recommended source names:

- `vayren-hero` — cinematic dawn exterior; eager/high-priority hero image
- `vayren-exterior-day` — daylight development exterior
- `vayren-interior` — premium living-room interior
- `vayren-terrace` — terrace with mountain view
- `vayren-material-detail` — stone and timber architectural detail
- `vayren-winter` — winter blue-hour exterior
- `vayren-landscape` — High Tatras landscape

Prefer AVIF/WebP variants plus a suitable fallback. Keep explicit dimensions or the existing aspect-ratio wrappers to prevent layout shift. Images below the hero should use `loading="lazy"` and `decoding="async"`.

The `MediaSlot` instances in `Concept01.jsx` carry matching `data-asset` values, making each replacement location searchable. Do not place production URVEO assets in this directory.
