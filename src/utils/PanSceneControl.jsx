import React, { useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';

const PanSceneControl = () => {
    const { scene, gl, camera } = useThree();
    const [panZ, setPanZ] = useState(0);
    const [enableRotate, setEnableRotate] = useState(true);

    const handlePanZChange = (event) => {
        const value = parseFloat(event.target.value);
        setPanZ(value);
        scene.position.setZ(value);
    };

    const style = {
        position: 'absolute',
        left: '50%',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        color: 'white',
        zIndex: 999,
        width: '250px',
    };

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
            <Html wrapperClass="hud-transform-unset center-hud">
                <div style={style}>
                    <h3>Pan camera left and right</h3>
                    <input type="range" min={-200} max={100} step={1}
                        onChange={handlePanZChange}
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