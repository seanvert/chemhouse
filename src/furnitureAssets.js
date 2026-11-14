// Ready-made low-poly furniture models, bundled from Poly Pizza.
// The original source and license for every file are recorded in
// public/models/furniture/ATTRIBUTION.md and shown in the in-app credits dialog.
//
// `fit` is the target bounding box in world units. Models are uniformly scaled
// to fit inside it, centered on X/Z, and aligned so their lowest point sits on
// Y = 0. `rotation` fixes assets that were exported on a different axis.
//
// ROOM_FURNITURE lists where each ready-made piece is placed. Positions use the
// same room coordinates as the procedural shells in Scene.jsx: the back wall is
// at Z = -5, the left wall is at X = -5, and Y = 0 is the floor.

export const FURNITURE = {
  chair: {
    url: "/models/furniture/chair.glb",
    fit: [.56, 1, .56],
  },
  barStool: {
    url: "/models/furniture/bar-stool.glb",
    fit: [.62, 1.05, .62],
  },
  armchair: {
    url: "/models/furniture/armchair.glb",
    fit: [.95, .95, .9],
  },
  endTable: {
    url: "/models/furniture/end-table.glb",
    fit: [.55, .65, .55],
  },
  floorLamp: {
    url: "/models/furniture/floor-lamp.glb",
    fit: [.45, 1.65, .45],
  },
  ladderShelf: {
    url: "/models/furniture/ladder-shelf.glb",
    fit: [1.5, 1.6, 1],
    // Stand the shelf against the left wall, facing into the room.
    rotation: [0, Math.PI / 2, 0],
  },
  clock: {
    url: "/models/furniture/alarm-clock.glb",
    fit: [.16, .18, .1],
    // Face the room from the media console on the left wall.
    rotation: [0, Math.PI / 2, 0],
  },
  toilet: {
    url: "/models/furniture/toilet.glb",
    fit: [.85, .95, .5],
    // Turn the bowl toward the vanity; the tank faces the open side.
    rotation: [0, -Math.PI / 2, 0],
  },
  bathMat: {
    url: "/models/furniture/bath-mat.glb",
    fit: [1.9, .06, 1.1],
  },
  cabinet: {
    url: "/models/furniture/cabinet.glb",
    fit: [.6, 1, 1],
    // Doors face into the room from the left wall.
    rotation: [0, Math.PI / 2, 0],
  },
  bucket: {
    url: "/models/furniture/bucket.glb",
    fit: [.4, .55, .4],
  },
  tireStack: {
    url: "/models/furniture/tire-stack.glb",
    fit: [.9, .8, .9],
  },
  crate: {
    url: "/models/furniture/crate.glb",
    fit: [.8, .8, .8],
  },
  toolbox: {
    url: "/models/furniture/toolbox.glb",
    fit: [.5, .22, .3],
    // Lay the toolbox along the workbench.
    rotation: [0, Math.PI / 2, 0],
  },
  stepLadder: {
    url: "/models/furniture/step-ladder.glb",
    fit: [1, 1.9, .8],
  },
  stool: {
    url: "/models/furniture/stool.glb",
    fit: [.55, .7, .55],
  },
  bed: {
    url: "/models/furniture/bed.glb",
    fit: [1.9, .95, 2.1],
  },
  nightstand: {
    url: "/models/furniture/nightstand.glb",
    fit: [.62, .6, .55],
  },
  dresser: {
    url: "/models/furniture/dresser.glb",
    fit: [.5, .9, 1.55],
    // Turn the drawers into the room from the left wall.
    rotation: [0, Math.PI / 2, 0],
  },
  wardrobe: {
    url: "/models/furniture/wardrobe.glb",
    fit: [.62, 2.1, 1.1],
    // Doors face into the room from the left wall.
    rotation: [0, Math.PI / 2, 0],
  },
  rug: {
    url: "/models/furniture/rug.glb",
    fit: [2.4, .04, 1.5],
    recolor: { carpet: "#b9c8d4", carpetDarker: "#6f8fa3" },
  },
  desk: {
    url: "/models/furniture/desk.glb",
    fit: [.8, .8, 1.6],
    // Run the desk along the left wall with the drawers facing the room.
    rotation: [0, Math.PI / 2, 0],
  },
  tableLamp: {
    url: "/models/furniture/table-lamp.glb",
    fit: [.28, .54, .28],
  },
  bookcase: {
    url: "/models/furniture/bookcase.glb",
    fit: [.45, 2.2, 1.2],
    // Stand the bookcase against the left wall.
    rotation: [0, Math.PI / 2, 0],
  },
  mirror: {
    url: "/models/furniture/mirror.glb",
    fit: [.08, .95, .8],
    // Face the oval mirror into the room from above the dresser.
    rotation: [0, Math.PI / 2, 0],
  },
  pottedPlant: {
    url: "/models/furniture/potted-plant.glb",
    fit: [.7, 1.1, .7],
  },
};

export const ROOM_FURNITURE = {
  kitchen: [
    { model: "chair", position: [1.2, 0, 3.05], rotation: [0, Math.PI, 0] },
    { model: "chair", position: [.1, 0, -.45], rotation: [0, 0, 0] },
    { model: "chair", position: [2.3, 0, -.45], rotation: [0, 0, 0] },
    { model: "chair", position: [-1.35, 0, 1.3], rotation: [0, Math.PI / 2, 0] },
    { model: "barStool", position: [-2.5, 0, 1.15], rotation: [0, -Math.PI / 2, 0] },
  ],
  living: [
    { model: "armchair", position: [2.9, 0, 2.9], rotation: [0, Math.PI, 0] },
    { model: "endTable", position: [4.25, 0, 2.75], rotation: [0, 0, 0] },
    { model: "floorLamp", position: [-2.7, 0, 3], rotation: [0, 0, 0] },
    { model: "ladderShelf", position: [-4.75, 0, 3.8], rotation: [0, 0, 0] },
    { model: "clock", position: [-4.05, .88, 2.4], rotation: [0, 0, 0] },
  ],
  bathroom: [
    { model: "toilet", position: [4.15, 0, -1.1], rotation: [0, 0, 0] },
    { model: "bathMat", position: [2.8, .055, -1.45], rotation: [0, 0, 0] },
    { model: "cabinet", position: [-4.55, 0, 3.55], rotation: [0, 0, 0] },
    { model: "bucket", position: [-2.6, 0, 2.9], rotation: [0, 0, 0] },
  ],
  garage: [
    { model: "tireStack", position: [4.05, 0, 2.9], rotation: [0, 0, 0] },
    { model: "crate", position: [1.15, 0, 3.7], rotation: [0, .2, 0] },
    { model: "crate", position: [1.25, .8, 3.7], rotation: [0, -.25, 0] },
    { model: "toolbox", position: [2.95, 1.48, -4], rotation: [0, 0, 0] },
    { model: "stepLadder", position: [3.8, 0, .1], rotation: [0, 0, 0] },
    { model: "stool", position: [.4, 0, -1.85], rotation: [0, Math.PI, 0] },
  ],
  bedroom: [
    { model: "bed", position: [2.4, 0, -3.7], rotation: [0, 0, 0] },
    { model: "nightstand", position: [.85, 0, -4.35], rotation: [0, 0, 0] },
    { model: "nightstand", position: [3.95, 0, -4.35], rotation: [0, 0, 0] },
    { model: "tableLamp", position: [3.95, .54, -4.35], rotation: [0, 0, 0] },
    { model: "wardrobe", position: [-4.55, 0, -3.1], rotation: [0, 0, 0] },
    { model: "bookcase", position: [-4.55, 0, -1.35], rotation: [0, 0, 0] },
    { model: "dresser", position: [-4.55, 0, .2], rotation: [0, 0, 0] },
    { model: "mirror", position: [-4.9, 1.6, .2], rotation: [0, 0, 0] },
    { model: "desk", position: [-4.45, 0, 2.7], rotation: [0, 0, 0] },
    { model: "chair", position: [-3.45, 0, 2.7], rotation: [0, -Math.PI / 2, 0] },
    { model: "rug", position: [.45, .055, .2], rotation: [0, 0, 0] },
    { model: "pottedPlant", position: [4.25, .04, 3.6], rotation: [0, 0, 0] },
  ],
};

export const FURNITURE_CREDITS = [
  { key: "chair", title: "Chair", author: "Quaternius", license: "CC0 1.0", url: "https://poly.pizza/m/iMNqRzPwwe" },
  { key: "barStool", title: "Bar Stool", author: "Kenney", license: "CC0 1.0", url: "https://poly.pizza/m/2do92chR2k" },
  { key: "armchair", title: "Armchair", author: "CreativeTrio", license: "CC0 1.0", url: "https://poly.pizza/m/myd1WSucAz" },
  { key: "endTable", title: "End Table", author: "CreativeTrio", license: "CC0 1.0", url: "https://poly.pizza/m/8gAkbKs1ii" },
  { key: "floorLamp", title: "Lamp Round Floor", author: "Kenney", license: "CC0 1.0", url: "https://poly.pizza/m/8LiDIfXVLi" },
  { key: "ladderShelf", title: "Bookshelf", author: "CreativeTrio", license: "CC0 1.0", url: "https://poly.pizza/m/30Iealxb0p" },
  { key: "clock", title: "Alarm Clock", author: "CreativeTrio", license: "CC0 1.0", url: "https://poly.pizza/m/y5f363OS9C" },
  { key: "toilet", title: "Toilet", author: "Quaternius", license: "CC0 1.0", url: "https://poly.pizza/m/WAu50yGFVt" },
  { key: "bathMat", title: "Rug Doormat", author: "Kenney", license: "CC0 1.0", url: "https://poly.pizza/m/nwwFXS6B9T" },
  { key: "cabinet", title: "Cabinet", author: "CreativeTrio", license: "CC0 1.0", url: "https://poly.pizza/m/wOiMrnUuhe" },
  { key: "bucket", title: "Bucket", author: "Quaternius", license: "CC0 1.0", url: "https://poly.pizza/m/83obI9bNun" },
  { key: "tireStack", title: "Wheels Stack", author: "Quaternius", license: "CC0 1.0", url: "https://poly.pizza/m/o1MJrkMUPN" },
  { key: "crate", title: "Crate", author: "Quaternius", license: "CC0 1.0", url: "https://poly.pizza/m/3VGWnZPXmG" },
  { key: "toolbox", title: "Toolbox", author: "CreativeTrio", license: "CC0 1.0", url: "https://poly.pizza/m/3ImQcIK0Gp" },
  { key: "stepLadder", title: "Ladder", author: "CreativeTrio", license: "CC0 1.0", url: "https://poly.pizza/m/p1RR8Ls9EH" },
  { key: "stool", title: "Stool", author: "Quaternius", license: "CC0 1.0", url: "https://poly.pizza/m/TvaOenUAni" },
  { key: "bed", title: "Bed", author: "CreativeTrio", license: "CC0 1.0", url: "https://poly.pizza/m/rXo5Rkl5LC" },
  { key: "nightstand", title: "Night Stand", author: "Quaternius", license: "CC0 1.0", url: "https://poly.pizza/m/A9vPgVUrF9" },
  { key: "dresser", title: "Dresser", author: "CreativeTrio", license: "CC0 1.0", url: "https://poly.pizza/m/Ud8QR8Ku9e" },
  { key: "wardrobe", title: "Closet", author: "Quaternius", license: "CC0 1.0", url: "https://poly.pizza/m/BHEVb1DIuH" },
  { key: "rug", title: "Rug Rectangle", author: "Kenney", license: "CC0 1.0", url: "https://poly.pizza/m/k5oJLb49gw" },
  { key: "desk", title: "Desk", author: "CreativeTrio", license: "CC0 1.0", url: "https://poly.pizza/m/YJyJam67hJ" },
  { key: "tableLamp", title: "Lamp With Shade", author: "CreativeTrio", license: "CC0 1.0", url: "https://poly.pizza/m/1nKtMmYxLT" },
  { key: "bookcase", title: "Bookcase with Books", author: "Quaternius", license: "CC0 1.0", url: "https://poly.pizza/m/tACDGJ4CGW" },
  { key: "mirror", title: "Mirror", author: "Isa Lousberg", license: "CC0 1.0", url: "https://poly.pizza/m/2WQIUVj5qr" },
  { key: "pottedPlant", title: "Potted Plant", author: "CreativeTrio", license: "CC0 1.0", url: "https://poly.pizza/m/GJ3Bm5FDE4" },
];
