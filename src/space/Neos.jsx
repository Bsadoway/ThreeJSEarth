import React, { useState, useEffect } from 'react';
import { Sphere,Center, Text3D, } from '@react-three/drei';
import { Html } from '@react-three/drei';

const NEO = (props) => {
    const [neos, setNEOs] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

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

    const handleClick = (id) => {
        setSelectedId(id === selectedId ? null : id);
    };

    return (
        <>
            {neos.map((neo) => (
                <group key={neo.id} position={[0, 20, props.astronomicalConversion * neo.close_approach_data[0].miss_distance.astronomical]}>
                    <Sphere
                        args={[neo.estimated_diameter.kilometers.estimated_diameter_max * 4, 32, 32]}
                        onClick={() => handleClick(neo.id)}
                        onPointerOver={(e) => {
                            e.object.material.opacity = 0.7;
                            document.body.style.cursor = 'pointer'; // Change cursor to pointer
                        }}
                        onPointerOut={(e) => {
                            e.object.material.opacity = 0.5;
                            document.body.style.cursor = 'auto'; // Reset cursor to default
                        }}
                        // onPointerMissed={(e) => {
                        //     e.object.material.opacity = 0.5;
                        //     document.body.style.cursor = 'auto'; // Reset cursor to default
                        // }}
                        onPointerMove={(e) => {
                            if (e.object.material.opacity !== 0.7) {
                                e.object.material.opacity = 0.5;
                            }
                        }}
                    >
                        <meshBasicMaterial color={selectedId === neo.id ? 'yellow' : 'red'} transparent opacity={0.5} />
                    </Sphere>
                    <Center position={[0, 4, 0]} rotateX={90}>
                        <Text3D
                            height={0.5}
                            size={1}
                            rotation={[0, -90, 0]}
                            font="./Space Age_Regular.json"
                        >
                            {neo.name.replace(/[()]/g, "")}
                        </Text3D>
                    </Center>

                    {selectedId === neo.id && (
                        <Html
                            style={{ position: 'absolute', top: 0, left: 0, padding: '10px', color: 'white', background: 'rgba(0, 0, 0, 0.5)', transform: 'unset' }}
                        >
                            <div>
                                Size: {neo.estimated_diameter.kilometers.estimated_diameter_max} km
                                <br />
                                Close Approach Distance: {neo.close_approach_data[0].miss_distance.astronomical} AU
                            </div>
                        </Html>
                    )}
                </group>
            ))}
        </>
    );
};

export default NEO;