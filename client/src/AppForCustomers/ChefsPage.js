import ChefCard from './ChefCard'
import {useState, useEffect, useRef} from 'react';
import { getDistance } from 'geolib';
import MapFn from "./MapFn.js"


function ChefsPage({chefs, currentUser, currentCustomer, setChefForEvent}){

    const [selectedChefId, setSelectedChefId] = useState(0)
    const yourCoordinates = currentCustomer.location

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
            <div className="grid grid-cols-2 gap-4 w-full py-5 px-5">
                <MapFn
                    yourCoordinates={yourCoordinates}
                    chefs={chefs}
                    setSelectedChefId={setSelectedChefId}
                    selectedChefId={selectedChefId}
                />
                <div className="h-96">
                    {(selectedChefId === 0) ?
                        <div></div> :
                        <div className="h-96">
                            <ChefCard 
                                chef={(chefs.find((chef)=> chef.id === selectedChefId))}
                                setChefForEvent={setChefForEvent}
                                deactivateClick={true}
                            />
                        </div>
                    }
                    </div>
            </div>
            Sort by
            <select onChange={(e)=>handleChange(e)}>
                <option>Rating</option>
                <option>Distance</option>
            </select>
            
            <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ml-5 mr-5 justify-items-stretch">
                {sortedChefs.map((chef)=>{return(
                    <ChefCard 
                        key={chef.id} 
                        chef={chef} yourCoordinates={yourCoordinates} 
                        setChefForEvent={setChefForEvent}
                        setSelectedChefId={setSelectedChefId}
                        deactivateClick={false}/>
                )})}
            </div>
        </div>
    )
}

export default ChefsPage;