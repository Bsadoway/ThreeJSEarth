import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center, Text3D, useFBX, useTexture } from '@react-three/drei';
import { MeshBasicMaterial } from 'three';
import asteroidTexture from "../assets/textures/asteroid_texture.jpg";

const Asteroid = (props) => {
  const asteroidRef = useRef();
  const asteroid = useTexture(asteroidTexture);
  let fbx = useFBX('./src/assets/Rock01.fbx');
  let fbx2 = useFBX('./src/assets/Rock02.fbx');
  const asteroidScale = .05;// 5% of the scale of the FBX file

  useFrame(() => {
    if (asteroidRef.current) {
      asteroidRef.current.rotation.z += 0.01;
    }
  });

  const model = Math.floor(Math.random() * 2 + 1) === 1 ? fbx : fbx2;
  model.traverse(child => {
    if (child.isMesh) {
      child.material.map = asteroid;
      child.material.emissive.set(0xcccccc); // Set to white to make it brighter
      child.material.emissiveIntensity = .05;  // Increase intensity for a brighter effect
      // child.material = new MeshBasicMaterial({ color: 0x996633 });
    }
  });
  return (
    
    <group position={[0, 20, props.astronomicalConversion * props.closeApproachAU]}>
      {console.log(props.diameter)}
      <primitive object={model.clone()}
        args={[props.diameter * 4, 0, 1]} 
        rotation={[Math.random() * 10, Math.random() * 10,Math.random() * 10]}
        ref={asteroidRef}
        scale={ [ props.diameter * asteroidScale, props.diameter * asteroidScale, props.diameter * asteroidScale]}
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
    </group>
  );
};

export default Asteroid;