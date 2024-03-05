import React from 'react';
import data from '../data/NeoData.json';
import RandomizedDodecahedron from './Asteroid';

class Neo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            neos: []
        };
    }

    componentDidMount() {
        Object.entries(data.near_earth_objects).forEach(([key, value]) => {
            if (key === "2024-02-29") {
                this.setState({ neos: value })
            }
        });
        
    }

    render() {
        //astronomicalConversion: {value: 450}, // 1AU = 450 units in scale
        // earth is 12 = 12,742 km diameter
        // 1 diameter = 1000km roughly
        // for each NEO on that day, create a sphere object and place it in the appropriate position
        return (
            this.state.neos.map((neo) => (
                <group key={neo.id}>
                    <RandomizedDodecahedron 
                        name={neo.name} 
                        astronomicalConversion={this.props.astronomicalConversion} 
                        closeApproachAU={neo.close_approach_data[0].miss_distance.astronomical} 
                        diameter={neo.estimated_diameter.kilometers.estimated_diameter_max}
                        />
                </group>
            ))
        );
    }
}

export default Neo;



