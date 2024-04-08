import { Sphere, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import moonTextureLoad from "/src/assets/textures/moon_1k.jpg";
import moonDisTexture from "/src/assets/textures/moon-dis.jpg";
import params from "../utils/UniverseParams";

const Moon = () => {
    const moonRef = useRef();
  
    useFrame((state, delta) => {
      moonRef.current.rotation.y += params.moonSpeedFactor * 0.01 * delta;
    });
  
    const moonTexture = useTexture(moonTextureLoad);
    const moonDis = useTexture(moonDisTexture);
  
    return (
      <group ref={moonRef}>
        <Sphere args={[3.4, 10, 40]} position={[12, 6, -30]}>
          <meshPhongMaterial
            map={moonTexture}
            displacementMap={moonDis}
            displacementScale={0.06}
            bumpMap={moonDis}
            bumpScale={0.4}
            castShadow
          />
        </Sphere>
      </group>
    );
  };

  export default Moon;