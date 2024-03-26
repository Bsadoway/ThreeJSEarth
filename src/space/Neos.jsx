import React, { useState, useEffect } from 'react';
import { Sphere, Center, Text3D, Float, Cloud,useMatcapTexture} from '@react-three/drei';
import Asteroid from './Asteroid';
import { Physics } from "@react-three/cannon";
import { MeshBasicMaterial } from 'three';

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
                        <Float speed={1}  floatingRange={[1, 5]}>
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
                            <Center position={[0, 4, 0]} >
                                <Text3D
                                    height={0.5}
                                    size={1}
                                    rotation={[0, -90, 0]}
                                    font="./Space Age_Regular.json"
                                >
                                    {neo.name.replace(/[()]/g, "")}
                                    <meshMatcapMaterial color="white" matcap={matcapTexture} />
                                </Text3D>
                            </Center>
                        </Float>
                </group>
            ))}

        </>
    );
});

export default NEO;

