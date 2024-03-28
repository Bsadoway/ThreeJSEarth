import React, { useRef } from 'react';
import * as THREE from 'three';

const OrbitLine = ({ position, radius }) => {
    const lineRef = useRef();

    const curve = new THREE.EllipseCurve(
        position.x, position.y,  // Center of the ellipse
        radius, radius,           // xRadius, yRadius
        9, 2 * Math.PI,           // Start and end angle (radians)
        true,                    // Clockwise
        1.57                         // Rotation
    );

    const points = curve.getPoints(60); 

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xFF0000, linewidth: 1, linecap: "butt", transparent: true, opacity: .05 });

    return <line ref={lineRef} geometry={geometry} material={material} rotation={[0, Math.PI / 2, 0]} position={[0, 0, -200]} />;
};

export default OrbitLine;