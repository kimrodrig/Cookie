import ChefCard from './ChefCard'
import {useState, useEffect, useRef} from 'react';
import { getDistance } from 'geolib';
import MapFn from "./MapFn.js"


function ChefsPage({chefs, currentUser, currentCustomer}){

    const [selectedChefId, setSelectedChefId] = useState(0)
    const yourCoordinates = currentCustomer.location

    console.log(selectedChefId)
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
            <MapFn
                yourCoordinates={yourCoordinates}
                chefs={chefs}
                setSelectedChefId={setSelectedChefId}
            />
            {(selectedChefId === 0) ?
                <div></div> :
                <ChefCard chef={(chefs.find((chef)=> chef.id === selectedChefId))}
                />
            }
            Sort by
            <select onChange={(e)=>handleChange(e)}>
                <option>Rating</option>
                <option>Distance</option>
            </select>

            {sortedChefs.map((chef)=>{return(
                <ChefCard key={chef.id} chef={chef} yourCoordinates={yourCoordinates}/>
            )})}

        </div>
    )
}

export default ChefsPage;