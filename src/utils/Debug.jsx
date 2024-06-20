import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import PanSceneControl from "./PanSceneControl";

const DebugHUD = ({ cameraControls }) => {
    const { camera, controls } = useThree();
    const [cameraPosition, setCameraPosition] = useState({
        x: camera.position.x.toFixed(2),
        y: camera.position.y.toFixed(2),
        z: camera.position.z.toFixed(2),
    });

    useFrame(() => {
        // Update the HUD when the camera position changes
        setCameraPosition({
            x: camera.position.x.toFixed(2),
            y: camera.position.y.toFixed(2),
            z: camera.position.z.toFixed(2),
        });
    });

    const resetCamera = () => {
        cameraControls.current?.reset(true);
    };

    const updateCameraPosition = ({ x, y, z }) => {
        setCameraPosition({
            x: x,
            y: y,
            z: z,
        });
    };

    const style = {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: '10px',
        color: 'white',
        zIndex: 999,
        width: '230px',
    };

    return (
        <>
            <PanSceneControl onUpdateCamera={updateCameraPosition} cameraPosition={cameraPosition} />
            <Html wrapperClass="hud-transform-unset debug-hud">
                <div style={style}>
                    <div>Camera Rotation:</div>
                    <div>X: {cameraPosition.x}</div>
                    <div>Y: {cameraPosition.y}</div>
                    <div>Z: {cameraPosition.z}</div>
                    <br />
                    <button onClick={resetCamera}>Reset Camera</button>
                </div>
            </Html>
        </>
    );
};

export default DebugHUD;