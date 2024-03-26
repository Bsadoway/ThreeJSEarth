import React, { forwardRef, useEffect, useState } from "react";
import { Html } from "@react-three/drei";

const AsteroidDetails = forwardRef(({ data, display, onClick }, ref) => {
    const [isVisible, setIsVisible] = useState(display !== false);

    useEffect(() => {
        setIsVisible(display);
    }, [display]);

    return (
        <Html
            ref={ref}
            style={{
                display: isVisible ? "block" : "none",
                position: "absolute",
                top: "-250px",
                left: "-150px",
                padding: "10px",
                color: "white",
                background: "rgba(0, 0, 0, 0.5)",
                transform: "unset",
            }}
            className="a-details"
        >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "300px" }}>
                    Name: {data.name}
                    <br />
                    Size: {data.estimated_diameter.kilometers.estimated_diameter_max} km
                    <br />
                    Close Approach Distance: {data.close_approach_data[0].miss_distance.astronomical} AU
                    <br />
                    Relative Velocity (KM/h): {(data.close_approach_data[0].relative_velocity.kilometers_per_hour * 100) / 100}
                    <br />
                    Is potentially hazardous to Earth?: {data.is_potentially_hazardous_asteroid ? "Yes" : "No"}
                </div>
                <button onClick={onClick}>X</button>
            </div>
        </Html>
    );
});

export default AsteroidDetails;