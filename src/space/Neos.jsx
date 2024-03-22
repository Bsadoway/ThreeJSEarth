import React, { useState, useEffect } from 'react';
import { Sphere, Center, Text3D, Html } from '@react-three/drei';
import Asteroid from './Asteroid';

const NEO = React.memo(({ earthSize, astronomicalConversion }) => {
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


    const handleClick = (e, id) => {
        e.stopPropagation();
        setSelectedId(id === selectedId ? null : id);
    };

    const getDataForId = (id) => {
        return neos.find((asteroid) => asteroid.id === id);
    };
    
    return (
        <>
            {neos.map((neo) => (
                <group key={neo.id} position={[0, 20, astronomicalConversion * neo.close_approach_data[0].miss_distance.astronomical]}>
                    <Asteroid
                        key={neo.id}
                        id={neo.id}
                        args={[neo.estimated_diameter.kilometers.estimated_diameter_max * 4, 32, 32]}
                        data={neo}
                    >
                    </Asteroid>
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
                </group>
            ))}
 
        </>
    );
});

export default NEO;

