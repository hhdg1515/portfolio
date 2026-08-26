# V3 artwork v9

This version stops the cumulative full-image regeneration that degraded the previous artwork.

## Photographic base

Built-in ImageGen performed one edit from the original clean `artwork.png`:

- remove all previous projected interface graphics;
- preserve the windshield, cockpit, road, mountains, natural light and photographic detail;
- add one restrained real wildfire on the lower-right hillside;
- avoid sharpening, grain, painterly marks and repeated micro-patterns.

The resulting project-local base is `artwork-v9-base.png`.

## Deterministic interface layer

`overlay-v9.svg` contains the final interface artwork and is composited once into `artwork-v9.png`:

- full white route and upper-left direction arrow;
- bottom current-position endpoint;
- second white point centered exactly at x 68.1%, y 48.9%;
- upper-right mapped wildfire region and flame icon;
- `WATCH / Wind + route access / Recheck before the pass.` card.

Future UI-coordinate adjustments should be made in the SVG and recomposited, without sending the photographic base through ImageGen again.
