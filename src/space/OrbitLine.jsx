import { useThree } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { generateOrbitPoints } from '../utils/orbitUtils';


const OrbitLine = ({ position, radius, onClick }) => {
    const lineRef = useRef();
    const lineColor = 0xFF0000;

    const lineOpacity = !!window.chrome? .4 : .1; // opacity changes for chromium based browsers

    const points = useMemo(() => generateOrbitPoints(position, radius, 90), [position, radius]);

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xFF0000, linewidth: 3, linecap: "butt", transparent: true, opacity: lineOpacity });

    return <line 
        ref={lineRef} 
        geometry={geometry} 
        material={material} 
        rotation={[Math.PI / 2,.4, 0]} 
        position={[0, 0, -200]}
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