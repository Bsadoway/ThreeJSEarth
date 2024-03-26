import React, { useMemo, useRef, useState } from "react";
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import openSimplexNoise from 'https://cdn.skypack.dev/open-simplex-noise';
import AsteroidDetails from "./AsteroidDetails";
import { Sphere } from "@react-three/drei";


const Asteroid = React.memo(({ id, position, data }) => {
  const asteroidSize = data.estimated_diameter.kilometers.estimated_diameter_max * 4;

  const asteroidGeo = useMemo(() => {

    const newAsteroidGeo = new THREE.DodecahedronGeometry(4, 3);
    const vec = new THREE.Vector3();
    const pos = newAsteroidGeo.attributes.position;
    const noise3d = openSimplexNoise.makeNoise3D(Math.random() * 100);

    for (let i = 0; i < pos.count; i++) {
      vec.fromBufferAttribute(pos, i).normalize();
      vec.copy(vec).multiplyScalar(1).addScaledVector(vec, noise3d(vec.x, vec.y, vec.z));
      pos.setXYZ(i, vec.x, vec.y, vec.z);
    }

    newAsteroidGeo.computeVertexNormals();
    pos.needsUpdate = true;

    return newAsteroidGeo;
  }, []);

  const meshRef = useRef();
  const [isSelected, setIsSelected] = useState(false);
  const asteroidColour = isSelected ? 0xff0000 : 0x93928c;

  const toggleVisibility = (id) => {
    setIsSelected(!isSelected);
  };


  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += Math.random() * 0.001;
      meshRef.current.rotation.y += Math.random() * 0.001;
      meshRef.current.rotation.z += Math.random() * 0.001;
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        geometry={asteroidGeo}
        position={position}
        scale={[asteroidSize, asteroidSize, asteroidSize]}
        onClick={() => toggleVisibility(id)}
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
            meshRef.current.material.color.set(asteroidColour);
            meshRef.current.material.emissiveIntensity = 0;
          }
          document.body.style.cursor = 'auto'; // Change cursor to pointer
        }}
      >
        <meshStandardMaterial color={asteroidColour} />
      </mesh>


      <AsteroidDetails data={data} display={isSelected} onClick={toggleVisibility} />
    </group>
  );
});

export default Asteroid;


