import React, { forwardRef, useEffect, useState } from "react";
import { Html } from "@react-three/drei";

const AsteroidDetails = forwardRef(({ data, display, onClick }, ref) => {
    const [isVisible, setIsVisible] = useState(display !== false);

    useEffect(() => {
        setIsVisible(display);
    }, [display]);

    const formatRelativeVelocity = () => {
        const velocity = data.close_approach_data[0].relative_velocity.kilometers_per_hour;
        return Number(velocity).toFixed(4);
    }

    const formatMissDistance  = () => {
        return Number(data.close_approach_data[0].miss_distance.astronomical).toFixed(4);
    }

    return (
        <Html
        wrapperClass="hud-transform-unset center-absolute"
            ref={ref}
            style={{
                display: isVisible ? "block" : "none",               

            }}
            className="a-details"
        >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <a href={data.nasa_jpl_url} target="_blank"> <h2 style={{color: "#FFF"}}>Name: <span className="blue-text">{data.name} </span> </h2> </a>
                    Size: <span className="blue-text">{data.estimated_diameter.kilometers.estimated_diameter_max.toFixed(4)} km </span>
                    <br />
                    Absolute Magnitude: <span className="blue-text">{data.absolute_magnitude_h}</span>
                    <br />
                    Close Approach Distance: <span className="blue-text">{formatMissDistance()} AU</span>
                    <br />
                    Relative Velocity (KM/h): <span className="blue-text">{formatRelativeVelocity()}</span>
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