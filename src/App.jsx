import React, { useRef, useState } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Sphere, useTexture, Stars, shaderMaterial } from "@react-three/drei";
import earthTexture from './assets/earthmap4k.jpg';
import earthBump from "./assets/earthbump4k.jpg";
import earthClouds from "./assets/earthclouds.png";
import moonTexture from "./assets/moon_1k.jpg";
import moonDisTexture from "./assets/moon-dis.jpg";

import { AdditiveBlending, BackSide, DoubleSide, Group } from "three";
import { frag, vert } from "./shaders/AtmosphereShader";

const params = {
  sunIntensity: 1.8, // brightness of the sun
  earthSpeedFactor: 20.0,
  moonSpeedFactor: 20.0 * .27, // speed of the earth divided by 27 days to orbit the earth 
  atmOpacity: { value: 0.7 },
  atmPowFactor: { value: 4.1 },
  atmMultiplier: { value: 9.5 },
}

const Scene = () => {
  const earthRef = useRef();
  const cloudRef = useRef();
  const moonRef = useRef();
  useFrame((state, delta) => {
    cloudRef.current.rotation.y += params.earthSpeedFactor * .01 * delta;
    earthRef.current.rotation.y += params.earthSpeedFactor * .01 * delta;

    moonRef.current.rotation.y += params.moonSpeedFactor * .01 * delta;
  });
  const texture = useTexture(earthTexture);
  const bumpmap = useTexture(earthBump);
  const clouds = useTexture(earthClouds);
  const moon = useTexture(moonTexture);
  const moonDis = useTexture(moonDisTexture);

  return (
    <>
      <group ref={earthRef} >
        <Sphere smooth={1} args={[10, 64, 64]}>
          <meshPhongMaterial
            map={texture}
            wireframe={false}
            bumpMap={bumpmap}
            bumpScale={50}
            lightMap={clouds}
            lightMapIntensity={0.75}
          />
        </Sphere>
        <Sphere ref={cloudRef} smooth={1} args={[10.15, 64, 64]}>
          <meshPhongMaterial
            alphaMap={clouds}
            transparent={true}
            side={DoubleSide}
            blending={AdditiveBlending}
            opacity={1}
            castShadow={true}
          />
        </Sphere>
        <Sphere args={[11.55, 64, 64]}>
          <glowMaterial blending={AdditiveBlending} side={BackSide} transparent={true} />
        </Sphere>
      </group>
      <Stars
        radius={100}   
        depth={50}   
        count={10000}
        factor={4}
      />

      < object3D ref={moonRef}>
        <Sphere args={[2.7, 10, 40]} position={[12, 6, -30]}>
          <meshPhongMaterial
            map={moon}
            displacementMap={moonDis}
            displacementScale={.06}
            bumpMap={moonDis}
            bumpScale={.4}
            castShadow
          />
        </Sphere>
      </object3D>


      <directionalLight castShadow position={[-2, 0, 30]} shadow-mapSize={[1024, 1024]} color="#FFF" intensity={params.sunIntensity}>
        <orthographicCamera attach="shadow-camera" args={[-50, 10, 10, -10]} />
      </directionalLight>
    </>
  );
};

const App = () => {
  return (
    <Canvas camera={{ fov: 40, position: [45, -10, 20] }} style={{ background: "black" }}>
      <OrbitControls maxPolarAngle={Math.PI / 2} />
      <Scene />
    </Canvas>
  );
};


const GlowMaterial = shaderMaterial(
  { atmOpacity: params.atmOpacity, atmPowFactor: params.atmPowFactor, atmMultiplier: params.atmMultiplier },
  vert, frag,
)
extend({ GlowMaterial })

export default App;