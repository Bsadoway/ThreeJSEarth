
import React from 'react';
// import neoJSONData from './public/NeoData.json';
import data from '../data/NeoData.json';

class Neo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            neos: 0
        };
    }


    componentDidMount(){
        Object.entries(data.near_earth_objects).forEach(([key, value]) => {
            if(key === "2024-02-29"){
                this.setState({neos: value})
            }
          });   
    }


    render() {

        const name = "";
        const distance = "";
        const scale = "";
        // console.log(data.near_earth_objects)
        // for each NEO on that day, create a sphere object and place it in the appropriate position
        return <h2>Hi, I am a NEO! </h2>;
    }



}

export default Neo;



