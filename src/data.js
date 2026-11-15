export const ROOMS = [
  { id: "kitchen", label: "Kitchen", icon: "🍳" },
  { id: "living", label: "Living Room", icon: "🛋️" },
  { id: "bedroom", label: "Bedroom", icon: "🛏️" },
  { id: "bathroom", label: "Bathroom", icon: "🧼" },
  { id: "garage", label: "Garage", icon: "🔋" },
];

export const ITEMS = {
  banana: {
    name: "Ripe Banana", room: "kitchen", kind: "banana", position: [.35, 1.15, 1.2],
    tags: ["fruit", "ester", "aroma", "potassium", "sugar", "ripening", "alkene"],
    summary: "A biological powerhouse of natural esters, sugars, and essential electrolytes.",
    chemicals: [
      { name: "Isoamyl acetate", formula: "C₇H₁₄O₂", role: "Volatile ester responsible for banana aroma", wiki: "Isoamyl_acetate" },
      { name: "Potassium", formula: "K⁺", role: "Essential mineral electrolyte", wiki: "Potassium" },
      { name: "Ethylene", formula: "C₂H₄", role: "Plant hormone gas that triggers ripening", wiki: "Ethylene" },
      { name: "Fructose", formula: "C₆H₁₂O₆", role: "Natural fruit monosaccharide sugar", wiki: "Fructose" },
    ],
  },
  pan: {
    name: "Non-Stick Frying Pan", room: "kitchen", kind: "pan", position: [-1.6, 1.48, -3.7],
    tags: ["polymer", "fluorine", "halogen", "metal", "teflon", "non-stick"],
    summary: "Cookware coated with ultra-low-friction fluoropolymer over a conductive metal base.",
    chemicals: [
      { name: "Polytetrafluoroethylene (PTFE)", formula: "(C₂F₄)ₙ", role: "Non-stick hydrophobic fluoropolymer (Teflon)", wiki: "Polytetrafluoroethylene" },
      { name: "Aluminium", formula: "Al", role: "Lightweight thermally conductive pan body", wiki: "Aluminium" },
    ],
  },
  bakingsoda: {
    name: "Baking Soda Box", room: "kitchen", kind: "box", position: [1, 1.44, -4],
    tags: ["base", "alkaline", "salt", "co2", "leavening", "bicarbonate"],
    summary: "Amphoteric white powder used for baking leavening, odor absorption, and cleaning.",
    chemicals: [{ name: "Sodium bicarbonate", formula: "NaHCO₃", role: "Reacts with acids to release CO₂ gas", wiki: "Sodium_bicarbonate" }],
  },
  salt: {
    name: "Table Salt Shaker", room: "kitchen", kind: "salt", position: [2.1, 1.16, 1.4],
    tags: ["salt", "ionic", "halogen", "chlorine", "iodine", "seasoning"],
    summary: "Crystalline ionic mineral essential for cooking and dietary iodine supplementation.",
    chemicals: [
      { name: "Sodium chloride", formula: "NaCl", role: "Primary ionic crystal mineral", wiki: "Sodium_chloride" },
      { name: "Potassium iodide", formula: "KI", role: "Trace additive preventing iodine deficiency", wiki: "Potassium_iodide" },
    ],
  },
  vinegar: {
    name: "Vinegar Bottle", room: "kitchen", kind: "vinegar", position: [2.8, 1.44, -4],
    tags: ["acid", "carboxylic", "sour", "pickling", "cleaning"],
    summary: "Fermented aqueous solution of weak organic acid used in cooking and descaling.",
    chemicals: [
      { name: "Acetic acid", formula: "CH₃COOH", role: "Weak carboxylic acid (~5% concentration)", wiki: "Acetic_acid" },
      { name: "Water", formula: "H₂O", role: "Aqueous solvent", wiki: "Water" },
    ],
  },
  bleach: {
    name: "Bleach Bottle", room: "bathroom", kind: "bleach", position: [-1.5, .9, -4.1],
    tags: ["halogen", "chlorine", "disinfectant", "oxidizer", "alkaline", "base"],
    summary: "Powerful household disinfectant and oxidizer stored in the bathroom.",
    chemicals: [
      { name: "Sodium hypochlorite", formula: "NaClO", role: "Active halogen bleaching & disinfecting oxidizer", wiki: "Sodium_hypochlorite" },
      { name: "Sodium hydroxide", formula: "NaOH", role: "Strong base stabilizing solution pH", wiki: "Sodium_hydroxide" },
      { name: "Water", formula: "H₂O", role: "Aqueous carrier solvent", wiki: "Water" },
    ],
  },
  toothpaste: {
    name: "Toothpaste Tube", room: "bathroom", kind: "toothpaste", position: [-3.65, 1.52, .65],
    tags: ["halogen", "fluorine", "fluoride", "dental", "surfactant", "abrasive"],
    summary: "Daily dental paste combining mild abrasives, foaming agents, and enamel-strengthening ions.",
    chemicals: [
      { name: "Sodium fluoride", formula: "NaF", role: "Halide salt that strengthens tooth enamel", wiki: "Sodium_fluoride" },
      { name: "Calcium carbonate", formula: "CaCO₃", role: "Mild abrasive to polish away plaque", wiki: "Calcium_carbonate" },
      { name: "Sodium laureth sulfate", formula: "SLES", role: "Anionic foaming detergent surfactant", wiki: "Sodium_laureth_sulfate" },
    ],
  },
  alcohol: {
    name: "Rubbing Alcohol Bottle", room: "bathroom", kind: "alcohol", position: [-3.8, 1.44, -1.7],
    tags: ["alcohol", "antiseptic", "solvent", "disinfectant", "volatile"],
    summary: "Fast-evaporating topical antiseptic and electronics/surface cleaner.",
    chemicals: [
      { name: "Isopropyl alcohol", formula: "C₃H₈O", role: "Antiseptic secondary alcohol & solvent", wiki: "Isopropyl_alcohol" },
      { name: "Water", formula: "H₂O", role: "Diluent (typically 30%) improving membrane penetration", wiki: "Water" },
    ],
  },
  epsom: {
    name: "Epsom Salt Jar", room: "bathroom", kind: "epsom", position: [1.2, .78, -1.2],
    tags: ["magnesium", "salt", "sulfate", "bath", "mineral"],
    summary: "Soluble hydrated mineral crystals dissolved in warm bathwater to soothe muscles.",
    chemicals: [{ name: "Magnesium sulfate", formula: "MgSO₄", role: "Hydrated mineral salt (heptahydrate)", wiki: "Magnesium_sulfate" }],
  },
  smartphone: {
    name: "Smartphone", room: "living", kind: "phone", position: [-.25, .71, .95],
    tags: ["electronics", "semiconductor", "lithium", "battery", "metal", "screen"],
    summary: "Pocket computer packed with semiconductors, conductive glass, and high-density lithium cells.",
    chemicals: [
      { name: "Silicon", formula: "Si", role: "Ultrapure semiconductor for processor chips", wiki: "Silicon" },
      { name: "Indium tin oxide", formula: "ITO", role: "Transparent conductive touchscreen coating", wiki: "Indium_tin_oxide" },
      { name: "Lithium cobalt oxide", formula: "LiCoO₂", role: "Intercalation cathode inside the battery", wiki: "Lithium_cobalt_oxide" },
    ],
  },
  plant: {
    name: "Houseplant", room: "living", kind: "plant", position: [-3.6, .05, -3.6],
    tags: ["biology", "photosynthesis", "pigment", "green", "polymer", "sugar"],
    summary: "Living indoor organism converting light, water, and CO₂ into carbohydrates and oxygen.",
    chemicals: [
      { name: "Chlorophyll", formula: "C₅₅H₇₂MgN₄O₅", role: "Magnesium-centered pigment capturing sunlight", wiki: "Chlorophyll" },
      { name: "Cellulose", formula: "(C₆H₁₀O₅)ₙ", role: "Structural polysaccharide in cell walls", wiki: "Cellulose" },
      { name: "Glucose", formula: "C₆H₁₂O₆", role: "Primary energy sugar made in photosynthesis", wiki: "Glucose" },
    ],
  },
  candle: {
    name: "Scented Candle", room: "living", kind: "candle", position: [.95, .68, .55],
    tags: ["wax", "hydrocarbon", "alkane", "fragrance", "aromatic", "combustion"],
    summary: "Solid hydrocarbon fuel that vaporizes and combusts via a cotton wick.",
    chemicals: [
      { name: "Paraffin wax", formula: "CₙH₂ₙ₊₂", role: "Long-chain alkane hydrocarbon fuel", wiki: "Paraffin_wax" },
      { name: "Vanillin", formula: "C₈H₈O₃", role: "Aromatic aldehyde fragrance compound", wiki: "Vanillin" },
    ],
  },
  coffee: {
    name: "Hot Coffee Mug", room: "living", kind: "coffee", position: [2, .68, 1.2],
    tags: ["caffeine", "alkaloid", "stimulant", "antioxidant", "drink"],
    summary: "Roasted bean infusion rich in central-nervous-system stimulants and polyphenols.",
    chemicals: [
      { name: "Caffeine", formula: "C₈H₁₀N₄O₂", role: "Methylxanthine alkaloid stimulant", wiki: "Caffeine" },
      { name: "Chlorogenic acid", formula: "C₁₆H₁₈O₉", role: "Antioxidant polyphenol contributing to acidity", wiki: "Chlorogenic_acid" },
    ],
  },
  sparkling: {
    name: "Sparkling Water Can", room: "living", kind: "sparkling", position: [3.9, .84, -3.2],
    tags: ["gas", "acid", "fizz", "carbonation", "metal", "can"],
    summary: "Pressurized beverage holding dissolved carbon dioxide inside a recyclable metal shell.",
    chemicals: [
      { name: "Carbon dioxide", formula: "CO₂", role: "Pressurized gas creating effervescent bubbles", wiki: "Carbon_dioxide" },
      { name: "Carbonic acid", formula: "H₂CO₃", role: "Weak acid formed when CO₂ dissolves in water", wiki: "Carbonic_acid" },
      { name: "Aluminium", formula: "Al", role: "Lightweight corrosion-resistant can alloy", wiki: "Aluminium" },
    ],
  },
  battery: {
    name: "Car Battery", room: "garage", kind: "battery", position: [-2.2, .19, 1.8],
    tags: ["acid", "electrolyte", "lead", "heavy metal", "electrochemistry"],
    summary: "High-current rechargeable lead-acid cell used to crank vehicle starter motors.",
    chemicals: [
      { name: "Sulfuric acid", formula: "H₂SO₄", role: "Strong diprotic acid electrolyte", wiki: "Sulfuric_acid" },
      { name: "Lead(IV) oxide", formula: "PbO₂", role: "Positive electrode plate material", wiki: "Lead_dioxide" },
      { name: "Lead", formula: "Pb", role: "Spongy metallic negative electrode plate", wiki: "Lead" },
    ],
  },
  superglue: {
    name: "Super Glue Tube", room: "garage", kind: "superglue", position: [-1.2, 1.48, -3.7],
    tags: ["adhesive", "polymer", "monomer", "glue"],
    summary: "Fast-acting structural adhesive that polymerizes on contact with trace air moisture.",
    chemicals: [{ name: "Ethyl cyanoacrylate", formula: "C₆H₇NO₂", role: "Monomer curing rapidly via anionic polymerization", wiki: "Ethyl_cyanoacrylate" }],
  },
  acetone: {
    name: "Paint Remover Can", room: "garage", kind: "acetone", position: [1.5, 1.48, -3.8],
    tags: ["solvent", "ketone", "aromatic", "flammable", "paint"],
    summary: "Industrial organic solvent blend designed to strip tough paints, resins, and grease.",
    chemicals: [
      { name: "Acetone", formula: "(CH₃)₂CO", role: "Fast-evaporating simplest ketone solvent", wiki: "Acetone" },
      { name: "Toluene", formula: "C₇H₈", role: "Aromatic hydrocarbon lacquer thinner", wiki: "Toluene" },
    ],
  },
  extinguisher: {
    name: "Fire Extinguisher", room: "garage", kind: "extinguisher", position: [-3.8, .05, -3.5],
    tags: ["fire", "gas", "nitrogen", "phosphate", "safety"],
    summary: "Pressurized ABC dry-chemical canister engineered to smother flames rapidly.",
    chemicals: [
      { name: "Monoammonium phosphate", formula: "NH₄H₂PO₄", role: "Dry powder that melts to coat & smother fires", wiki: "Ammonium_dihydrogen_phosphate" },
      { name: "Nitrogen", formula: "N₂", role: "Inert propellant gas pressurizing the cylinder", wiki: "Nitrogen" },
    ],
  },
  blanket: {
    name: "Wool Blanket", room: "bedroom", kind: "blanket", position: [2.4, .59, -2.95],
    tags: ["wool", "protein", "keratin", "textile", "lanolin", "sulfur"],
    summary: "Warm woven wool textile built from crimped protein fibers that trap insulating air.",
    chemicals: [
      { name: "Keratin", formula: "C₄₇H₈₃N₁₇O₁₅S₂", role: "Sulfur-rich structural protein in wool fibers", wiki: "Keratin" },
      { name: "Lanolin", formula: "C₃₄H₆₈O₂", role: "Natural wax coating that makes wool water-resistant", wiki: "Lanolin" },
      { name: "Cystine", formula: "C₆H₁₂N₂O₄S₂", role: "Amino acid whose disulfide bridges give wool elasticity", wiki: "Cystine" },
    ],
  },
  book: {
    name: "Open Book", room: "bedroom", kind: "book", position: [-4.38, .57, 2.25],
    tags: ["paper", "cellulose", "lignin", "pigment", "print", "polymer"],
    summary: "Printed pages of pressed plant fibers coated with mineral pigment and carbon ink.",
    chemicals: [
      { name: "Cellulose", formula: "(C₆H₁₀O₅)ₙ", role: "Main structural polymer in paper fibers", wiki: "Cellulose" },
      { name: "Lignin", formula: "C₈₁H₉₂O₂₁", role: "Aromatic polymer that makes paper yellow with age", wiki: "Lignin" },
      { name: "Titanium dioxide", formula: "TiO₂", role: "White opacifier and bright paper coating pigment", wiki: "Titanium_dioxide" },
      { name: "Carbon black", formula: "C", role: "Fine carbon pigment used in black printing ink", wiki: "Carbon_black" },
    ],
  },
  glasses: {
    name: "Reading Glasses", room: "bedroom", kind: "glasses", position: [.85, .55, -4.35],
    tags: ["polymer", "polycarbonate", "bisphenol", "lens", "acetate", "optical"],
    summary: "Lightweight spectacles pairing impact-resistant polymer lenses with molded acetate frames.",
    chemicals: [
      { name: "Polycarbonate", formula: "(C₁₆H₁₄O₃)ₙ", role: "Impact-resistant transparent lens polymer", wiki: "Polycarbonate" },
      { name: "Bisphenol A", formula: "C₁₅H₁₆O₂", role: "Monomer used to manufacture polycarbonate", wiki: "Bisphenol_A" },
      { name: "Cellulose acetate", formula: "(C₁₀H₁₆O₈)ₙ", role: "Lightweight bioplastic used for spectacle frames", wiki: "Cellulose_acetate" },
    ],
  },
  perfume: {
    name: "Perfume Bottle", room: "bedroom", kind: "perfume", position: [-4.4, .91, .2],
    tags: ["fragrance", "alcohol", "terpene", "ester", "volatile", "aroma"],
    summary: "Alcohol-based fragrance blending volatile citrus terpenes and floral scent molecules.",
    chemicals: [
      { name: "Ethanol", formula: "C₂H₅OH", role: "Volatile solvent that carries fragrance into the air", wiki: "Ethanol" },
      { name: "Limonene", formula: "C₁₀H₁₆", role: "Citrus-scented cyclic terpene", wiki: "Limonene" },
      { name: "Linalool", formula: "C₁₀H₁₈O", role: "Floral terpene alcohol found in lavender", wiki: "Linalool" },
      { name: "Geraniol", formula: "C₁₀H₁₈O", role: "Rose-scented monoterpenoid alcohol", wiki: "Geraniol" },
    ],
  },
  slippers: {
    name: "Foam Slippers", room: "bedroom", kind: "slippers", position: [.55, .07, .2],
    tags: ["polymer", "foam", "eva", "rubber", "textile", "cushion"],
    summary: "Soft house slippers with molded foam soles and cozy synthetic textile uppers.",
    chemicals: [
      { name: "Ethylene-vinyl acetate", formula: "(C₂H₄)ₙ(C₄H₆O₂)ₘ", role: "Cushiony copolymer foam used for the sole", wiki: "Ethylene-vinyl_acetate" },
      { name: "Polyester", formula: "(C₁₀H₈O₄)ₙ", role: "Durable synthetic fibers in the upper fabric", wiki: "Polyester" },
      { name: "Natural rubber", formula: "(C₅H₈)ₙ", role: "Elastic polyisoprene that adds grip", wiki: "Natural_rubber" },
    ],
  },
};

export const CHEMICALS = [];
const chemicalKeys = new Set();
Object.values(ITEMS).forEach(item => item.chemicals.forEach(chemical => {
  if (chemicalKeys.has(chemical.wiki)) return;
  chemicalKeys.add(chemical.wiki);
  CHEMICALS.push({ ...chemical, foundIn: item.name, room: ROOMS.find(room => room.id === item.room).label });
}));

export const QUESTS = [
  { prompt: "Find a halogen disinfectant containing chlorine in the Bathroom.", answers: ["bleach"], hint: "Look in the Bathroom for a blue jug near the back shelf." },
  { prompt: "Find the ester that gives a fruit its classic sweet smell in the Kitchen.", answers: ["banana"], hint: "Check the Kitchen island for something yellow!" },
  { prompt: "Find a fluoropolymer coating that keeps food from sticking.", answers: ["pan"], hint: "Head to the Kitchen stove and inspect the skillet." },
  { prompt: "Find a xanthine stimulant alkaloid inside a warm drink.", answers: ["coffee"], hint: "Relax in the Living Room and check the coffee table." },
  { prompt: "Find a strong mineral acid acting as an electrolyte in the Garage.", answers: ["battery"], hint: "Look on the Garage floor pallet for a heavy automotive power box." },
  { prompt: "Find an inert gas propellant paired with phosphate powder to stop fires.", answers: ["extinguisher"], hint: "Check the back corner of the Garage for red safety gear." },
  { prompt: "Find a halide salt that strengthens tooth enamel against decay.", answers: ["toothpaste"], hint: "Check the Bathroom vanity sink." },
  { prompt: "Find a magnesium-centered pigment capturing sunlight indoors.", answers: ["plant"], hint: "Look in the corner of the Living Room for something green." },
  { prompt: "Find an amphoteric salt that fizzes with acid to release CO₂ gas.", answers: ["bakingsoda"], hint: "Check the orange box on the Kitchen counter." },
  { prompt: "Find a ketone solvent used for stripping paint and resin.", answers: ["acetone"], hint: "Look on the Garage workbench for a red metal solvent tin." },
  { prompt: "Find a lithium cathode compound powering a touchscreen device.", answers: ["smartphone"], hint: "Check the Living Room coffee table." },
  { prompt: "Find a magnesium salt used for soothing warm bath soaks.", answers: ["epsom"], hint: "Look on the round stool next to the Bathroom tub." },
  { prompt: "Find a sulfur-rich protein fiber that keeps you warm in the Bedroom.", answers: ["blanket"], hint: "Check the foot of the bed for a rolled-up wool blanket." },
  { prompt: "Find an aromatic polymer that makes paper turn yellow with age.", answers: ["book"], hint: "Look on the Bedroom desk for an open book." },
  { prompt: "Find a transparent impact-resistant polymer used in eyeglass lenses.", answers: ["glasses"], hint: "Check the bedside table on the left side of the bed." },
  { prompt: "Find a citrus terpene dissolved in a volatile alcohol.", answers: ["perfume"], hint: "Look on the dresser along the Bedroom's left wall." },
  { prompt: "Find a copolymer foam that cushions your steps.", answers: ["slippers"], hint: "Look on the rug in the middle of the Bedroom." },
];
