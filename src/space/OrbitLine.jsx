import { useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';

const OrbitLine = ({ position, radius, id, onClick }) => {
    const lineRef = useRef();
    const lineColor = 0xFF0000;

    const curve = new THREE.EllipseCurve(
        position.x, position.y,  // Center of the ellipse
        radius, radius,          // xRadius, yRadius
        9, 2 * Math.PI,          // Start and end angle (radians)
        true,                    // Clockwise
        1.57                     // Rotation
    );

    const lineOpacity = !!window.chrome? .4 : .1; // opacity changes for chromium based browsers

    const points = curve.getPoints(60);

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xFF0000, linewidth: 1, linecap: "butt", transparent: true, opacity: lineOpacity });

    return <line ref={lineRef} geometry={geometry} material={material} rotation={[0, Math.PI / 2, 0]} position={[0, 0, -200]}
        onPointerOver={(e) => {
            if (lineRef.current) {
                lineRef.current.material.color.set(0xfff000);
            }
            document.body.style.cursor = 'pointer'; // Change cursor to pointer
        }}
        onPointerLeave={(e) => {
            if (lineRef.current) {
                lineRef.current.material.color.set(lineColor);
            }
            document.body.style.cursor = 'auto'; // Change cursor to pointer
        }}
        onClick={onClick}
    />;
};

export default OrbitLine;