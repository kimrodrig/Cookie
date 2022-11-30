import ChefCard from './ChefCard'
import {useState} from 'react';
import { getDistance } from 'geolib';
// import Map from "./Map/Map.js";
// import Layers from "./Layers/Layers.js";
// import { fromLonLat } from 'ol/proj';

// import {
//     interaction, layer, custom, control, //name spaces
//     Interactions, Overlays, Controls,     //group
//     Map, Layers, Overlay, Util, ol    //objects
//   } from "react-openlayers";


function ChefsPage({chefs}){

    const yourCoordinates = [-40.7128, 74.0060]
    const [center, setCenter] = useState([-40.7128, 74.0060]);

    // console.log('center is' , fromLonLat(center))
    const [sortBy, setSortBy] = useState('Rating')

    function handleChange(event){
        event.preventDefault();
        setSortBy(event.target.value)
    }

    let sortedChefs = [];

    if (sortBy === 'Rating'){
        sortedChefs = [...chefs].sort((a,b)=>b.avg_rating - a.avg_rating)
    } else if (sortBy === 'Distance'){
        sortedChefs = [...chefs].sort((a,b)=>
            getDistance(getLongLatObj(yourCoordinates), getLongLatObj(a.location)) - getLongLatObj(yourCoordinates, getLongLatObj(b.location))
        )
    }

    function getLongLatObj(coordinateArray){
        return {latitude: coordinateArray[0], longitude: coordinateArray[1]}
    }
  

    return(
        <div>
            <select onChange={(e)=>handleChange(e)}>
                <option>Sort by</option>
                <option>Rating</option>
                <option>Distance</option>
            </select>
            <h1>Chefs</h1>
            {/* <Map view={{center: ol.proj.fromLonlat([-32.951106, -60.669952]), projection: 'EPSG:4326', zoom: 5}}>
                <Layers>
                    <layer.Tile/>
                </Layers>
            </Map> */}
            {sortedChefs.map((chef)=>{return(
                <ChefCard key={chef.id} chef={chef}/>
            )})}
        </div>
    )
}

export default ChefsPage;