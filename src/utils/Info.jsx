import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { FaInfoCircle } from "@react-icons/all-files/fa/FaInfoCircle";

const Info = () => {


    const [showOverlay, setShowOverlay] = useState(false); // State to toggle overlay visibility

    const toggleOverlay = () => {
        setShowOverlay(!showOverlay); // Toggle the overlay visibility
    };
    return (
        <>
            <Html wrapperClass='info-wrapper hud-transform-unset'>
                <button className="info" onClick={toggleOverlay}>
                <FaInfoCircle />
                </button>
            </Html>
            {showOverlay && (
                <Html wrapperClass='info-overlay hud-transform-unset debug-hud'>
                    <div>
                        <p>Disclaimer:
                        <br />
                        The Near Earth Objects and planets depicted in this visualization are scaled up for visual representation and do not reflect their actual sizes. Similarly, the orbits shown are also scaled and do not accurately represent the NEOs' actual orbital paths. 

                        </p>
                        <button onClick={toggleOverlay}>Close</button>
                    </div>
                </Html>
            )}
        </>
    );
};

export default Info;