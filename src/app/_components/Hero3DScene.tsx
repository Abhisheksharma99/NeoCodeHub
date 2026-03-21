"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Mouse-reactive point light                                         */
/* ------------------------------------------------------------------ */
function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { pointer, viewport } = useThree();

  useFrame(() => {
    if (!lightRef.current) return;
    const x = (pointer.x * viewport.width) / 2;
    const y = (pointer.y * viewport.height) / 2;
    lightRef.current.position.x += (x - lightRef.current.position.x) * 0.08;
    lightRef.current.position.y += (y - lightRef.current.position.y) * 0.08;
    lightRef.current.position.z = 4;
  });

  return (
    <pointLight
      ref={lightRef}
      intensity={60}
      distance={18}
      color="#d4d4d4"
      position={[0, 0, 4]}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Rotating wireframe shape                                           */
/* ------------------------------------------------------------------ */
function WireShape({
  geometry,
  position,
  color,
  speed,
  floatIntensity,
  floatSpeed,
  scale,
}: {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  color: string;
  speed: [number, number, number];
  floatIntensity: number;
  floatSpeed: number;
  scale: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += speed[0] * delta;
    meshRef.current.rotation.y += speed[1] * delta;
    meshRef.current.rotation.z += speed[2] * delta;
  });

  return (
    <Float
      speed={floatSpeed}
      rotationIntensity={0}
      floatIntensity={floatIntensity}
      floatingRange={[-0.3, 0.3]}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        <primitive object={geometry} attach="geometry" />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.35}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
    </Float>
  );
}

/* ------------------------------------------------------------------ */
/*  Ambient particles                                                  */
/* ------------------------------------------------------------------ */
function AmbientParticles({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, sz];
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.015;
    pointsRef.current.rotation.x += delta * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#a3a3a3"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene contents                                                     */
/* ------------------------------------------------------------------ */
function SceneContents() {
  const torusKnot = useMemo(
    () => new THREE.TorusKnotGeometry(0.8, 0.25, 100, 16),
    []
  );
  const icosahedron = useMemo(
    () => new THREE.IcosahedronGeometry(0.7, 1),
    []
  );
  const dodecahedron = useMemo(
    () => new THREE.DodecahedronGeometry(0.6, 0),
    []
  );
  const octahedron = useMemo(
    () => new THREE.OctahedronGeometry(0.55, 0),
    []
  );
  const torus = useMemo(
    () => new THREE.TorusGeometry(0.65, 0.2, 16, 32),
    []
  );

  return (
    <>
      <ambientLight intensity={0.3} color="#e5e5e5" />
      <MouseLight />

      {/* Top-left: torus knot */}
      <WireShape
        geometry={torusKnot}
        position={[-4.2, 2.2, -1]}
        color="#d4d4d4"
        speed={[0.15, 0.2, 0.05]}
        floatIntensity={1.2}
        floatSpeed={1.5}
        scale={1.0}
      />

      {/* Top-right: icosahedron */}
      <WireShape
        geometry={icosahedron}
        position={[4.0, 1.8, -0.5]}
        color="#a3a3a3"
        speed={[0.12, 0.18, 0.08]}
        floatIntensity={1.0}
        floatSpeed={1.8}
        scale={1.1}
      />

      {/* Bottom-left: dodecahedron */}
      <WireShape
        geometry={dodecahedron}
        position={[-3.5, -1.8, 0]}
        color="#737373"
        speed={[0.1, 0.25, 0.06]}
        floatIntensity={0.8}
        floatSpeed={2.0}
        scale={1.0}
      />

      {/* Bottom-right: octahedron */}
      <WireShape
        geometry={octahedron}
        position={[3.8, -2.0, -1.5]}
        color="#e5e5e5"
        speed={[0.2, 0.1, 0.12]}
        floatIntensity={1.4}
        floatSpeed={1.2}
        scale={1.2}
      />

      {/* Center-right: torus */}
      <WireShape
        geometry={torus}
        position={[1.5, 0.3, -2]}
        color="#a3a3a3"
        speed={[0.08, 0.15, 0.1]}
        floatIntensity={0.6}
        floatSpeed={2.5}
        scale={0.9}
      />

      <AmbientParticles count={120} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported canvas wrapper                                            */
/* ------------------------------------------------------------------ */
export default function Hero3DScene() {
  return (
    <div className="absolute inset-0 w-full h-full" aria-hidden="true">
      <Canvas
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <SceneContents />
      </Canvas>
    </div>
  );
}
