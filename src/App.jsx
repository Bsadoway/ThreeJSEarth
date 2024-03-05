import React, { useRef, useState } from "react";
import Neo from './space/Neo.jsx';
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Sphere, useTexture, Stars, shaderMaterial } from "@react-three/drei";
import earthTexture from './assets/earthmap4k.jpg';
import earthBump from "./assets/earthbump4k.jpg";
import earthClouds from "./assets/earthclouds.png";
import moonTexture from "./assets/moon_1k.jpg";
import moonDisTexture from "./assets/moon-dis.jpg";
import CreateSolarSystem from "./space/SolarSystem.jsx";
import asteroidTexture from "./assets/asteroid_texture.jpg";

import { AdditiveBlending, BackSide, DoubleSide, Group } from "three";
import { frag, vert } from "./shaders/AtmosphereShader";

const params = {
  sunIntensity: 1.8, // brightness of the sun
  earthSpeedFactor: 20.0,
  moonSpeedFactor: 20.0 * .27, // speed of the earth divided by 27 days to orbit the earth 
  atmOpacity: { value: 0.7 },
  atmPowFactor: { value: 4.1 },
  atmMultiplier: { value: 9.5 },
  astronomicalConversion: {value: 450}, // 1AU = 450 units in scale
  earthSize: {value: 12}
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
  const asteroid = useTexture(asteroidTexture);

  return (
    <>
      <group ref={earthRef} >
        <Sphere smooth={1} args={[params.earthSize.value, 64, 64]}>
          <meshPhongMaterial
            map={texture}
            wireframe={false}
            bumpMap={bumpmap}
            bumpScale={50}
            lightMap={clouds}
            lightMapIntensity={0.75}
          />
        </Sphere>
        <Sphere ref={cloudRef} smooth={1} args={[params.earthSize.value + .2, 64, 64]}>
          <meshPhongMaterial
            alphaMap={clouds}
            transparent={true}
            side={DoubleSide}
            blending={AdditiveBlending}
            opacity={1}
            castShadow={true}
          />
        </Sphere>
        <Sphere args={[params.earthSize.value + 1.5 , 64, 64]}>
          <glowMaterial blending={AdditiveBlending} side={BackSide} transparent={true} />
        </Sphere>
      </group>

      <Stars
        radius={180}   
        depth={10}   
        count={12000}
        factor={4}
        saturation={15}
        noise={0.5}
      />

      <object3D ref={moonRef}>
        <Sphere args={[3.4, 10, 40]} position={[12, 6, -30]}>
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
      <Neo asteroidTexture={asteroid} earthSize={params.earthSize.value} astronomicalConversion={params.astronomicalConversion.value} />
      <CreateSolarSystem earthSize={params.earthSize.value}  astronomicalConversion={params.astronomicalConversion.value}/>
    </>
  );
};

const App = () => {
  return (
    <>     
      <Canvas camera={{ fov: 40, position: [45, -10, 20] }} style={{ background: "black" }}>
        <OrbitControls maxPolarAngle={Math.PI / 2} enablePan={true} />
        <Scene />
      </Canvas>
      </>
  );
};


const GlowMaterial = shaderMaterial(
  { atmOpacity: params.atmOpacity, atmPowFactor: params.atmPowFactor, atmMultiplier: params.atmMultiplier },
  vert, frag,
)
extend({ GlowMaterial })

export default App;