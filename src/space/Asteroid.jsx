import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center, Text3D, useFBX, useTexture, Sphere } from '@react-three/drei';
import { MeshBasicMaterial,SphereGeometry } from 'three';
import asteroidTexture from "../assets/textures/asteroid_texture.jpg";

const Asteroid = (props) => {
  const asteroidRef = useRef();
  const asteroid = useTexture(asteroidTexture);
  let fbx = useFBX('./src/assets/Rock01.fbx');
  let fbx2 = useFBX('./src/assets/Rock02.fbx');
  const asteroidScale = .05; // 5% of the scale of the FBX file
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (asteroidRef.current) {
      asteroidRef.current.rotation.z += 0.01;
    }
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    return () => document.body.style.cursor = 'auto';
  }, [hovered])

  // const model = Math.floor(Math.random() * 2 + 1) === 1 ? fbx : fbx2;
  // model.traverse(child => {
  //   if (child.isMesh) {
  //     child.material.map = asteroid;
  //     child.material.emissive.set(0xcccccc); 
  //     child.material.emissiveIntensity = .05;  // Increase intensity for a brighter effect
  //   }
  // });

  return (
    <group position={[0, 20, props.astronomicalConversion * props.closeApproachAU]}>
      <Sphere 
          // geometry={new SphereGeometry(1, 16, 16)}

        // object={model.clone()}
        args={[props.diameter * 4, 0, 1]} 
        rotation={[Math.random() * 10, Math.random() * 10,Math.random() * 10]}
        ref={asteroidRef}
        scale={ [ props.diameter * asteroidScale, props.diameter * asteroidScale, props.diameter * asteroidScale]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => console.log('Asteroid clicked')}
      />
      <Center position={[0, 4, 0]} rotateX={90}>
        <Text3D
          height={0.5}
          size={1}
          rotation={[0, -90, 0]}
          font="./Space Age_Regular.json"
        >
          {props.name.replace(/[()]/g, "")}
        </Text3D>
      </Center>
      {hovered && (
        <mesh position={[0, 0, 0]} scale={[2, 2, 2]}>
         <sphere args={[1, 8, 8]} />
         <meshBasicMaterial color="yellow" transparent opacity={0.5} />
       </mesh>
      )}
    </group>
  );
};

export default Asteroid;