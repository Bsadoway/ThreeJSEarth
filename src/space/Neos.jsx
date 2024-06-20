import React, { useState, useEffect, useMemo } from 'react';
import { Cloud, Clouds } from '@react-three/drei';
import Asteroid from './Asteroid';
import * as THREE from 'three';
import params from '../utils/UniverseParams';
import toast from 'react-hot-toast';

const NEOS = React.memo(({ astronomicalConversion, date }) => {
    const [neos, setNEOs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formattedDate = date.toLocaleDateString();
                const response = await fetch(`http://localhost:3000/api/neo?date=${formattedDate}`);
                const data = await response.json();
                if (data[formattedDate]) {
                    setNEOs(data[formattedDate]);
                    console.log("Fetched neos for " + formattedDate);
                } else {
                    toast.error("Error finding Neo data, please refresh or try another browser");
                    toast.error("No NEO data available for " + date);

                }               
            } catch (error) {
                console.error('Error fetching NEO data:', error);
            }

        };
        fetchData();
    }, [date]);

    return (
        <>
            {neos.map((neo, index) => (
                <group key={neo.id} 
                position={[0, 20, astronomicalConversion * neo.close_approach_data[0].miss_distance.astronomical + params.AUOffset]}
                >
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

export default NEOS;

