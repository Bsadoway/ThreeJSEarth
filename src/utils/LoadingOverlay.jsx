import React, { useState } from 'react';
import { Html } from '@react-three/drei';

const LoadingOverlay = ({ display }) => {

    return (
        <>
            <Html>
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">LOADING NEAR EARTH OBJECTS...</div>
                </div>
            </Html>
        </>
    );
};

export default LoadingOverlay;