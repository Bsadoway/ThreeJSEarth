import React, { forwardRef } from "react";
import { Html } from "@react-three/drei";

const AsteroidDetails = forwardRef(({ data, display, onClick }, ref) => (
    <Html
        ref={ref}
        style={{ display: display !== false ? "block" : "none", position: 'absolute', top: 0, left: 0, padding: '10px', color: 'white', background: 'rgba(0, 0, 0, 0.5)', transform: 'unset' }}
        onClick={onClick}
    >
        <div style={{ width: "300px" }}>
            Name: {data.name}
            <br />
            Size: {data.estimated_diameter.kilometers.estimated_diameter_max} km
            <br />
            Close Approach Distance: {data.close_approach_data[0].miss_distance.astronomical} AU
        </div>
    </Html>
));


export default AsteroidDetails;