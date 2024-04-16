import React, { useRef } from "react";
import Neos from './space/Neos.jsx';
import { Canvas, extend } from "@react-three/fiber";
import { Stars, shaderMaterial, PerspectiveCamera, SoftShadows, Clouds, Cloud } from "@react-three/drei";
import CreateSolarSystem from "./space/SolarSystem.jsx";
import { frag, vert } from "./shaders/AtmosphereShader";
import DebugHUD from "./utils/Debug.jsx";
import PanSceneControl from "./utils/PanSceneControl.jsx";
import Earth from "./space/Earth.jsx";
import Moon from "./space/Moon.jsx";
import params from "./utils/UniverseParams.jsx";
import DateHud from "./utils/DateHud.jsx";
import { MeshBasicMaterial } from "three";

const Scene = () => {
  const cameraRef = useRef();

  return (
    <>
      
      <PerspectiveCamera zoom={1} ref={cameraRef}></PerspectiveCamera>
      <Earth />
      <Stars
        radius={200}
        depth={100}
        count={10000}
        factor={4}
        saturation={15}
        noise={0.9}
      />
      <Moon />
      <directionalLight castShadow position={params.sunPosition} shadow-mapSize={[1024, 1024]} color="#FFF" intensity={params.sunIntensity}>
        <orthographicCamera attach="shadow-camera" args={[-50, 10, 10, -10]} />
      </directionalLight>
      <Neos earthSize={params.earthSize.value} astronomicalConversion={params.astronomicalConversion.value} />
      <CreateSolarSystem earthSize={params.earthSize.value} astronomicalConversion={params.astronomicalConversion.value} earthSpeed={params.earthSpeedFactor} />
      <DebugHUD camera={cameraRef} defaultCameraPosition={params.defaultCameraPosition} />
      <SoftShadows samples={3} />
      <DateHud />
    </>
  );
};

const App = () => {
  return (
    <>
      <Canvas camera={{ fov: 40, position: params.defaultCameraPosition }} style={{ background: "black" }}>
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