import React, { useState, useEffect } from 'react';
import { Float, Cloud, Html, Clouds } from '@react-three/drei';
import Asteroid from './Asteroid';
import * as THREE from 'three';
import OrbitLine from './OrbitLine';
const NEO = React.memo(({ earthSize, astronomicalConversion }) => {
    const [neos, setNEOs] = useState([]);
    const AUOffset = 10 // The AU distance offset from the actual surface of the Earth ot the Sun vs the zero'd out starting point

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('src/data/NeoData.json');
                const data = await response.json();
                setNEOs(data.near_earth_objects["2024-02-29"] || []);
            } catch (error) {
                console.error('Error fetching NEO data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {neos.map((neo) => (
                <group key={neo.id} position={[0, 20, astronomicalConversion * neo.close_approach_data[0].miss_distance.astronomical + AUOffset]}>
                    <Float speed={1} floatingRange={[1, neo.estimated_diameter.kilometers.estimated_diameter_max * 15]}>
                        <Asteroid
                            key={neo.id}
                            id={neo.id}
                            args={[neo.estimated_diameter.kilometers.estimated_diameter_max * 4, 32, 32]}
                            data={neo}
                            position={[0, 20, astronomicalConversion * neo.close_approach_data[0].miss_distance.astronomical + AUOffset]}>

                        </Asteroid>
                        <Clouds material={THREE.MeshBasicMaterial}>
                            <Cloud segments={3} bounds={[1, 1, 1]} volume={neo.estimated_diameter.kilometers.estimated_diameter_max * 40} color="grey" fade={50} opacity={.05} />
                        </Clouds>
                    </Float>

                    <Html style={{ width: "150px", fontWeight: "bold", position: "absolute", left: "-30px" }}>
                        <div>{neo.name.replace(/[()]/g, "")}</div>
                    </Html>
                    <OrbitLine position={[0, 20, astronomicalConversion * neo.close_approach_data[0].miss_distance.astronomical + AUOffset]} radius={200} />

                </group>
            ))}

        </>
    );
});

export default NEO;

