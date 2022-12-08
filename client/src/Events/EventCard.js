import React, {useEffect, useState} from 'react'
import ProfileMap from '../ProfileMap'
import moment from 'moment';


function EventCard({event, setRerender}) {

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
    function contactChef(){
        //
    }

    console.log(event.datetime)
    console.log(chef)

    return (

    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="dropdown relative flex justify-end px-4 pt-4">
            <button
                className="dropdown-toggle inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" 
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
                    <p className="text-md">Cancel event</p>
                </div>
            </ul>
        </div>
        
        <div class="flex flex-col items-center pb-10">
            {/* <ProfileMap yourCoordinates={event.location}/>  */}
            <h2 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mt-10">
                Event with {chef.name}
            </h2> 
            <h5 class="mb-1 mt-7 text-xl font-medium text-gray-900 dark:text-white">
                {moment(event.datetime).format("dddd, MMMM Do YYYY")}
                <br></br>
                {moment(event.datetime).format("h:mm a")}
            </h5>
            <h5 class="mb-1 mt-3 text-lg leading-tight uppercase rounded text-gray-900 dark:text-white">
                {event.duration} long
            </h5>
            <h5 class="mb-1 mt-3 text-s leading-tight uppercase rounded text-gray-500 dark:text-white">
                {event.parsed_address}
            </h5>
            <div class="flex mt-4 space-x-3 md:mt-6">
                <p onClick={contactChef} class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message Chef</p>
            </div>
        </div>
    </div>


    )
}

export default EventCard