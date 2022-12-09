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
            (getDistance(getLongLatObj(yourCoordinates), getLongLatObj(a.location)) - getDistance(getLongLatObj(yourCoordinates), getLongLatObj(b.location)))
        )
    }

    function getLongLatObj(coordinateArray){
        return {latitude: coordinateArray[0], longitude: coordinateArray[1]}
    }

    useEffect(()=>{

            for (const chef of [...chefs].sort((a,b)=>
            (getDistance(getLongLatObj(yourCoordinates), getLongLatObj(a.location)) - getDistance(getLongLatObj(yourCoordinates), getLongLatObj(b.location)))
        )){
                console.log(chef.name, getDistance(getLongLatObj(yourCoordinates), getLongLatObj(chef.location)))
            }
        },[chefs])

        // console.log([...chefs].sort((a,b)=>
        // getDistance(getLongLatObj(yourCoordinates), getLongLatObj(b.location)) - getLongLatObj(yourCoordinates, getLongLatObj(a.location))
    


    return(
        <div>
            <div className="grid grid-cols-2 gap-4 ml-5 mr-4 justify-items-stretch mb-5">
                
                <div className="block">
                    <div className="p-4 rounded-lg shadow-lg bg-white">
                        <MapFn
                            yourCoordinates={yourCoordinates}
                            chefs={chefs}
                            setSelectedChefId={setSelectedChefId}
                            selectedChefId={selectedChefId}
                        />
                    </div>
                </div>
                <div className="">
                    {(selectedChefId === 0) ?
                        <div></div> :
                        <div>
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
                <option value="Rating">Rating &#40;high to low&#41;</option>
                <option value="Distance">Distance &#40;close to far&#41;</option>
            </select>
            
            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 ml-5 mr-4 justify-items-stretch">
                {sortedChefs.map((chef)=>{return(
                    <ChefCard 
                        key={chef.id} 
                        chef={chef} 
                        yourCoordinates={yourCoordinates} 
                        setChefForEvent={setChefForEvent}
                        setSelectedChefId={setSelectedChefId}
                        deactivateClick={false}/>
                )})}
            </div>
        </div>
    )
}

export default ChefsPage;