import React, { useState, useEffect } from 'react';
import { Float, Cloud, Html, Clouds } from '@react-three/drei';
import Asteroid from './Asteroid';
import * as THREE from 'three';
import params from '../utils/UniverseParams';
const NEO = React.memo(({ earthSize, astronomicalConversion }) => {
    const [neos, setNEOs] = useState([]);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/neo');
                const data = await response.json();
                const latestNEOs = data.length ? data[data.length - 1].neoData : [];
                setNEOs(latestNEOs);
            } catch (error) {
                console.error('Error fetching NEO data:', error);
            }
        };
        fetchData();
    }, []);


    return (
        <>
            {neos.map((neo) => (
                <group key={neo.id} position={[0, 20, astronomicalConversion * neo.close_approach_data[0].miss_distance.astronomical + params.AUOffset]}>
                    <Asteroid
                        key={neo.id}
                        id={neo.id}
                        args={[neo.estimated_diameter.kilometers.estimated_diameter_max * 4, 32, 32]}
                        data={neo}
                        position={[0, 20, astronomicalConversion * neo.close_approach_data[0].miss_distance.astronomical + params.AUOffset]}>

                    </Asteroid>
                    <Clouds material={THREE.MeshBasicMaterial}>
                        <Cloud segments={3} bounds={[1, 1, 1]} volume={neo.estimated_diameter.kilometers.estimated_diameter_max * 40} color="grey" fade={50} opacity={.05} />
                    </Clouds>

                </group>
            ))}
        </>
    );
});

export default NEO;

