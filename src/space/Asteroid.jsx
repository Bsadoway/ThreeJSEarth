import React, { useMemo, useRef, useState, useEffect } from "react";
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import openSimplexNoise from 'https://cdn.skypack.dev/open-simplex-noise';
import AsteroidDetails from "./AsteroidDetails";
import asteroidTextureLoad from "/src/assets/textures/asteroid_texture.jpg";
import { Float, Html, Outlines, useTexture } from "@react-three/drei";
import OrbitLine from "./OrbitLine";
import params from "../utils/UniverseParams";

const Asteroid = React.memo(({ id, position, data, cameraControlsRef }) => {
  const meshRef = useRef();
  const glowMeshRef = useRef();
  const [isSelected, setIsSelected] = useState(false);
  const asteroidColour = isSelected ? 0xFF0000 : 0x93928c;
  const asteroidTexture = useTexture(asteroidTextureLoad);

  const calculateMinAndMaxAsteroidSizes = () => {
    const size = data.estimated_diameter.kilometers.estimated_diameter_max * 4;
    if (size > params.maxAsteroidSize) {
      return params.maxAsteroidSize; // Max Size
    }
    if (size < params.minAsteroidSize) {
      return params.minAsteroidSize; // Min Size
    }
    return size;
  }
  const asteroidSize = calculateMinAndMaxAsteroidSizes();

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
    // Zoom into current NEO
    cameraControlsRef.current?.fitToBox(meshRef.current, true);
  };

  useFrame(( {clock}) => {
    const x = Math.random() * 0.001;
    const y = Math.random() * 0.001;
    const z = Math.random() * 0.001;
    const time = clock.getElapsedTime();
    const speed = 0.5;
    const height = 1;
    const randomOffset = (id * .00001) * Math.PI * .002 // Random offset for variety
    if (meshRef.current && glowMeshRef.current) {
      meshRef.current.rotation.x += x;
      meshRef.current.rotation.y += y;
      meshRef.current.rotation.z += z;
      glowMeshRef.current.rotation.x += x;
      glowMeshRef.current.rotation.y += y;
      glowMeshRef.current.rotation.z += z;

      meshRef.current.position.y = Math.sin(time * speed + randomOffset) * height;
      glowMeshRef.current.position.y = Math.sin(time * speed + randomOffset) * height; 
    }
  });

  return (
    <group>
      <group onClick={(e) => toggleVisibility(e)}>
        {/* <Float speed={1} floatingRange={[-asteroidSize * (Math.random() * 4), asteroidSize * (Math.random() * 4)]}> */}
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

          <Html style={{ zIndex: "10", width: "150px", fontWeight: "bold", fontFamily: "Venite", color: "white", position: "absolute", left: "-30px", WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: 'black' }}>
            <div>{data.name.replace(/[()]/g, "")}</div>
          </Html>
        {/* </Float> */}

        <OrbitLine id={id} position={position} radius={200} onClick={(e) => toggleVisibility(e)} />
      </group>
      <group>
        <AsteroidDetails data={data} display={isSelected} onClick={toggleVisibility} />
      </group>
    </group>
  );
});

export default Asteroid;


