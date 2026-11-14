# ChemHouse 3D

## Development

```sh
npm install
npm run dev
```

Create a production build with `npm run build`.

## Languages

ChemHouse 3D is available in English and Spanish. Use the language selector in the
top bar; the selected language is saved in this browser. Add translations in
`src/i18n.jsx` when introducing another language.

## Household item models

All 18 clickable household items use ready-made low-poly GLB models from
[Poly Pizza](https://poly.pizza). The files are bundled in
`public/models/items/`; the app does not hotlink them, so it also works offline.

The model manifest is `src/itemAssets.js`. Each entry is keyed by the item kind
from `src/data.js` and controls how the asset is placed:

```js
pan: {
  url: "/models/items/pan.glb",
  fit: [1, .18, 1.6],          // target bounding box in world units
  rotation: [0, 0, 0],         // fix assets exported on another axis
  recolor: { Red: "#10b981" }, // optional material-name -> color overrides
  flame: { position: [0, .5, 0] },
  steam: { baseY: .36, height: .28, spread: .035 },
}
```

`src/Scene.jsx` loads each file once, clones it, recolors materials if requested,
uniformly scales it to fit `fit`, centers it on X/Z, and aligns its lowest point
to `Y = 0`. The existing positions, chemistry data, hover/click handling, and
Inspector flow are unchanged. If a model cannot be loaded, the app falls back to
the original procedural model from `src/Scene.jsx`.

Item keys must match `item.kind` in `src/data.js` — not always the item's key in
`ITEMS`. For example, the baking soda item uses the kind `box` and the smartphone
uses the kind `phone`.

## Furniture models

The rooms are also filled with ready-made low-poly furniture from
[Poly Pizza](https://poly.pizza). The files live in
`public/models/furniture/` and are bundled with the app, so furniture works
offline too.

`src/furnitureAssets.js` has two exports:

- `FURNITURE` describes each asset (`url`, `fit`, optional `rotation`), using the
  same preparation rules as the household items.
- `ROOM_FURNITURE` lists every placement: `{ model, position, rotation }`.

`src/Scene.jsx` renders those placements for the active room as non-interactive
scenery. Hover and click detection only looks at meshes named for an item, so
furniture never opens the Inspector. Add or move a piece by editing
`ROOM_FURNITURE`; no changes to the chemistry data are needed.

## Credits and licenses

The models use a CC0-first mix:

- 14 household items are CC0 1.0 and need no attribution.
- 4 household items are CC BY 3.0: the bleach jug (Poly by Google), car battery
  (J-Toastie), paint can (Jarlan Perez), and fire extinguisher (Jarlan Perez).
- All furniture is CC0 1.0 and needs no attribution.

The in-app **Credits** button in the top bar lists every asset with its author,
license, and source link. Full details, including the modifications made for
this project, are in `public/models/items/ATTRIBUTION.md` and
`public/models/furniture/ATTRIBUTION.md`. Keep those files and the Credits
dialog in sync when replacing a model.

## Room models

The app includes procedural room shells and furniture. To replace a room with a
Blender export, save the complete room as `public/models/<room>.glb`, where
`<room>` is `kitchen`, `living`, `bathroom`, or `garage`.

Name each clickable Blender mesh `interact_<itemKey>` to connect it to the
chemical data and item inspector. For example, name the bleach mesh
`interact_bleach`. Rooms without a GLB continue to use their built-in models.

The item keys and chemistry data are in `src/data.js`; procedural room and
object models are in `src/Scene.jsx`.
