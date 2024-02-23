import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls, Sphere, useTexture, Environment, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import earthTexture from './assets/earthmap4k.jpg';
import earthBump from "./assets/earthbump4k.jpg";
import earthClouds from "./assets/earthclouds.png";
import moonTexture from "./assets/moon_1k.jpg";
import moonDisTexture from "./assets/moon-dis.jpg";

import { AdditiveBlending, BackSide, DoubleSide, Group } from "three";
import * as random from 'maath/random/dist/maath-random.esm';
import { frag, vert } from "./shaders/AtmosphereShader";
import glsl from "glslify";


const params = {
  sunIntensity: 1.8, // brightness of the sun
  speedFactor: 20.0,
  atmOpacity: { value: 0.7 },
  atmPowFactor: { value: 4.1 },
  atmMultiplier: { value: 9.5 },
}

const Scene = () => {
  const earthRef = useRef();
  const cloudRef = useRef();
  const moonRef  = useRef();
  useFrame((state, delta) => {
    cloudRef.current.rotation.y += params.speedFactor * .01 * delta;
    earthRef.current.rotation.y += params.speedFactor * .01 * delta;
    moonRef.current.rotation.y += params.speedFactor * .02 * delta;
  });

  const texture = useTexture(earthTexture);
  const bumpmap = useTexture(earthBump);
  const clouds = useTexture(earthClouds);
  const moon = useTexture(moonTexture);
  const moonDis = useTexture(moonDisTexture);
  const [sphere] = useState(() => random.inSphere(new Float32Array(16000), { radius: 300 }));



  return (
    <>
      <group ref={earthRef} rotateZ={-23.4 * Math.PI / 100}>
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
          <glowMaterial blending={AdditiveBlending} side={BackSide} />
        </Sphere>
      </group>

      <Points positions={sphere} stride={3} frustumCulled={false} >
        <PointMaterial transparent color="#ffa0e0" size={.6} sizeAttenuation={true} depthWrite={false} />
      </Points>

      <Sphere ref={moonRef} args={[2.7, 10,40]} position={[12, 6, 30]}>
        <meshPhongMaterial
          map={moon}
          displacementMap={moonDis}
          displacementScale={.06}
          bumpMap={moonDis}
          bumpScale={.4}
          castShadow
          />
      </Sphere>

      <directionalLight castShadow position={[-2, 0, 30]} shadow-mapSize={[1024, 1024]} color="#FFF" intensity={params.sunIntensity}>
        <orthographicCamera attach="shadow-camera" args={[-50, 10, 10, -10]} />
      </directionalLight>
    </>
  );
};

const App = () => {
  return (
    <Canvas camera={{ fov: 40, position: [45, -10, 20] }} style={{ background: "black" }}>
      <OrbitControls />
      <Scene />
    </Canvas>
  );
};



const GlowMaterial = shaderMaterial(
  { atmOpacity: params.atmOpacity, atmPowFactor: params.atmPowFactor, atmMultiplier: params.atmMultiplier },
  glsl`
  varying vec3 vNormal;
  varying vec3 eyeVector;

  void main() {
      // modelMatrix transforms the coordinates local to the model into world space
      vec4 mvPos = modelViewMatrix * vec4( position, 1.0 );

      // normalMatrix is a matrix that is used to transform normals from object space to view space.
      vNormal = normalize( normalMatrix * normal );

      // vector pointing from camera to vertex in view space
      eyeVector = normalize(mvPos.xyz);

      gl_Position = projectionMatrix * mvPos;
  }`,
  glsl`
  varying vec3 vNormal;
  varying vec3 eyeVector;
  uniform float atmOpacity;
  uniform float atmPowFactor;
  uniform float atmMultiplier;

  void main() {
      // Starting from the rim to the center at the back, dotP would increase from 0 to 1
      float dotP = dot( vNormal, eyeVector );
      // This factor is to create the effect of a realistic thickening of the atmosphere coloring
      float factor = pow(dotP, atmPowFactor) * atmMultiplier;
      // Adding in a bit of dotP to the color to make it whiter while the color intensifies
      vec3 atmColor = vec3(0.35 + dotP/4.5, 0.35 + dotP/4.5, 1.0);
      // use atmOpacity to control the overall intensity of the atmospheric color
      gl_FragColor = vec4(atmColor, atmOpacity) * factor;
  }`,
)
extend({ GlowMaterial })

export default App;