import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center, Text3D, useFBX } from '@react-three/drei';
import { MeshBasicMaterial } from 'three';

const Asteroid = (props) => {
  const asteroidRef = useRef();
  let fbx = useFBX('./src/assets/Rock01.FBX');
  let fbx2 = useFBX('./src/assets/Rock02.FBX');

  useFrame(() => {
    if (asteroidRef.current) {
      asteroidRef.current.rotation.z += 0.01;
    }
  });

  const model = Math.floor(Math.random() * 2 + 1) === 1 ? fbx : fbx2;
  model.traverse(child => {
    if (child.isMesh) {
      child.material = new MeshBasicMaterial({ color: 0x996633 });
    }
  });
  return (
    
    <group position={[0, 20, props.astronomicalConversion * props.closeApproachAU]}>
      
      <primitive object={model.clone()}
        args={[props.diameter * 4, 0, 1]} 
        rotation={[Math.random() * 10, Math.random() * 10,Math.random() * 10]}
        ref={asteroidRef}
        scale={[.001, .001, .001]}
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