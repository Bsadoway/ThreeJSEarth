import React, { useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';

const PanSceneControl = ({onUpdateCamera, cameraPosition}) => {
    const { scene, gl, camera } = useThree();
    const [panZ, setPanZ] = useState(0);
    const [panY, setPanY] = useState(0);
    const [enableRotate, setEnableRotate] = useState(true);

    const handlePanZChange = (event) => {
        const value = parseFloat(event.target.value);
        setPanZ(value);
        scene.position.setZ(value);
        onUpdateCamera({ x: camera.position.x, y: camera.position.y, z: value });
    };

    const handlePanYChange = (event) => {
        const value = parseFloat(event.target.value);
        setPanY(value);
        scene.position.setY(value);
        onUpdateCamera({ x: camera.position.x, y: value, z: camera.position.z });
    };

    const style = {
        position: 'absolute',
        fontFamily: "Venite",
        color: 'white',
        zIndex: 999,
    };

    const verticalRangeStyle = {
        transform: 'rotate(-270deg)'     
    }

    const handlePointerDown = () => {
        setEnableRotate(false);
        gl.domElement.style.pointerEvents = 'none'; // Disable pointer events on the canvas
    };

    const handlePointerUp = () => {
        setEnableRotate(true);
        gl.domElement.style.pointerEvents = 'auto'; // Re-enable pointer events on the canvas
    };

    return (
        <>
            <Html wrapperClass="hud-transform-unset pan-label">
                <div style={style}>
                    <p style={{position: "absolute", bottom: "-130px", left: "20px"}}>Camera pan</p>
                    <input style={{transform: "translateY(20px) rotate(180deg)"}}type="range" min={-200} max={70} step={1} defaultValue={cameraPosition.y}
                        onChange={handlePanZChange}
                        onPointerUp={handlePointerUp}
                        onPointerDown={handlePointerDown}
                    />
                    <input style={verticalRangeStyle} type="range" min={-50} max={0} step={1} defaultValue={cameraPosition.z} 
                        onChange={handlePanYChange}
                        onPointerUp={handlePointerUp}
                        onPointerDown={handlePointerDown}
                    />
                </div>
            </Html>
            <OrbitControls
                panSpeed={5}
                maxPolarAngle={Math.PI / 2} // Limit the camera from pointing below the horizon
                minPolarAngle={0}            // Limit the camera from pointing above the horizon
                enableRotate={enableRotate}
                enablePan={false}
                maxDistance={200}
                minDistance={20}
                maxAzimuthAngle={Math.PI / -6}  // Limit the camera from rotating past this angle to the right
                minAzimuthAngle={-Math.PI / 2} // Limit the camera from rotating past this angle to the left
                min
            />
        </>
    );
};

export default PanSceneControl;