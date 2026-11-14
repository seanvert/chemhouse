import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RoundedBox } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { ITEMS } from "./data.js";
import { ITEM_ASSETS } from "./itemAssets.js";
import { FURNITURE, ROOM_FURNITURE } from "./furnitureAssets.js";

function Box({ size, position, color, rotation = [0, 0, 0], roughness = .72, metalness = .02, castShadow = true }) {
  return (
    <mesh position={position} rotation={rotation} castShadow={castShadow} receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}

function Round({ size, position, color, radius = .05, rotation = [0, 0, 0], roughness = .72 }) {
  return (
    <RoundedBox args={size} radius={radius} smoothness={3} position={position} rotation={rotation} castShadow receiveShadow>
      <meshStandardMaterial color={color} roughness={roughness} />
    </RoundedBox>
  );
}

function Cylinder({ radiusTop, radiusBottom = radiusTop, height, position, color, rotation = [0, 0, 0], radialSegments = 16, openEnded = false, roughness = .48 }) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <cylinderGeometry args={[radiusTop, radiusBottom, height, radialSegments, 1, openEnded]} />
      <meshStandardMaterial color={color} roughness={roughness} />
    </mesh>
  );
}

function Sphere({ position, color, scale, rotation = [0, 0, 0], roughness = .55 }) {
  return (
    <mesh position={position} scale={scale} rotation={rotation} castShadow receiveShadow>
      <sphereGeometry args={[1, 12, 10]} />
      <meshStandardMaterial color={color} roughness={roughness} />
    </mesh>
  );
}

function AnimatedFlame({ position = [0, .52, 0] }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const time = clock.elapsedTime;
    ref.current.scale.set(1 + Math.sin(time * 14) * .12, 1 + Math.cos(time * 19) * .16, 1);
    ref.current.position.y = position[1] + Math.sin(time * 12) * .01;
  });
  return (
    <mesh ref={ref} position={position}>
      <coneGeometry args={[.06, .18, 10]} />
      <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={1.6} />
    </mesh>
  );
}

function Steam({ index, baseY = .45, height = .5, spread = .05 }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const cycle = (clock.elapsedTime * .6 + index * 2.1) % 1;
    ref.current.position.y = baseY + cycle * height;
    ref.current.scale.setScalar(.6 + cycle * .9);
    ref.current.material.opacity = (1 - cycle) * .45;
  });
  return (
    <mesh ref={ref} position={[(index - 1) * spread, baseY + index * .12, 0]}>
      <sphereGeometry args={[.06, 8, 8]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={.45} />
    </mesh>
  );
}

function Lathe({ points, position = [0, 0, 0], color, segments = 22, roughness = .4 }) {
  const geometry = useMemo(
    () => new THREE.LatheGeometry(points.map(([radius, y]) => new THREE.Vector2(radius, y)), segments),
    [points, segments],
  );
  return (
    <mesh geometry={geometry} position={position} castShadow receiveShadow>
      <meshStandardMaterial color={color} roughness={roughness} />
    </mesh>
  );
}

function Tube({ points, radius, color, segments = 18 }) {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map(point => new THREE.Vector3(...point)));
    return new THREE.TubeGeometry(curve, segments, radius, 10, false);
  }, [points, radius, segments]);
  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial color={color} roughness={.5} />
    </mesh>
  );
}

function RoomShell({ room }) {
  const floors = {
    kitchen: "#fef3c7",
    living: "#a16207",
    bathroom: "#e0f2fe",
    garage: "#475569",
  };
  const walls = { kitchen: "#f8fafc", living: "#f1f5f9", bathroom: "#f8fafc", garage: "#cbd5e1" };
  const trims = { kitchen: "#cbd5e1", living: "#e2e8f0", bathroom: "#7dd3fc", garage: "#334155" };
  const grout = room === "bathroom" ? "#bae6fd" : "#e2e8f0";
  return (
    <>
      <Round size={[10.6, .44, 10.6]} position={[0, -.32, 0]} color="#1e293b" />
      <Box size={[10, .16, 10]} position={[0, -.04, 0]} color={floors[room]} castShadow={false} />
      {room === "bathroom" || room === "kitchen" ? (
        <group>
          {Array.from({ length: 7 }, (_, index) => (
            <Box key={`tile-x-${index}`} size={[.035, .012, 10]} position={[-4.2 + index * 1.4, .045, 0]} color={grout} castShadow={false} />
          ))}
          {Array.from({ length: 7 }, (_, index) => (
            <Box key={`tile-z-${index}`} size={[10, .012, .035]} position={[0, .046, -4.2 + index * 1.4]} color={grout} castShadow={false} />
          ))}
        </group>
      ) : null}
      <Round size={[10.25, 4.4, .28]} position={[0, 2.2, -5]} color={walls[room]} radius={.04} />
      <Round size={[.28, 4.4, 10.25]} position={[-5, 2.2, 0]} color={walls[room]} radius={.04} />
      <Box size={[10, .22, .34]} position={[0, .12, -4.96]} color={trims[room]} />
      <Box size={[.34, .22, 10]} position={[-4.96, .12, 0]} color={trims[room]} />
    </>
  );
}

function Kitchen() {
  return (
    <>
      <Box size={[8.2, 1.35, .06]} position={[.7, 2.1, -4.84]} color="#dbeafe" />
      <Round size={[2.3, 1.45, .16]} position={[-4.84, 2.75, -1]} color="#475569" />
      <Box size={[.06, 1.2, 2]} position={[-4.77, 2.75, -1]} color="#7dd3fc" />
      <Round size={[8.2, 1.32, 1.7]} position={[.7, .66, -4]} color="#f1f5f9" />
      <Round size={[8.36, .12, 1.82]} position={[.7, 1.38, -4]} color="#334155" radius={.03} />
      <Round size={[1.7, 1.32, 4.8]} position={[-4, .66, -.8]} color="#f1f5f9" />
      <Round size={[1.82, .12, 4.9]} position={[-4, 1.38, -.8]} color="#334155" radius={.03} />
      {[-2.8, -1.45, -.1, 1.25, 2.6, 3.95].map(x => (
        <group key={x}>
          <Round size={[1.15, .95, .08]} position={[x, .65, -3.14]} color="#e2e8f0" radius={.02} />
          <Cylinder radiusTop={.02} height={.28} position={[x + .4, .72, -3.08]} color="#94a3b8" />
        </group>
      ))}
      <Round size={[1.75, .06, 1.5]} position={[-1.6, 1.45, -3.95]} color="#0f172a" radius={.02} />
      {[[-2, -4.2], [-1.2, -4.2], [-2, -3.65], [-1.2, -3.65]].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 1.49, z]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[.22, .03, 8, 18]} />
          <meshStandardMaterial color="#475569" metalness={.6} roughness={.3} />
        </mesh>
      ))}
      <Box size={[1.2, .06, .95]} position={[-3.95, 1.44, -1]} color="#94a3b8" />
      <Tube points={[[-4.35, 1.45, -1], [-4.35, 2.05, -1], [-4, 2.15, -1], [-3.95, 1.88, -1]]} radius={.035} color="#cbd5e1" />
      <Round size={[1.85, 3.65, 1.85]} position={[-3.9, 1.82, 3.2]} color="#93c5fd" radius={.08} />
      <Box size={[1.88, .04, .05]} position={[-3.9, 2.45, 2.26]} color="#1e3a8a" />
      <Cylinder radiusTop={.03} height={.95} position={[-3, 1.65, 2.2]} color="#cbd5e1" />
      <Cylinder radiusTop={.03} height={.65} position={[-3, 2.95, 2.2]} color="#cbd5e1" />
      <Round size={[3.4, 1.02, 2.1]} position={[1.2, .51, 1.3]} color="#78350f" radius={.05} />
      <Round size={[3.75, .14, 2.45]} position={[1.2, 1.09, 1.3]} color="#fde68a" radius={.04} />
    </>
  );
}

function LivingRoom() {
  return (
    <>
      <Round size={[2.1, 1.4, .1]} position={[.5, 2.75, -4.84]} color="#451a03" />
      <Box size={[1.85, 1.15, .04]} position={[.5, 2.75, -4.79]} color="#38bdf8" />
      <Round size={[6, .05, 4.7]} position={[.8, .06, .9]} color="#fef08a" />
      <Round size={[5.2, .06, 3.9]} position={[.8, .06, .9]} color="#fde047" />
      <Round size={[4.9, .45, 1.85]} position={[.5, .35, -3.2]} color="#1d4ed8" radius={.08} />
      <Round size={[4.9, 1.15, .42]} position={[.5, .9, -3.95]} color="#1d4ed8" radius={.1} />
      {[-1.78, 2.78].map(x => <Round key={x} size={[.45, .8, 1.85]} position={[x, .62, -3.2]} color="#1d4ed8" radius={.1} />)}
      {[-.6, .5, 1.6].map(x => (
        <group key={x}>
          <Round size={[1.06, .26, 1.38]} position={[x, .66, -3.08]} color="#3b82f6" radius={.08} />
          <Round size={[1.04, .72, .3]} position={[x, 1.05, -3.65]} rotation={[-.15, 0, 0]} color="#3b82f6" radius={.08} />
        </group>
      ))}
      <Round size={[.6, .55, .25]} position={[-1.2, .98, -3.3]} rotation={[0, .35, .2]} color="#fbbf24" radius={.08} />
      <Round size={[1.35, .12, 1.35]} position={[3.9, .78, -3.2]} color="#78350f" radius={.03} />
      <Cylinder radiusTop={.08} radiusBottom={.06} height={.75} position={[3.9, .38, -3.2]} color="#78350f" />
      <Round size={[3.8, .12, 2.1]} position={[.8, .62, .9]} color="#78350f" radius={.04} />
      {[[-.85, .05], [2.45, .05], [-.85, 1.75], [2.45, 1.75]].map(([x, z]) => (
        <Cylinder key={`${x}-${z}`} radiusTop={.07} radiusBottom={.045} height={.58} position={[x, .29, z]} color="#451a03" />
      ))}
      <Round size={[1.25, .85, 3.8]} position={[-4.2, .45, .9]} color="#334155" radius={.04} />
      <Round size={[.14, 1.9, 3.2]} position={[-4.65, 2, .9]} color="#0f172a" radius={.03} />
      <Box size={[.04, 1.65, 2.95]} position={[-4.57, 2, .9]} color="#0ea5e9" />
    </>
  );
}

function Bathroom() {
  return (
    <>
      <Round size={[4.8, 1, 2.3]} position={[2.2, .52, -3.5]} color="#f8fafc" radius={.16} />
      <Round size={[4.2, .15, 1.75]} position={[2.2, .96, -3.5]} color="#38bdf8" radius={.05} />
      <Tube points={[[4.3, 1, -3.5], [4.3, 1.45, -3.5], [3.95, 1.45, -3.5]]} radius={.04} color="#cbd5e1" />
      <Round size={[1.9, 1.32, 4.2]} position={[-3.9, .66, -.5]} color="#64748b" radius={.04} />
      <Round size={[2, .12, 4.3]} position={[-3.9, 1.38, -.5]} color="#f8fafc" radius={.03} />
      <Cylinder radiusTop={.55} radiusBottom={.42} height={.12} position={[-3.7, 1.42, -.5]} color="#e2e8f0" />
      <Tube points={[[-4.35, 1.44, -.5], [-4.35, 1.88, -.5], [-4, 1.9, -.5]]} radius={.035} color="#cbd5e1" />
      <Round size={[.12, 1.8, 2.7]} position={[-4.8, 2.55, -.5]} color="#cbd5e1" radius={.04} />
      <Box size={[.05, 1.62, 2.5]} position={[-4.74, 2.55, -.5]} color="#bae6fd" />
      <Round size={[1.4, .9, 1.2]} position={[-1.5, .45, -4.1]} color="#cbd5e1" radius={.04} />
      <Cylinder radiusTop={.65} height={.12} position={[1.2, .72, -1.2]} color="#facc15" />
      <Cylinder radiusTop={.12} radiusBottom={.2} height={.68} position={[1.2, .35, -1.2]} color="#92400e" />
      <Lathe points={[[0, 0], [.35, 0], [.46, .75], [0, .75]]} position={[3.6, .04, 2.6]} color="#f8fafc" />
      <Round size={[.9, .95, .45]} position={[3.6, 1, 3.05]} color="#f8fafc" radius={.06} />
    </>
  );
}

function Garage() {
  return (
    <>
      <Round size={[7.2, .16, 1.95]} position={[.8, 1.4, -3.8]} color="#b45309" radius={.03} />
      {[[-2.5, -4.6], [4.1, -4.6], [-2.5, -3], [4.1, -3]].map(([x, z]) => (
        <Box key={`${x}-${z}`} size={[.18, 1.35, .18]} position={[x, .68, z]} color="#334155" />
      ))}
      <Round size={[1.8, 1.15, 1.5]} position={[3.1, .7, -3.8]} color="#dc2626" radius={.03} />
      <Round size={[6.4, 1.75, .12]} position={[.8, 2.55, -4.8]} color="#78350f" radius={.03} />
      <Box size={[.12, .9, .08]} position={[-.8, 2.55, -4.7]} color="#94a3b8" />
      <mesh position={[-.8, 3.05, -4.7]}>
        <torusGeometry args={[.14, .04, 8, 12, Math.PI * 1.4]} />
        <meshStandardMaterial color="#94a3b8" metalness={.8} roughness={.25} />
      </mesh>
      <Box size={[2.8, .18, 2.2]} position={[-2.2, .1, 1.8]} color="#92400e" />
      {[-.3, .8, 1.9].map(y => (
        <Box key={y} size={[1.5, .1, 3.1]} position={[-4, y, 1.2]} color="#475569" />
      ))}
      <Box size={[1.5, 2.8, .12]} position={[-4, 1.4, -.3]} color="#334155" />
      <Box size={[1.5, 2.8, .12]} position={[-4, 1.4, 2.7]} color="#334155" />
    </>
  );
}

function Banana() {
  return (
    <>
      <Tube points={[[-.42, .08, .12], [-.15, .2, -.08], [.18, .2, -.08], [.42, .1, .14]]} radius={.105} color="#facc15" segments={22} />
      <Cylinder radiusTop={.03} radiusBottom={.05} height={.12} position={[.46, .08, .18]} color="#713f12" />
    </>
  );
}

function Pan() {
  return (
    <>
      <Lathe points={[[0, 0], [.54, 0], [.64, .18], [.6, .2], [.51, .04], [0, .04]]} color="#1e293b" segments={26} />
      <mesh position={[0, .19, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[.62, .02, 8, 26]} />
        <meshStandardMaterial color="#cbd5e1" metalness={.7} roughness={.25} />
      </mesh>
      <Tube points={[[.58, .15, 0], [1.05, .25, 0], [1.42, .28, 0]]} radius={.045} color="#0f172a" />
    </>
  );
}

function Jar({ accent = "#059669", title = "EPSOM", formula = "MgSO4", body = "#a7f3d0" }) {
  return (
    <>
      <Lathe points={[[0, 0], [.32, 0], [.34, .54], [.28, .6], [0, .6]]} color={body} roughness={.25} />
      <Cylinder radiusTop={.345} height={.3} position={[0, .28, 0]} color="#f8fafc" openEnded />
      <Box size={[.45, .16, .025]} position={[0, .28, .34]} color={accent} />
      <Cylinder radiusTop={.31} height={.12} position={[0, .62, 0]} color={accent} />
    </>
  );
}

function ItemModel({ item }) {
  switch (item.kind) {
    case "banana": return <Banana />;
    case "pan": return <Pan />;
    case "box":
      return (
        <>
          <Round size={[.54, .76, .34]} position={[0, .38, 0]} color="#f97316" radius={.03} />
          <Box size={[.42, .38, .018]} position={[0, .38, .18]} color="#fb923c" />
        </>
      );
    case "vinegar":
      return (
        <>
          <Lathe points={[[0, 0], [.25, 0], [.26, .48], [.1, .72], [.09, .92], [.11, .94], [0, .94]]} color="#d97706" roughness={.18} />
          <Cylinder radiusTop={.265} height={.3} position={[0, .28, 0]} color="#fef3c7" openEnded />
          <Cylinder radiusTop={.08} height={.14} position={[0, .98, 0]} color="#78350f" />
        </>
      );
    case "salt":
      return (
        <>
          <Lathe points={[[0, 0], [.2, 0], [.22, .42], [.16, .48], [0, .48]]} color="#f8fafc" roughness={.2} />
          <Cylinder radiusTop={.215} height={.22} position={[0, .22, 0]} color="#dbeafe" openEnded />
          <Lathe points={[[.17, .48], [.18, .56], [.1, .62], [0, .62]]} color="#cbd5e1" />
        </>
      );
    case "bleach":
      return (
        <>
          <Lathe points={[[0, 0], [.32, 0], [.34, .6], [.14, .88], [.12, 1.04], [0, 1.04]]} color="#38bdf8" roughness={.35} />
          <Tube points={[[.18, .78, 0], [.42, .75, 0], [.42, .36, 0], [.3, .34, 0]]} radius={.045} color="#38bdf8" />
          <Cylinder radiusTop={.13} height={.16} position={[0, 1.08, 0]} color="#ef4444" />
          <Cylinder radiusTop={.345} height={.36} position={[0, .35, 0]} color="#f8fafc" openEnded />
          <Box size={[.4, .12, .025]} position={[0, .35, .35]} color="#ef4444" />
        </>
      );
    case "toothpaste":
      return (
        <>
          <Cylinder radiusTop={.13} radiusBottom={.06} height={.68} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} color="#22d3ee" />
          <Box size={[.06, .24, .05]} position={[-.36, 0, 0]} color="#06b6d4" />
          <Cylinder radiusTop={.08} height={.14} position={[.38, 0, 0]} rotation={[0, 0, Math.PI / 2]} color="#f8fafc" />
          <Box size={[.34, .16, .025]} position={[0, .01, .06]} color="#f8fafc" />
        </>
      );
    case "alcohol":
      return (
        <>
          <Lathe points={[[0, 0], [.22, 0], [.24, .58], [.1, .72], [.09, .82], [0, .82]]} color="#f8fafc" roughness={.3} />
          <Cylinder radiusTop={.245} height={.36} position={[0, .32, 0]} color="#a7f3d0" openEnded />
          <Cylinder radiusTop={.1} height={.12} position={[0, .86, 0]} color="#10b981" />
          <Box size={[.34, .14, .025]} position={[0, .32, .25]} color="#10b981" />
        </>
      );
    case "epsom": return <Jar />;
    case "phone":
      return (
        <>
          <Round size={[.42, .06, .78]} color="#94a3b8" radius={.02} />
          <Box size={[.36, .01, .7]} position={[0, .032, 0]} color="#0ea5e9" />
          <Sphere position={[0, .04, .31]} scale={[.035, .01, .035]} color="#f8fafc" />
        </>
      );
    case "plant":
      return (
        <>
          <Lathe points={[[0, 0], [.38, 0], [.52, .72], [.58, .74], [.58, .86], [.46, .86], [.44, .72], [0, .72]]} color="#b45309" />
          <Cylinder radiusTop={.45} height={.08} position={[0, .74, 0]} color="#451a03" />
          {Array.from({ length: 6 }, (_, index) => {
            const angle = index * Math.PI / 3;
            const x = Math.cos(angle), z = Math.sin(angle);
            return (
              <group key={index}>
                <Tube points={[[0, .75, 0], [x * .25, 1.3, z * .25], [x * .55, 1.65 + (index % 2) * .2, z * .55]]} radius={.03} color="#15803d" />
                <Sphere position={[x * .62, 1.68 + (index % 2) * .2, z * .62]} scale={[.39, .062, .24]} rotation={[0, -angle, .25]} color="#16a34a" />
              </group>
            );
          })}
        </>
      );
    case "candle":
      return (
        <>
          <Lathe points={[[0, 0], [.25, 0], [.27, .44], [.23, .44], [.23, .05], [0, .05]]} color="#fda4af" roughness={.25} />
          <Cylinder radiusTop={.225} height={.34} position={[0, .22, 0]} color="#fff1f2" />
          <Cylinder radiusTop={.015} height={.08} position={[0, .42, 0]} color="#0f172a" />
          <AnimatedFlame />
        </>
      );
    case "coffee":
      return (
        <>
          <Lathe points={[[0, 0], [.2, 0], [.23, .42], [.19, .42], [.18, .05], [0, .05]]} color="#f8fafc" roughness={.2} />
          <Tube points={[[.21, .34, 0], [.36, .29, 0], [.35, .14, 0], [.2, .1, 0]]} radius={.032} color="#f8fafc" />
          <Cylinder radiusTop={.185} height={.04} position={[0, .36, 0]} color="#451a03" />
          {[0, 1, 2].map(index => <Steam key={index} index={index} />)}
        </>
      );
    case "sparkling":
      return (
        <>
          <Lathe points={[[0, 0], [.16, 0], [.19, .06], [.19, .52], [.15, .58], [0, .58]]} color="#cbd5e1" roughness={.2} />
          <Cylinder radiusTop={.193} height={.42} position={[0, .29, 0]} color="#38bdf8" openEnded />
          <Cylinder radiusTop={.15} height={.025} position={[0, .58, 0]} color="#e2e8f0" />
        </>
      );
    case "battery":
      return (
        <>
          <Round size={[1.35, .92, .92]} position={[0, .46, 0]} color="#0f172a" radius={.05} />
          <Round size={[1.4, .14, .96]} position={[0, .9, 0]} color="#334155" radius={.03} />
          <Box size={[1.05, .45, .04]} position={[0, .48, .46]} color="#dc2626" />
          <Cylinder radiusTop={.09} height={.22} position={[-.4, 1.06, 0]} color="#ef4444" />
          <Cylinder radiusTop={.09} height={.22} position={[.4, 1.06, 0]} color="#38bdf8" />
        </>
      );
    case "superglue":
      return (
        <>
          <Lathe points={[[0, 0], [.16, 0], [.18, .36], [.06, .46], [.03, .68], [0, .68]]} color="#facc15" roughness={.3} />
          <Cylinder radiusTop={.185} height={.24} position={[0, .2, 0]} color="#fef08a" openEnded />
          <Cylinder radiusTop={.06} radiusBottom={.08} height={.1} position={[0, .46, 0]} color="#dc2626" />
        </>
      );
    case "acetone":
      return (
        <>
          <Round size={[.64, .88, .46]} position={[0, .44, 0]} color="#e11d48" radius={.04} />
          <Box size={[.48, .34, .025]} position={[0, .44, .24]} color="#ffe4e6" />
          <Cylinder radiusTop={.1} height={.14} position={[.14, .94, 0]} color="#cbd5e1" />
        </>
      );
    case "extinguisher":
      return (
        <>
          <Lathe points={[[0, 0], [.32, 0], [.34, .9], [.22, 1.15], [.09, 1.22], [0, 1.22]]} color="#dc2626" roughness={.3} />
          <Cylinder radiusTop={.345} height={.4} position={[0, .56, 0]} color="#f8fafc" openEnded />
          <Cylinder radiusTop={.08} height={.18} position={[0, 1.3, 0]} color="#fbbf24" />
          <Box size={[.32, .05, .06]} position={[.12, 1.4, 0]} rotation={[0, 0, .2]} color="#0f172a" />
          <Tube points={[[.1, 1.26, 0], [.46, 1.12, .15], [.48, .55, .22], [.42, .35, .26]]} radius={.038} color="#0f172a" />
          <mesh position={[.4, .25, .28]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[.09, .2, 12]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </>
      );
    default: return null;
  }
}

const gltfAssetCache = new Map();

function loadGltfAsset(url) {
  if (!gltfAssetCache.has(url)) {
    const loader = new GLTFLoader();
    const promise = new Promise((resolve, reject) => {
      loader.load(url, gltf => resolve(gltf.scene), undefined, reject);
    }).catch(error => {
      gltfAssetCache.delete(url);
      throw error;
    });
    gltfAssetCache.set(url, promise);
  }
  return gltfAssetCache.get(url);
}

function recolorMaterials(object, recolor) {
  if (!recolor) return;
  object.traverse(child => {
    if (!child.isMesh || !child.material) return;
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    const updated = materials.map(material => {
      const color = recolor[material.name];
      if (!color) return material;
      const next = material.clone();
      next.color.set(color);
      return next;
    });
    child.material = Array.isArray(child.material) ? updated : updated[0];
  });
}

function prepareGltfAsset(source, asset) {
  const clone = source.clone(true);
  recolorMaterials(clone, asset.recolor);
  const wrapper = new THREE.Group();
  wrapper.add(clone);
  wrapper.rotation.set(...(asset.rotation || [0, 0, 0]));
  wrapper.updateMatrixWorld(true);

  const box = new THREE.Box3().setFromObject(wrapper);
  const size = box.getSize(new THREE.Vector3());
  const fit = asset.fit || [1, 1, 1];
  const scale = Math.min(
    fit[0] / Math.max(size.x, 1e-4),
    fit[1] / Math.max(size.y, 1e-4),
    fit[2] / Math.max(size.z, 1e-4),
  );
  wrapper.scale.setScalar(scale);
  wrapper.updateMatrixWorld(true);

  const scaledBox = new THREE.Box3().setFromObject(wrapper);
  const center = scaledBox.getCenter(new THREE.Vector3());
  wrapper.position.set(-center.x, -scaledBox.min.y, -center.z);
  if (asset.offset) wrapper.position.add(new THREE.Vector3(...asset.offset));

  clone.traverse(child => {
    if (!child.isMesh) return;
    child.castShadow = true;
    child.receiveShadow = true;
  });
  return wrapper;
}

function GltfItemModel({ asset, fallback, onError }) {
  const [source, setSource] = useState(null);
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  useEffect(() => {
    let active = true;
    loadGltfAsset(asset.url).then(scene => {
      if (active) setSource(scene);
    }).catch(error => {
      console.warn(`Could not load item model ${asset.url}:`, error);
      if (active) onErrorRef.current?.();
    });
    return () => { active = false; };
  }, [asset.url]);

  const model = useMemo(
    () => (source ? prepareGltfAsset(source, asset) : null),
    [source, asset],
  );

  if (!model) return fallback;
  return (
    <>
      <primitive object={model} />
      {asset.flame ? <AnimatedFlame position={asset.flame.position} /> : null}
      {asset.steam ? [0, 1, 2].map(index => (
        <Steam
          key={index}
          index={index}
          baseY={asset.steam.baseY}
          height={asset.steam.height}
          spread={asset.steam.spread}
        />
      )) : null}
    </>
  );
}

function ItemVisual({ item, asset }) {
  const [failed, setFailed] = useState(false);
  const handleError = useCallback(() => setFailed(true), []);
  if (!asset || failed) return <ItemModel item={item} />;
  return <GltfItemModel asset={asset} onError={handleError} fallback={<ItemModel item={item} />} />;
}

function InteractiveItem({ itemKey, item }) {
  const rotation = item.kind === "pan" ? [0, .4, 0] : item.kind === "phone" ? [0, .2, 0] : item.kind === "coffee" ? [0, -.5, 0] : [0, 0, 0];
  return (
    <group name={`interact_${itemKey}`} userData={{ itemKey }} position={item.position} rotation={rotation}>
      <ItemVisual item={item} asset={ITEM_ASSETS[item.kind]} />
    </group>
  );
}

function ItemContainer({ room }) {
  return Object.entries(ITEMS)
    .filter(([, item]) => item.room === room)
    .map(([key, item]) => <InteractiveItem key={key} itemKey={key} item={item} />);
}

function FurniturePiece({ piece }) {
  const asset = FURNITURE[piece.model];
  const [source, setSource] = useState(null);

  useEffect(() => {
    if (!asset) return undefined;
    let active = true;
    loadGltfAsset(asset.url).then(scene => {
      if (active) setSource(scene);
    }).catch(error => {
      console.warn(`Could not load furniture model ${asset.url}:`, error);
    });
    return () => { active = false; };
  }, [asset]);

  const model = useMemo(
    () => (source && asset ? prepareGltfAsset(source, asset) : null),
    [source, asset],
  );

  if (!asset || !model) return null;
  return (
    <group position={piece.position} rotation={piece.rotation || [0, 0, 0]}>
      <primitive object={model} />
    </group>
  );
}

function RoomFurniture({ room }) {
  const pieces = ROOM_FURNITURE[room] || [];
  return pieces.map((piece, index) => (
    <FurniturePiece key={`${piece.model}-${index}`} piece={piece} />
  ));
}

function ImportedRoom({ room, onModel, onError }) {
  useEffect(() => {
    let cancelled = false;
    const url = `/models/${room}.glb`;
    const loader = new GLTFLoader();
    fetch(url).then(response => {
      if (response.status === 404 || response.headers.get("content-type")?.includes("text/html")) return null;
      if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
      return response.arrayBuffer().then(buffer => {
        if (new DataView(buffer).getUint32(0, true) !== 0x46546c67) {
          throw new Error(`${url} is not a valid .glb file.`);
        }
        return buffer;
      });
    }).then(buffer => {
      if (!buffer || cancelled) return;
      loader.parse(buffer, "/models/", gltf => {
        if (cancelled) return;
        gltf.scene.traverse(node => {
          const match = node.name.match(/^interact_(.+)$/i);
          if (!match) return;
          const key = match[1].toLowerCase();
          if (!ITEMS[key] || ITEMS[key].room !== room) return;
          node.userData.itemKey = key;
          node.traverse(child => { child.userData.itemKey = key; });
        });
        onModel(gltf.scene);
      }, error => { if (!cancelled) onError(error); });
    }).catch(error => { if (!cancelled) onError(error); });
    return () => { cancelled = true; };
  }, [room, onError, onModel]);
  return null;
}

function findItemKey(object) {
  let node = object;
  while (node) {
    if (node.userData?.itemKey) return node.userData.itemKey;
    node = node.parent;
  }
  return null;
}

export default function SceneCanvas({ room, onSelect, onHover, controls, onModelError }) {
  const root = useRef();
  const [roomModel, setRoomModel] = useState(null);
  const { camera, gl } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const pointer = useMemo(() => new THREE.Vector2(), []);
  const pointerDown = useRef(null);
  const modelCallback = useCallback(model => setRoomModel(model), []);
  const errorCallback = useCallback(error => onModelError(error), [onModelError]);

  useEffect(() => {
    setRoomModel(null);
    if (!controls.current) return;
    controls.current.target.set(0, .9, 0);
    camera.position.set(14, 12.5, 14);
    camera.zoom = window.innerWidth < 760 ? 56 : 62;
    camera.lookAt(controls.current.target);
    camera.updateProjectionMatrix();
    controls.current.update();
  }, [room, camera, controls]);

  useEffect(() => {
    const resize = () => {
      camera.zoom = window.innerWidth < 760 ? 56 : 62;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [camera]);

  useEffect(() => {
    const canvas = gl.domElement;
    const getHit = event => {
      const bounds = canvas.getBoundingClientRect();
      pointer.set(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);
      const candidates = [];
      root.current?.traverse(object => {
        if (object.isMesh && findItemKey(object)) candidates.push(object);
      });
      return findItemKey(raycaster.intersectObjects(candidates, false)[0]?.object);
    };
    const move = event => {
      const key = getHit(event);
      onHover(key, event.clientX, event.clientY);
      canvas.style.cursor = key ? "pointer" : "grab";
    };
    const down = event => { pointerDown.current = [event.clientX, event.clientY]; };
    const up = event => {
      if (!pointerDown.current) return;
      const distance = Math.hypot(event.clientX - pointerDown.current[0], event.clientY - pointerDown.current[1]);
      pointerDown.current = null;
      if (distance < 5) {
        const key = getHit(event);
        if (key) onSelect(key);
      }
    };
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointerup", up);
    return () => {
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointerup", up);
    };
  }, [camera, gl, onHover, onSelect, pointer, raycaster, roomModel]);

  const roomFurniture = {
    kitchen: <Kitchen />,
    living: <LivingRoom />,
    bathroom: <Bathroom />,
    garage: <Garage />,
  }[room];

  return (
    <>
      <ambientLight intensity={.8} />
      <hemisphereLight args={["#e0f2fe", "#334155", .75]} />
      <directionalLight position={[12, 18, 9]} intensity={1.5} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-10, 6, -8]} intensity={.45} color="#38bdf8" />
      <group ref={root}>
        <ImportedRoom room={room} onModel={modelCallback} onError={errorCallback} />
        {roomModel ? (
          <primitive object={roomModel} />
        ) : (
          <>
            <RoomShell room={room} />
            {roomFurniture}
            <RoomFurniture room={room} />
            <ItemContainer room={room} />
          </>
        )}
      </group>
    </>
  );
}
