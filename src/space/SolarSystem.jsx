import { Html, Sphere, useTexture } from "@react-three/drei";
import venusTexture from "../assets/textures/venus_texture.jpg";
import mercuryTexture from "../assets/textures/mercury_texture.jpg";
import marsTexture from "../assets/textures/mars_texture.jpg";
import sunTexture from "../assets/textures/sun_texture.jpg";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function CreateSolarSystem(props) {
    const venus = useTexture(venusTexture);
    const mercury = useTexture(mercuryTexture);
    const mars = useTexture(marsTexture);
    const sun = useTexture(sunTexture);
    const sunRef = useRef();
    const mercuryRef = useRef();
    const marsRef = useRef();
    const venusRef = useRef();

    useFrame((state, delta) => {
        sunRef.current.rotation.y += .0001;
        marsRef.current.rotation.y += .001;
        mercuryRef.current.rotation.y += .001;
        venusRef.current.rotation.y += .001;
    });

    return (
        <>
            {/* Temporary Sun */}
            <group ref={sunRef} position={[0, 0, props.astronomicalConversion]}>
                <Sphere args={[60, 64, 64]} receiveShadow={false}>
                    <meshBasicMaterial map={sun} />
                </Sphere>
                <Html wrapperClass="planet-label">
                    The Sun
                </Html>
            </group>
            {/* Mercury */}
            <group ref={mercuryRef} position={[0, 0, props.astronomicalConversion * .61]}>
                <Sphere args={[props.earthSize * .333, 64, 64]}>
                    <meshBasicMaterial map={mercury} />
                </Sphere>
                <Html wrapperClass="planet-label">
                    Mercury
                </Html>
            </group>
            {/* Venus */}
            <group ref={venusRef} position={[0, 0, props.astronomicalConversion * .3]}>
                <Sphere args={[props.earthSize * .85, 64, 64]} >
                    <meshBasicMaterial map={venus} />
                </Sphere>
                <Html wrapperClass="planet-label">
                    Venus
                </Html>
            </group>
            {/* Mars */}
            <group ref={marsRef} position={[0, 0, props.astronomicalConversion * -.51]}>
                <Sphere args={[props.earthSize * .5, 64, 64]} >
                    <meshBasicMaterial map={mars} />
                </Sphere>
                <Html wrapperClass="planet-label">
                    Mars
                </Html>
            </group>
        </>
    )
}