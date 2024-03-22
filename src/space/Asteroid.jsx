import React, { useMemo, useRef, useState } from "react";
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import openSimplexNoise from 'https://cdn.skypack.dev/open-simplex-noise';
import { Html } from "@react-three/drei";
import AsteroidDetails from "./AsteroidDetails";

const Asteroid = React.memo(({ id, position, data, isSelected }) => {
  const asteroidGeo = new THREE.DodecahedronGeometry(4, 2);
  const meshRef = useRef(asteroidGeo);
  const detailsRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002 * Math.random();
      meshRef.current.rotation.y += 0.002 * Math.random();
      meshRef.current.rotation.z -= 0.002 * Math.random();
    }
  });

  const vec = new THREE.Vector3();
  const pos = asteroidGeo.attributes.position;
  const noise3d = openSimplexNoise.makeNoise3D(Math.random() * 100);

  for (let i = 0; i < pos.count; i++) {
    vec
      .fromBufferAttribute(pos, i)
      .normalize();
    vec
      .copy(vec)
      .multiplyScalar(1)
      .addScaledVector(vec, noise3d(vec.x, vec.y, vec.z));

    pos.setXYZ(i, vec.x, vec.y, vec.z);
  }

  asteroidGeo.computeVertexNormals();
  pos.needsUpdate = true;

  const toggleVisibility = () => {
    if (detailsRef.current.style.display === "none") {
      detailsRef.current.style.display = "block";
    } else {
      detailsRef.current.style.display = "none";
    }
  };

  return (
    <group>
      <mesh
        ref={meshRef}
        geometry={asteroidGeo}
        position={position}
        onClick={toggleVisibility}
        onPointerOver={(e) => {
          if (meshRef.current) {
            meshRef.current.material.color.set(0xfff000);
            meshRef.current.material.emissive.set(0xff0000);
            meshRef.current.material.emissiveIntensity = 0.5;
          }
          document.body.style.cursor = 'pointer'; // Change cursor to pointer
        }}
        onPointerLeave={(e) => {
          if (meshRef.current) {
            meshRef.current.material.color.set(0xffffff);
            meshRef.current.material.emissiveIntensity = 0;
          }
          document.body.style.cursor = 'auto'; // Change cursor to pointer
        }}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial />
      </mesh>
      <AsteroidDetails ref={detailsRef} data={data} display={false} onClick={toggleVisibility} />
    </group>
  );
});

export default Asteroid;


