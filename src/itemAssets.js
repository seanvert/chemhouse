// Ready-made low-poly household item models, bundled from Poly Pizza.
// The original source and license for every file are recorded in
// public/models/items/ATTRIBUTION.md and shown in the in-app credits dialog.
//
// `fit` is the target bounding box in world units. Models are uniformly scaled
// to fit inside it, centered on X/Z, and aligned so their lowest point sits on
// Y = 0. `rotation` fixes assets that were exported on a different axis.

export const ITEM_ASSETS = {
  banana: {
    url: "/models/items/banana.glb",
    fit: [.75, .35, .75],
    // The banana is exported standing on its tip; lay it on its side.
    rotation: [Math.PI / 2, 0, 0],
  },
  pan: {
    url: "/models/items/pan.glb",
    fit: [1, .18, 1.6],
  },
  // data.js uses the item kind "box" for the baking soda carton.
  box: {
    url: "/models/items/bakingsoda.glb",
    fit: [.5, .62, .5],
  },
  salt: {
    url: "/models/items/salt.glb",
    fit: [.4, .6, .4],
  },
  vinegar: {
    url: "/models/items/vinegar.glb",
    fit: [.45, .95, .45],
  },
  bleach: {
    url: "/models/items/bleach.glb",
    fit: [.5, .7, .5],
  },
  toothpaste: {
    url: "/models/items/toothpaste.glb",
    fit: [.24, .24, .8],
    // The tube is exported standing upright; lay it along the counter.
    rotation: [Math.PI / 2, 0, 0],
  },
  alcohol: {
    url: "/models/items/alcohol.glb",
    fit: [.4, .8, .4],
    recolor: { Red: "#10b981" },
  },
  epsom: {
    url: "/models/items/epsom.glb",
    fit: [.6, .74, .6],
  },
  // data.js uses the item kind "phone" for the smartphone.
  phone: {
    url: "/models/items/smartphone.glb",
    fit: [.4, .08, .72],
    // The phone is exported upright facing the camera; lay it on the table.
    rotation: [Math.PI / 2, 0, 0],
  },
  plant: {
    url: "/models/items/plant.glb",
    fit: [1.2, 1.5, 1.2],
  },
  candle: {
    url: "/models/items/candle.glb",
    fit: [.35, .5, .35],
    flame: { position: [0, .5, 0] },
  },
  coffee: {
    url: "/models/items/coffee.glb",
    fit: [.5, .44, .5],
    recolor: { brownDark: "#0e7490" },
    steam: { baseY: .36, height: .28, spread: .035 },
  },
  sparkling: {
    url: "/models/items/sparkling.glb",
    fit: [.4, .6, .4],
    recolor: { red: "#38bdf8" },
  },
  battery: {
    url: "/models/items/battery.glb",
    fit: [1.1, .9, .9],
  },
  superglue: {
    url: "/models/items/superglue.glb",
    fit: [.16, .16, .48],
    // The tube is exported standing upright; lay it on the workbench.
    rotation: [Math.PI / 2, 0, 0],
  },
  acetone: {
    url: "/models/items/acetone.glb",
    fit: [.55, .7, .55],
  },
  extinguisher: {
    url: "/models/items/extinguisher.glb",
    fit: [.7, 1.6, .95],
  },
};

export const ITEM_CREDITS = [
  { key: "banana", title: "Banana", author: "Quaternius", license: "CC0 1.0", url: "https://poly.pizza/m/ruOFtE0B6Z" },
  { key: "pan", title: "Pan", author: "Quaternius", license: "CC0 1.0", url: "https://poly.pizza/m/f9my9iJZMv" },
  { key: "box", title: "Box", author: "Kenney", license: "CC0 1.0", url: "https://poly.pizza/m/HvjissDrdr" },
  { key: "salt", title: "Shaker Salt", author: "Kenney", license: "CC0 1.0", url: "https://poly.pizza/m/iNvqUZRjev" },
  { key: "vinegar", title: "Wine Red", author: "Kenney", license: "CC0 1.0", url: "https://poly.pizza/m/NvGUg8c03o" },
  { key: "bleach", title: "Jug of Milk", author: "Poly by Google", license: "CC BY 3.0", url: "https://poly.pizza/m/a8U8rY_gryf" },
  { key: "toothpaste", title: "Lotion Tube", author: "MilkAndBanana", license: "CC0 1.0", url: "https://poly.pizza/m/AmwlZLfBQr" },
  { key: "alcohol", title: "Water Bottle", author: "Quaternius", license: "CC0 1.0", url: "https://poly.pizza/m/KpxDpidn1Z" },
  { key: "epsom", title: "Jar", author: "CreativeTrio", license: "CC0 1.0", url: "https://poly.pizza/m/XGe3q5zQ5s" },
  { key: "phone", title: "Phone", author: "Quaternius", license: "CC0 1.0", url: "https://poly.pizza/m/k2kgBepoMU" },
  { key: "plant", title: "Houseplant", author: "Quaternius", license: "CC0 1.0", url: "https://poly.pizza/m/bfLOqIV5uP" },
  { key: "candle", title: "Candle", author: "Kay Lousberg", license: "CC0 1.0", url: "https://poly.pizza/m/asGVv9EuOr" },
  { key: "coffee", title: "Mug", author: "Kenney", license: "CC0 1.0", url: "https://poly.pizza/m/fis2ugeLbn" },
  { key: "sparkling", title: "Soda Can", author: "Kenney", license: "CC0 1.0", url: "https://poly.pizza/m/KOLcdOATw6" },
  { key: "battery", title: "Car Battery", author: "J-Toastie", license: "CC BY 3.0", url: "https://poly.pizza/m/hLVNyFYOOX" },
  { key: "superglue", title: "Lotion Tube", author: "MilkAndBanana", license: "CC0 1.0", url: "https://poly.pizza/m/tacHJc7TlK" },
  { key: "acetone", title: "Paint Can", author: "Jarlan Perez", license: "CC BY 3.0", url: "https://poly.pizza/m/9pyBQ8e4tSy" },
  { key: "extinguisher", title: "Fire Extinguisher", author: "Jarlan Perez", license: "CC BY 3.0", url: "https://poly.pizza/m/71rR7PaeXNN" },
];
