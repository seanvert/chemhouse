import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "chemhouse_language_v1";

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

const messages = {
  en: {
    language: "Language",
    chemDex: "Chem-Dex",
    openChemDex: "Open Chem-Dex",
    points: "{{count}} pts",
    quest: "Chem Quest #{{current}} / {{total}}",
    customChallenge: "Custom Ask Challenge",
    hint: "Hint",
    next: "Next →",
    findChemical: "Find a chemical/tag (acid, halogen, caffeine)...",
    ask: "Ask",
    encyclopedia: "Chem-Dex Encyclopedia",
    discoveredAcross: "{{found}} of {{total}} household chemicals discovered across 4 rooms.",
    resetProgress: "Reset Progress",
    close: "Close",
    exploreToUnlock: "Explore the {{room}} to unlock",
    chemicalsInside: "Chemicals inside",
    found: "FOUND",
    loadingWikipedia: "Loading Wikipedia summary...",
    fetchingWikipedia: "Fetching from Wikipedia...",
    chemicalCompound: "Chemical compound",
    noSummary: "No summary available.",
    wikipediaUnavailable: "Wikipedia preview unavailable",
    readWikipedia: "Read full article on Wikipedia ↗",
    moleculePubChem: "3D molecule · PubChem",
    selectChemical: "Select a chemical to load its 3D structure.",
    lookingUpPubChem: "Looking up {{chemical}} on PubChem...",
    noConformer: "PubChem has no 3D conformer for this compound.",
    moleculeUnavailable: "Could not load a PubChem 3D structure. Try another chemical.",
    newChemical: "🧪 +{{count}} new chemical discovered!",
    newChemicals: "🧪 +{{count}} new chemicals discovered!",
    questCorrect: "Correct! {{item}} solves the quest (+100 pts). Click Next!",
    questWrong: "Not quite — {{item}} contains {{chemicals}}.",
    noItemsMatch: "No items match \"{{query}}\". Try acid, halogen, salt, lithium, or polymer.",
    customPrompt: "Find an object matching \"{{query}}\" ({{count}} in the house).",
    customHint: "Try checking the {{rooms}}.",
    progressReset: "Chem-Dex progress reset.",
    modelLoadError: "Room model failed to load; showing the built-in room instead.",
    credits: "Credits",
    creditsTitle: "3D model credits",
    creditsIntro: "Household item and furniture models are ready-made low-poly assets from Poly Pizza, Quaternius, Kenney, CreativeTrio, and other creators.",
    creditsNote: "CC0 assets are public domain. CC BY 3.0 assets are credited to their authors; follow the source links for license details.",
    itemCredits: "Household items",
    furnitureCredits: "Furniture",
    viewSource: "View source",
    rooms: {
      kitchen: "Kitchen",
      living: "Living Room",
      bathroom: "Bathroom",
      garage: "Garage",
    },
    items: {},
    chemicals: {},
    quests: [],
  },
  es: {
    language: "Idioma",
    chemDex: "Quimio-Dex",
    openChemDex: "Abrir Quimio-Dex",
    points: "{{count}} pts",
    quest: "Reto químico #{{current}} / {{total}}",
    customChallenge: "Reto de búsqueda personalizado",
    hint: "Pista",
    next: "Siguiente →",
    findChemical: "Busca una sustancia o etiqueta (ácido, halógeno, cafeína)...",
    ask: "Buscar",
    encyclopedia: "Enciclopedia Quimio-Dex",
    discoveredAcross: "{{found}} de {{total}} sustancias domésticas descubiertas en 4 habitaciones.",
    resetProgress: "Reiniciar progreso",
    close: "Cerrar",
    exploreToUnlock: "Explora {{room}} para descubrirla",
    chemicalsInside: "Sustancias químicas",
    found: "ENCONTRADA",
    loadingWikipedia: "Cargando resumen de Wikipedia...",
    fetchingWikipedia: "Obteniendo datos de Wikipedia...",
    chemicalCompound: "Compuesto químico",
    noSummary: "No hay ningún resumen disponible.",
    wikipediaUnavailable: "Vista previa de Wikipedia no disponible",
    readWikipedia: "Leer el artículo completo en Wikipedia ↗",
    moleculePubChem: "Molécula 3D · PubChem",
    selectChemical: "Selecciona una sustancia para cargar su estructura 3D.",
    lookingUpPubChem: "Buscando {{chemical}} en PubChem...",
    noConformer: "PubChem no tiene un conformero 3D de este compuesto.",
    moleculeUnavailable: "No se pudo cargar la estructura 3D de PubChem. Prueba otra sustancia.",
    newChemical: "🧪 ¡Descubriste {{count}} sustancia química nueva!",
    newChemicals: "🧪 ¡Descubriste {{count}} sustancias químicas nuevas!",
    questCorrect: "¡Correcto! {{item}} resuelve el reto (+100 pts). ¡Pulsa Siguiente!",
    questWrong: "No exactamente: {{item}} contiene {{chemicals}}.",
    noItemsMatch: "No hay objetos que coincidan con «{{query}}». Prueba ácido, halógeno, sal, litio o polímero.",
    customPrompt: "Encuentra un objeto que coincida con «{{query}}» ({{count}} en la casa).",
    customHint: "Busca en {{rooms}}.",
    progressReset: "Se reinició el progreso de Quimio-Dex.",
    modelLoadError: "No se pudo cargar el modelo de la habitación; se muestra el modelo integrado.",
    credits: "Créditos",
    creditsTitle: "Créditos de modelos 3D",
    creditsIntro: "Los modelos de objetos domésticos y muebles son recursos low-poly de Poly Pizza, Quaternius, Kenney, CreativeTrio y otros creadores.",
    creditsNote: "Los recursos CC0 son de dominio público. Los recursos CC BY 3.0 se atribuyen a sus autores; consulta los enlaces para ver los detalles de la licencia.",
    itemCredits: "Objetos domésticos",
    furnitureCredits: "Muebles",
    viewSource: "Ver fuente",
    rooms: {
      kitchen: "Cocina",
      living: "Sala de estar",
      bathroom: "Baño",
      garage: "Garaje",
    },
    items: {
      banana: { name: "Plátano maduro", summary: "Una fuente natural de ésteres, azúcares y electrolitos esenciales." },
      pan: { name: "Sartén antiadherente", summary: "Utensilio de cocina con un recubrimiento de fluoropolímero de baja fricción sobre una base metálica conductora." },
      bakingsoda: { name: "Caja de bicarbonato", summary: "Polvo blanco anfótero que se usa para hacer levar masas, absorber olores y limpiar." },
      salt: { name: "Salero", summary: "Mineral iónico cristalino, esencial en la cocina y enriquecido con yodo para la alimentación." },
      vinegar: { name: "Botella de vinagre", summary: "Disolución acuosa fermentada de un ácido orgánico débil, usada para cocinar y eliminar la cal." },
      bleach: { name: "Botella de lejía", summary: "Potente desinfectante y oxidante doméstico que se guarda en el baño." },
      toothpaste: { name: "Tubo de pasta dental", summary: "Pasta dental diaria con abrasivos suaves, agentes espumantes e iones que fortalecen el esmalte." },
      alcohol: { name: "Botella de alcohol isopropílico", summary: "Antiséptico tópico de rápida evaporación y limpiador de superficies y aparatos electrónicos." },
      epsom: { name: "Tarro de sales de Epsom", summary: "Cristales minerales hidratados y solubles que se disuelven en agua tibia para aliviar los músculos." },
      smartphone: { name: "Teléfono inteligente", summary: "Computadora de bolsillo con semiconductores, vidrio conductor y baterías de litio de alta densidad." },
      plant: { name: "Planta de interior", summary: "Organismo vivo que transforma luz, agua y CO₂ en carbohidratos y oxígeno." },
      candle: { name: "Vela aromática", summary: "Combustible de hidrocarburos sólidos que se vaporiza y arde gracias a una mecha de algodón." },
      coffee: { name: "Taza de café caliente", summary: "Infusión de granos tostados rica en estimulantes del sistema nervioso central y polifenoles." },
      sparkling: { name: "Lata de agua con gas", summary: "Bebida a presión con dióxido de carbono disuelto en un envase metálico reciclable." },
      battery: { name: "Batería de automóvil", summary: "Batería recargable de plomo-ácido y alta corriente que acciona el motor de arranque." },
      superglue: { name: "Tubo de pegamento instantáneo", summary: "Adhesivo estructural de acción rápida que se polimeriza al contacto con la humedad del aire." },
      acetone: { name: "Lata de disolvente de pintura", summary: "Mezcla de disolventes orgánicos para eliminar pinturas, resinas y grasa resistentes." },
      extinguisher: { name: "Extintor", summary: "Cilindro presurizado de polvo químico ABC diseñado para sofocar incendios rápidamente." },
    },
    chemicals: {
      Isoamyl_acetate: { name: "Acetato de isoamilo", role: "Éster volátil responsable del aroma del plátano" },
      Potassium: { name: "Potasio", role: "Electrolito mineral esencial" },
      Ethylene: { name: "Etileno", role: "Gas hormonal vegetal que desencadena la maduración" },
      Fructose: { name: "Fructosa", role: "Azúcar monosacárido natural de la fruta" },
      Polytetrafluoroethylene: { name: "Politetrafluoroetileno (PTFE)", role: "Fluoropolímero hidrófobo antiadherente (teflón)" },
      Aluminium: { name: "Aluminio", role: "Cuerpo ligero de la sartén con buena conductividad térmica" },
      Sodium_bicarbonate: { name: "Bicarbonato de sodio", role: "Reacciona con ácidos y libera gas CO₂" },
      Sodium_chloride: { name: "Cloruro de sodio", role: "Mineral cristalino iónico principal" },
      Potassium_iodide: { name: "Yoduro de potasio", role: "Aditivo en pequeñas cantidades que previene la carencia de yodo" },
      Acetic_acid: { name: "Ácido acético", role: "Ácido carboxílico débil (concentración aproximada del 5 %)" },
      Water: { name: "Agua", role: "Disolvente acuoso" },
      Sodium_hypochlorite: { name: "Hipoclorito de sodio", role: "Oxidante halogenado activo para blanquear y desinfectar" },
      Sodium_hydroxide: { name: "Hidróxido de sodio", role: "Base fuerte que estabiliza el pH de la disolución" },
      Sodium_fluoride: { name: "Fluoruro de sodio", role: "Sal halógena que fortalece el esmalte dental" },
      Calcium_carbonate: { name: "Carbonato de calcio", role: "Abrasivo suave que pule y elimina la placa" },
      Sodium_laureth_sulfate: { name: "Lauril éter sulfato de sodio", role: "Tensioactivo detergente aniónico que produce espuma" },
      Isopropyl_alcohol: { name: "Alcohol isopropílico", role: "Alcohol secundario antiséptico y disolvente" },
      Magnesium_sulfate: { name: "Sulfato de magnesio", role: "Sal mineral hidratada (heptahidrato)" },
      Silicon: { name: "Silicio", role: "Semiconductor ultrapuro para los chips del procesador" },
      Indium_tin_oxide: { name: "Óxido de indio y estaño", role: "Recubrimiento conductor transparente de la pantalla táctil" },
      Lithium_cobalt_oxide: { name: "Óxido de litio y cobalto", role: "Material catódico de intercalación de la batería" },
      Chlorophyll: { name: "Clorofila", role: "Pigmento con magnesio que captura la luz solar" },
      Cellulose: { name: "Celulosa", role: "Polisacárido estructural de las paredes celulares" },
      Glucose: { name: "Glucosa", role: "Azúcar energético principal producido en la fotosíntesis" },
      Paraffin_wax: { name: "Parafina", role: "Combustible de hidrocarburos alcanos de cadena larga" },
      Vanillin: { name: "Vainillina", role: "Compuesto aromático de fragancia y tipo aldehído" },
      Caffeine: { name: "Cafeína", role: "Alcaloide estimulante de tipo metilxantina" },
      Chlorogenic_acid: { name: "Ácido clorogénico", role: "Polifenol antioxidante que contribuye a la acidez" },
      Carbon_dioxide: { name: "Dióxido de carbono", role: "Gas a presión que crea burbujas efervescentes" },
      Carbonic_acid: { name: "Ácido carbónico", role: "Ácido débil que se forma cuando el CO₂ se disuelve en agua" },
      Sulfuric_acid: { name: "Ácido sulfúrico", role: "Electrolito ácido diprótico fuerte" },
      Lead_dioxide: { name: "Óxido de plomo(IV)", role: "Material de la placa del electrodo positivo" },
      Lead: { name: "Plomo", role: "Placa de electrodo negativo de plomo metálico esponjoso" },
      Ethyl_cyanoacrylate: { name: "Cianoacrilato de etilo", role: "Monómero que cura rápidamente mediante polimerización aniónica" },
      Acetone: { name: "Acetona", role: "Disolvente de cetona más simple y de rápida evaporación" },
      Toluene: { name: "Tolueno", role: "Hidrocarburo aromático usado como diluyente de lacas" },
      Ammonium_dihydrogen_phosphate: { name: "Fosfato monoamónico", role: "Polvo seco que se funde, cubre y sofoca el fuego" },
      Nitrogen: { name: "Nitrógeno", role: "Gas propulsor inerte que presuriza el cilindro" },
    },
    quests: [
      { prompt: "Encuentra un desinfectante halogenado con cloro en el baño.", hint: "Busca en el baño una garrafa azul cerca del estante del fondo." },
      { prompt: "Encuentra el éster que da a una fruta su aroma dulce característico.", hint: "¡Mira en la isla de la cocina: hay algo amarillo!" },
      { prompt: "Encuentra un recubrimiento de fluoropolímero que evita que la comida se pegue.", hint: "Ve a la estufa de la cocina e inspecciona la sartén." },
      { prompt: "Encuentra un alcaloide estimulante de xantina en una bebida caliente.", hint: "Ve a la sala de estar y mira en la mesa de centro." },
      { prompt: "Encuentra un ácido mineral fuerte que actúa como electrolito en el garaje.", hint: "Busca en el suelo del garaje una batería de automóvil pesada." },
      { prompt: "Encuentra un gas propulsor inerte junto a polvo de fosfato para apagar incendios.", hint: "Busca el equipo de seguridad rojo en el rincón del fondo del garaje." },
      { prompt: "Encuentra una sal halógena que fortalece el esmalte dental.", hint: "Mira junto al lavabo del baño." },
      { prompt: "Encuentra un pigmento con magnesio que captura la luz solar en interiores.", hint: "Busca algo verde en un rincón de la sala de estar." },
      { prompt: "Encuentra una sal anfótera que libera CO₂ al burbujear con ácido.", hint: "Mira la caja naranja sobre la encimera de la cocina." },
      { prompt: "Encuentra un disolvente cetónico que se usa para quitar pintura y resina.", hint: "Busca una lata roja de disolvente en el banco de trabajo del garaje." },
      { prompt: "Encuentra un compuesto catódico de litio que alimenta un dispositivo táctil.", hint: "Mira en la mesa de centro de la sala de estar." },
      { prompt: "Encuentra una sal de magnesio que se usa en baños de agua tibia.", hint: "Mira el taburete redondo junto a la bañera." },
    ],
  },
};

const I18nContext = createContext(null);

function getInitialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGUAGES.some(language => language.code === saved)) return saved;
  } catch {
    // Language detection still works when storage is unavailable.
  }
  return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
}

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);
  const value = useMemo(() => {
    const dictionary = messages[language];
    const interpolate = (text, params = {}) => text.replace(/\{\{(\w+)\}\}/g, (_, key) => params[key] ?? "");
    return {
      language,
      setLanguage,
      t: (key, params) => interpolate(dictionary[key] ?? messages.en[key] ?? key, params),
      roomName: (id, fallback) => dictionary.rooms[id] ?? fallback,
      itemText: (id, field, fallback) => dictionary.items[id]?.[field] ?? fallback,
      chemicalText: (wiki, field, fallback) => dictionary.chemicals[wiki]?.[field] ?? fallback,
      questText: (index, field, fallback) => dictionary.quests[index]?.[field] ?? fallback,
    };
  }, [language]);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // The selected language remains active for the current session.
    }
  }, [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within an I18nProvider.");
  return context;
}
