import ChefCard from './ChefCard'
import {useState, useEffect, useRef} from 'react';
import { getDistance } from 'geolib';
import Map from "./Map.js"


function ChefsPage({chefs, currentUser}){

    const [customer, setCustomer] = useState({})

    const yourCoordinates = customer.location

    // console.log('center is' , fromLonLat(center))
    const [sortBy, setSortBy] = useState('Rating')


    useEffect(() => {
        fetch(`/customers/${currentUser.customer_id}`)
        .then(res=>res.json()).then(customer => setCustomer(customer))
    },[])

    console.log(yourCoordinates)

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
            Sort by
            <select onChange={(e)=>handleChange(e)}>
                <option>Rating</option>
                <option>Distance</option>
            </select>

            <Map yourCoordinates={yourCoordinates}/>
            {/* center on yourCoordinates */}

            {sortedChefs.map((chef)=>{return(
                <ChefCard key={chef.id} chef={chef}/>
            )})}
        </div>
    )
}

export default ChefsPage;