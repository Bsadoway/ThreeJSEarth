import React, { useMemo, useRef, useState } from "react";
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import openSimplexNoise from 'https://cdn.skypack.dev/open-simplex-noise';
import AsteroidDetails from "./AsteroidDetails";
import asteroidTextureLoad from "/src/assets/textures/asteroid_texture.jpg";
import { Float, Outlines, useTexture } from "@react-three/drei";
import OrbitLine from "./OrbitLine";


const Asteroid = React.memo(({ id, position, data }) => {
  const asteroidSize = data.estimated_diameter.kilometers.estimated_diameter_max * 4 > 4 ? 3 : data.estimated_diameter.kilometers.estimated_diameter_max * 4; // limit peak size so asteroids cannot be larger than earth
  const meshRef = useRef();
  const glowMeshRef = useRef();
  const [isSelected, setIsSelected] = useState(false);
  const asteroidColour = isSelected ? 0xFF0000 : 0x93928c;
  const asteroidTexture = useTexture(asteroidTextureLoad);

  const asteroidGeo = useMemo(() => { // memo to prevent re-render

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

  const glowMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: 0xFFFF00,
    transparent: true,
    opacity: 0.08,
  }), []);

  const toggleVisibility = (event) => {
    event.stopPropagation();    
    setIsSelected(!isSelected);
  };

  useFrame(() => {
    const x = Math.random() * 0.001;
    const y = Math.random() * 0.001;
    const z = Math.random() * 0.001;
    if (meshRef.current && glowMeshRef.current) {
      meshRef.current.rotation.x += x;
      meshRef.current.rotation.y += y;
      meshRef.current.rotation.z += z;
      glowMeshRef.current.rotation.x += x;
      glowMeshRef.current.rotation.y += y;
      glowMeshRef.current.rotation.z += z;
    }

  });

  return (
    <group>
      <group onClick={(e) => toggleVisibility(e)}>
        <Float speed={1} floatingRange={[1, asteroidSize * 3.1]}>
          <mesh
            name={id}
            ref={meshRef}
            geometry={asteroidGeo}
            scale={[asteroidSize, asteroidSize, asteroidSize]}
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
            receiveShadow={!isSelected}
          >
            <meshStandardMaterial color={asteroidColour} wireframe={isSelected} map={asteroidTexture} />
            <Outlines thickness={0.05} color="yellow" />
          </mesh>
          <mesh
            ref={glowMeshRef}
            geometry={asteroidGeo}
            material={glowMaterial}
            scale={[asteroidSize * 1.2, asteroidSize * 1.2, asteroidSize * 1.2]}
          />
        </Float>

        <OrbitLine id={id} position={position} radius={200} onClick={(e) => toggleVisibility(e)} />
      </group>
      <group>
        <AsteroidDetails data={data} display={isSelected} onClick={toggleVisibility} />
      </group>
    </group>
  );
});

export default Asteroid;


