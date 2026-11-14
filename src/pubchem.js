const ATOM_SYMBOLS = {
  1: "H", 6: "C", 7: "N", 8: "O", 9: "F", 15: "P",
  16: "S", 17: "Cl", 35: "Br", 53: "I",
};

const ATOM_COLORS = {
  H: "#f8fafc", C: "#334155", N: "#3b82f6", O: "#ef4444",
  F: "#22c55e", P: "#f97316", S: "#facc15", Cl: "#22c55e",
  Br: "#a16207", I: "#7c3aed",
};

export async function fetchPubChemMolecule(chemical, signal) {
  const api = "https://pubchem.ncbi.nlm.nih.gov/rest/pug";
  const lookup = await fetch(`${api}/compound/name/${encodeURIComponent(chemical.name)}/JSON`, { signal });
  if (!lookup.ok) throw new Error(`PubChem lookup returned HTTP ${lookup.status}.`);
  const compound = (await lookup.json()).PC_Compounds?.[0];
  const cid = compound?.id?.id?.cid;
  if (!cid) throw new Error("PubChem did not return a compound identifier.");

  let record = compound;
  let conformer = record.coords?.[0]?.conformers?.[0];
  if (!conformer?.z?.length) {
    const response = await fetch(`${api}/compound/cid/${cid}/record/JSON?record_type=3d`, { signal });
    if (!response.ok) throw new Error("No 3D conformer is available for this compound.");
    record = (await response.json()).PC_Compounds?.[0];
    conformer = record?.coords?.[0]?.conformers?.[0];
  }

  const elements = record?.atoms?.element;
  if (!conformer?.z?.length || !elements?.length || conformer.x.length !== elements.length) {
    throw new Error("PubChem did not provide 3D atom coordinates.");
  }

  const atoms = elements.map((atomicNumber, index) => {
    const element = ATOM_SYMBOLS[atomicNumber] || "C";
    return {
      element,
      color: ATOM_COLORS[element] || "#a78bfa",
      position: [conformer.x[index], conformer.y[index], conformer.z[index]],
    };
  });
  const bonds = (record.bonds?.aid1 || []).map((atomId, index) => ({
    a: atomId - 1,
    b: record.bonds.aid2[index] - 1,
  }));
  return { atoms, bonds };
}
