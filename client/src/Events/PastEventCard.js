import React, {useEffect, useState} from 'react'
import ProfileMap from '../ProfileMap'
import moment from 'moment';
import Rating from 'react-rating';


function PastEventCard({event, setRerender}) {

    const [chef, setChef] = useState({})

    useEffect(()=>{
        fetch(`/chefs/${event.chef_id}`)
        .then(res => res.json())
        .then(chef => setChef(chef))
    },[])

    function handleDelete(){
        fetch(`/events/${event.id}`,
            {method: 'DELETE'}
        )
        setRerender(prev=>!prev)
    }

    function rateChef(){
        //
    }


    return (

    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="dropdown relative flex justify-end px-4 pt-4">
            <button
                className="dropdown-toggle inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5" 
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
            </button>
            <ul
                className="
                dropdown-menu
                min-w-max
                absolute
                hidden
                bg-white
                text-base
                z-50
                float-left
                py-2
                list-none
                text-left
                rounded-lg
                shadow-lg
                mt-1
                hidden
                m-0
                bg-clip-padding
                border-none
                "
                aria-labelledby="dropdownMenuButton1"
            >
                <div
                    onClick={handleDelete}
                    className="
                    dropdown-item
                    text-sm
                    py-2
                    px-4
                    font-normal
                    block
                    w-full
                    whitespace-nowrap
                    bg-transparent
                    text-gray-700
                    hover:bg-gray-100
                    "
                    >
                    <p className="text-md">Remove event</p>
                </div>
            </ul>
        </div>
        
        <div className="flex flex-col items-center pb-10">
            <h2 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mt-10">
                Event with {chef.name}
            </h2> 
            <h5 class="mb-1 mt-7 text-xl font-medium text-gray-900">
                {moment(event.datetime).format("dddd, MMMM Do YYYY")}
                <br></br>
                {moment(event.datetime).format("h:mm a")}
            </h5>
            <h5 class="mb-1 mt-3 text-lg leading-tight uppercase rounded text-gray-900">
                {event.duration} long
            </h5>
            <h5 class="mb-1 mt-3 text-s leading-tight uppercase rounded text-gray-500">
                {event.parsed_address}
            </h5>
            <div className="text-lg flex mt-4 items-center space-x-3 md:mt-6">
                Rate Chef:
            </div>
            <div className="flex items-center space-x-3 mt-2">
                <Rating
                        emptySymbol="fa fa-star-o fa-2x"
                        fullSymbol="fa fa-star fa-2x"
                        // onChange={(e)=>console.log(e.target.value)}
                    />
            </div>            
        </div>
    </div>


    )
}

export default PastEventCard