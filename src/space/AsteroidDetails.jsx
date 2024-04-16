import React, { forwardRef, useEffect, useState } from "react";
import { Html } from "@react-three/drei";

const AsteroidDetails = forwardRef(({ data, display, onClick }, ref) => {
    const [isVisible, setIsVisible] = useState(display !== false);

    useEffect(() => {
        setIsVisible(display);
    }, [display]);

    return (
        <Html
        wrapperClass="hud-transform-unset"
            ref={ref}
            style={{
                display: isVisible ? "block" : "none",
                position: "absolute",
                left: "40vw",
                padding: "20px 30px 30px",
                color: "white",
                background: "rgba(0, 0, 0, 0.5)",
                transform: "unset",
                fontFamily: "Venite",
                width: '500px',
                backgroundColor: 'rgba(90,90,90, 1)',
                borderRadius: '15px',
                zIndex: '99999'

            }}
            className="a-details"
        >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <h2>Name: <span className="blue-text">{data.name} </span> </h2>
                    Size: <span className="blue-text">{data.estimated_diameter.kilometers.estimated_diameter_max} km </span>
                    <br />
                    Absolute Magnitude: <span className="blue-text">{data.absolute_magnitude_h}</span>
                    <br />
                    Close Approach Distance: <span className="blue-text">{data.close_approach_data[0].miss_distance.astronomical} AU</span>
                    <br />
                    Relative Velocity (KM/h): <span className="blue-text">{(data.close_approach_data[0].relative_velocity.kilometers_per_hour * 100) / 100}</span>
                    <br />
                    Orbiting body: <span className="blue-text">{data.close_approach_data[0].orbiting_body}</span>
                    <br />
                    Is potentially hazardous to Earth?: <span className="blue-text">{data.is_potentially_hazardous_asteroid ? "Yes" : "No"}</span>
                </div>
                <button onClick={onClick}>X</button>
            </div>
        </Html>
    );
});

export default AsteroidDetails;