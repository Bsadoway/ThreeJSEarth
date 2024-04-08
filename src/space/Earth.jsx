import { Sphere, useTexture } from "@react-three/drei";
import { useRef } from "react";
import { AdditiveBlending, BackSide, DoubleSide } from "three";
import params from "../utils/UniverseParams";
import { useFrame } from "@react-three/fiber";
import earthTexture from '/src/assets/textures/earthmap4k.jpg';
import earthBump from "/src/assets/textures/earthbump4k.jpg";
import earthClouds from "/src/assets/textures/earthclouds.png";

const Earth = () => {
    const earthRef = useRef();
    const cloudRef = useRef();
  
    useFrame((state, delta) => {
      cloudRef.current.rotation.y += params.earthSpeedFactor * 0.02 * delta;
      earthRef.current.rotation.y += params.earthSpeedFactor * 0.01 * delta;
    });
  
    const texture = useTexture(earthTexture);
    const bumpmap = useTexture(earthBump);
    const clouds = useTexture(earthClouds);
  
    return (
      <group>
        <Sphere ref={earthRef} smooth args={[params.earthSize.value, 64, 64]}>
          <meshPhongMaterial
            map={texture}
            wireframe={false}
            bumpMap={bumpmap}
            bumpScale={50}
            lightMap={clouds}
            lightMapIntensity={0.75}
          />
        </Sphere>
        <Sphere ref={cloudRef} smooth args={[params.earthSize.value + 0.2, 64, 64]}>
          <meshPhongMaterial
            alphaMap={clouds}
            transparent={true}
            side={DoubleSide}
            blending={AdditiveBlending}
            opacity={1}
            castShadow={true}
          />
        </Sphere>
        <Sphere args={[params.earthSize.value + 1.5, 64, 64]}>
          <glowMaterial blending={AdditiveBlending} side={BackSide} transparent={true} />
        </Sphere>
      </group>
    );
  };

  export default Earth;