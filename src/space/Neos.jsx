import React, { useState, useEffect } from 'react';
import { Sphere, Center, Text3D, Float, Cloud, useMatcapTexture, Html, Trail } from '@react-three/drei';
import Asteroid from './Asteroid';

const NEO = React.memo(({ earthSize, astronomicalConversion }) => {
    const [neos, setNEOs] = useState([]);
    const [matcapTexture] = useMatcapTexture("456A73_779B9E_173A46_154C5D");

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
                <group key={neo.id} position={[0, 20, astronomicalConversion * neo.close_approach_data[0].miss_distance.astronomical]}>
                    <Float speed={1} floatingRange={[1, neo.estimated_diameter.kilometers.estimated_diameter_max * 15]}>
                        <Asteroid
                            key={neo.id}
                            id={neo.id}
                            args={[neo.estimated_diameter.kilometers.estimated_diameter_max * 4, 32, 32]}
                            data={neo}
                        >
                        </Asteroid>
                       
                            {/* <Clouds material={MeshBasicMaterial}>
                                <Cloud segments={40} bounds={[10, 2, 2]} volume={10} color="orange" />
                                <Cloud seed={1} scale={2} volume={5} color="hotpink" fade={100} />
                            </Clouds> */}

                    </Float>
                    <Html style={{ width: "150px", fontWeight: "bold", position: "absolute", left: "-30px" }}>
                        <div>{neo.name.replace(/[()]/g, "")}</div>
                    </Html>
                </group>
            ))}

        </>
    );
});

export default NEO;

