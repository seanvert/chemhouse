# Furniture model attribution

The rooms in ChemHouse 3D are furnished with ready-made low-poly models from
[Poly Pizza](https://poly.pizza). Every file is bundled in this directory and
loaded through `src/furnitureAssets.js`; the app does not hotlink them, so it also
works offline.

All models are licensed under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/),
so they are public domain and require no attribution. The in-app **Credits**
button still lists every asset with its author, license, and source link.

All models were modified for this project: they are uniformly scaled to a target
bounding box, centered on X/Z, aligned so their lowest point rests on Y = 0, and
rotated to sit correctly in each room. The original geometry and textures are
otherwise unmodified.

## Models

| Room | Model | Author | License | Source | Changes |
|---|---|---|---|---|---|
| Kitchen | Chair | Quaternius | CC0 1.0 | https://poly.pizza/m/iMNqRzPwwe | Scaled, four chairs placed around the dining table |
| Kitchen | Bar Stool | Kenney | CC0 1.0 | https://poly.pizza/m/2do92chR2k | Scaled, placed at the prep counter |
| Living room | Armchair | CreativeTrio | CC0 1.0 | https://poly.pizza/m/myd1WSucAz | Scaled, placed facing the coffee table |
| Living room | End Table | CreativeTrio | CC0 1.0 | https://poly.pizza/m/8gAkbKs1ii | Scaled, placed beside the armchair |
| Living room | Lamp Round Floor | Kenney | CC0 1.0 | https://poly.pizza/m/8LiDIfXVLi | Scaled, placed near the bookshelf |
| Living room | Bookshelf | CreativeTrio | CC0 1.0 | https://poly.pizza/m/30Iealxb0p | Scaled and rotated against the left wall |
| Living room | Alarm Clock | CreativeTrio | CC0 1.0 | https://poly.pizza/m/y5f363OS9C | Scaled, placed on the media console |
| Bathroom | Toilet | Quaternius | CC0 1.0 | https://poly.pizza/m/WAu50yGFVt | Scaled and rotated beside the bathtub |
| Bathroom | Rug Doormat | Kenney | CC0 1.0 | https://poly.pizza/m/nwwFXS6B9T | Scaled into a bath mat in front of the tub |
| Bathroom | Cabinet | CreativeTrio | CC0 1.0 | https://poly.pizza/m/wOiMrnUuhe | Scaled and rotated against the front-left wall |
| Bathroom | Bucket | Quaternius | CC0 1.0 | https://poly.pizza/m/83obI9bNun | Scaled, placed beside the vanity |
| Garage | Wheels Stack | Quaternius | CC0 1.0 | https://poly.pizza/m/o1MJrkMUPN | Scaled, placed in the front-right corner |
| Garage | Crate | Quaternius | CC0 1.0 | https://poly.pizza/m/3VGWnZPXmG | Scaled, two crates stacked near the pallet |
| Garage | Toolbox | CreativeTrio | CC0 1.0 | https://poly.pizza/m/3ImQcIK0Gp | Scaled and rotated onto the workbench |
| Garage | Ladder | CreativeTrio | CC0 1.0 | https://poly.pizza/m/p1RR8Ls9EH | Scaled, set up as a step ladder |
| Garage | Stool | Quaternius | CC0 1.0 | https://poly.pizza/m/TvaOenUAni | Scaled, placed beside the workbench |

## Notes

- Model titles are the names published on Poly Pizza.
- The cabinet is a generic storage cabinet used as a bathroom cupboard.
- The doormat model is reused as a bath mat.
- Keep this file and the Credits dialog in `src/furnitureAssets.js` in sync when
  replacing a model.
