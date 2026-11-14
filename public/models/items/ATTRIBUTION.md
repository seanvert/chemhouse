# Household item model attribution

The 18 clickable household items in ChemHouse 3D use ready-made low-poly models
from [Poly Pizza](https://poly.pizza). Every file is bundled in this directory and
loaded through `src/itemAssets.js`.

All models were modified for this project: they are uniformly scaled to a target
bounding box, centered on X/Z, aligned so their lowest point rests on Y = 0, and
some are rotated to sit correctly in the scene. Optional material recolors,
label changes, and animated flame/steam overlays are noted below. The original
geometry and textures are otherwise unmodified.

## CC BY 3.0 models

These models require attribution. The in-app **Credits** button also lists them.

| Item | Model | Author | License | Source | Changes |
|---|---|---|---|---|---|
| Bleach bottle | Jug of Milk | Poly by Google | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) | https://poly.pizza/m/a8U8rY_gryf | Scaled and used as a cleaning-product jug |
| Car battery | Car Battery | J-Toastie | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) | https://poly.pizza/m/hLVNyFYOOX | Scaled |
| Paint remover can | Paint Can | Jarlan Perez | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) | https://poly.pizza/m/9pyBQ8e4tSy | Scaled |
| Fire extinguisher | Fire Extinguisher | Jarlan Perez | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) | https://poly.pizza/m/71rR7PaeXNN | Scaled |

## CC0 1.0 models

These models are public domain under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).

| Item | Model | Author | Source | Changes |
|---|---|---|---|---|
| Ripe banana | Banana | Quaternius | https://poly.pizza/m/ruOFtE0B6Z | Rotated to lie flat, scaled |
| Frying pan | Pan | Quaternius | https://poly.pizza/m/f9my9iJZMv | Scaled |
| Baking soda box | Box | Kenney | https://poly.pizza/m/HvjissDrdr | Scaled |
| Salt shaker | Shaker Salt | Kenney | https://poly.pizza/m/iNvqUZRjev | Scaled |
| Vinegar bottle | Wine Red | Kenney | https://poly.pizza/m/NvGUg8c03o | Scaled |
| Toothpaste tube | Lotion Tube | MilkAndBanana | https://poly.pizza/m/AmwlZLfBQr | Rotated to lie along the counter, scaled |
| Rubbing alcohol bottle | Water Bottle | Quaternius | https://poly.pizza/m/KpxDpidn1Z | Cap recolored green, scaled |
| Epsom salt jar | Jar | CreativeTrio | https://poly.pizza/m/XGe3q5zQ5s | Scaled |
| Smartphone | Phone | Quaternius | https://poly.pizza/m/k2kgBepoMU | Rotated to lie flat, scaled |
| Houseplant | Houseplant | Quaternius | https://poly.pizza/m/bfLOqIV5uP | Scaled |
| Scented candle | Candle | Kay Lousberg | https://poly.pizza/m/asGVv9EuOr | Scaled, animated flame overlay |
| Hot coffee mug | Mug | Kenney | https://poly.pizza/m/fis2ugeLbn | Body recolored teal, scaled, animated steam overlay |
| Sparkling water can | Soda Can | Kenney | https://poly.pizza/m/KOLcdOATw6 | Recolored blue, scaled |
| Super glue tube | Lotion Tube | MilkAndBanana | https://poly.pizza/m/tacHJc7TlK | Rotated to lie on the workbench, scaled |

## Notes

- Model titles are the names published on Poly Pizza.
- The bleach model is a milk-jug shape used as a generic cleaning-product jug;
  its blue body reads as a household cleaner in the bathroom scene.
- The baking soda model is a generic cardboard carton. The scene still exposes
  the chemistry data and item name, so the object reads as baking soda in context.
- Poly Pizza source pages may require a browser to download the original files.
