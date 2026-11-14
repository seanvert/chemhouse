import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useI18n } from "./i18n.jsx";
import { fetchPubChemMolecule } from "./pubchem.js";

function Molecule({ molecule }) {
  const group = useRef();
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * .35;
  });

  const atoms = useMemo(() => molecule.atoms.map(atom => new THREE.Vector3(...atom.position)), [molecule]);
  const scale = 1.35 / Math.max(...atoms.map(atom => atom.length()), 1);
  return (
    <>
      <ambientLight intensity={1.8} />
      <directionalLight position={[3, 4, 4]} intensity={2} />
      <group ref={group}>
        {molecule.bonds.map((bond, index) => {
          const start = atoms[bond.a].clone().multiplyScalar(scale);
          const end = atoms[bond.b].clone().multiplyScalar(scale);
          const direction = end.clone().sub(start);
          return (
            <mesh
              key={`bond-${index}`}
              position={start.clone().add(end).multiplyScalar(.5)}
              quaternion={new THREE.Quaternion().setFromUnitVectors(
                new THREE.Vector3(0, 1, 0), direction.clone().normalize(),
              )}
              scale={[1, direction.length(), 1]}
            >
              <cylinderGeometry args={[.035, .035, 1, 8]} />
              <meshStandardMaterial color="#cbd5e1" roughness={.48} />
            </mesh>
          );
        })}
        {molecule.atoms.map((atom, index) => (
          <mesh key={`atom-${index}`} position={atoms[index].clone().multiplyScalar(scale)}>
            <sphereGeometry args={[atom.element === "H" ? .085 : .14, 16, 12]} />
            <meshStandardMaterial color={atom.color} roughness={.35} />
          </mesh>
        ))}
      </group>
    </>
  );
}

export default function MoleculeViewer({ chemical }) {
  const { t, language } = useI18n();
  const [molecule, setMolecule] = useState(null);
  const [status, setStatus] = useState(() => t("selectChemical"));

  useEffect(() => {
    if (!chemical) return undefined;
    const controller = new AbortController();
    setMolecule(null);
    setStatus(t("lookingUpPubChem", { chemical: chemical.name }));
    fetchPubChemMolecule(chemical, controller.signal).then(result => {
      setMolecule(result);
      setStatus("");
    }).catch(error => {
      if (error.name === "AbortError") return;
      setStatus(error.message.includes("No 3D") || error.message.includes("coordinates")
        ? t("noConformer")
        : t("moleculeUnavailable"));
    });
    return () => controller.abort();
  }, [chemical, language, t]);

  return (
    <div className="molecule-wrap">
      <Canvas camera={{ position: [0, 0, 4.4], fov: 40 }} dpr={[1, 1.5]}>
        {molecule && <Molecule molecule={molecule} />}
      </Canvas>
      {status && <div className="molecule-status">{status}</div>}
    </div>
  );
}
