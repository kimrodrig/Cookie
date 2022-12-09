import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import Geocode from "react-geocode";
import Rating from 'react-rating'
import parser from 'parse-address'

function CreateEvent({currentCustomer, chefForEvent, setChefForEvent, chefs, setRerender}) {

    Geocode.setApiKey("AIzaSyAHlmCaUPNsdfQELihym8-IttZSFNAWmnw")

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [address, setAddress] = useState('')
    const [duration, setDuration] = useState('')
    const [parsedAddress, setParsedAddress] = useState({})
    const [location, setLocation] = useState([0,0])
    const [customerId, setCustomerId] = useState(0)
    const [buttonShouldBeDisabled, setButtonShouldBeDisabled] = useState(true)

    const nav = useNavigate();
    let datetime = date + 'T' + time + ':44.000Z'

    useEffect(() => {
        setCustomerId(currentCustomer?.id)
    },[currentCustomer])
    
    function setCoordinates(){
        Geocode.fromAddress(address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setLocation([lat, lng]);
            },
            (error) => {
                console.error(error)
                setLocation([0,0])
            }
        );
    }

    const parsedAddressObject = (parser.parseLocation(address.toUpperCase()))
    let parsedAddressString = ''
    for (const a in parsedAddressObject){
        parsedAddressString += 
        (parsedAddressObject[a]) + 
        ((a === 'state' || a === 'sec_unit_type') ? '' : ' ')
    }

    useEffect(() => {
        setCoordinates()
        setParsedAddress(address)
    },[address])

    function handleSubmit(e){
        e.preventDefault();
        fetch('/events', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({
                    datetime: datetime,
                    location: location,
                    chef_id: chefForEvent.id,
                    customer_id: customerId,
                    parsed_address: parsedAddressString,
                    duration: duration
            })
        }).then(setRerender(prev=>!prev))
        .then(nav('/events'))
    }

    useEffect(()=>{
        if (date === '' || time === '' || duration === '' || (location[0] === 0 && location[1] === 0) || !chefForEvent.id || (Date.parse(datetime)-Date.now() < 0)){
            setButtonShouldBeDisabled(true)
        } else {
            setButtonShouldBeDisabled(false)
        }
    },[date, time, location, chefForEvent, duration])    

    const sortedChefs = [...chefs].sort((a,b)=>b.avg_rating - a.avg_rating)

    let durationsArray = []
    for (let i = 0; i < 12; i++){
        if (i === 0) {
            durationsArray.push(`${i}:30 hour`)
        } if (i === 1) {
            durationsArray.push(`${i}:00 hour`)
            durationsArray.push(`${i}:30 hours`)
        } else if (i > 1){
            durationsArray.push(`${i}:00 hours`)
            durationsArray.push(`${i}:30 hours`)
        }
    }

    return (
        <div className="form-container">
            <h2 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mt-10">
            Create a New Event {(chefForEvent.name !== undefined) ? `with ${chefForEvent.name}`: ""}</h2>
            <form className="form-class" onSubmit={handleSubmit}>

            <div className="flex justify-center mb-5">
                    <div>
                        <div className="dropdown relative">
                            <button
                                className="
                                dropdown-toggle
                                px-6
                                py-2.5
                                bg-blue-600
                                text-white
                                font-medium
                                text-xs
                                leading-tight
                                uppercase
                                rounded
                                shadow-md
                                hover:bg-blue-700 hover:shadow-lg
                                focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                                active:bg-blue-800 active:shadow-lg active:text-white
                                transition
                                duration-150
                                ease-in-out
                                flex
                                items-center
                                whitespace-nowrap
                                "
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {(chefForEvent.name !== undefined) ? "Select a different chef": "Select a chef"}
                                <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="caret-down"
                                class="w-2 ml-2"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                                >
                                <path
                                    fill="currentColor"
                                    d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                                ></path>
                                </svg>
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
                                {sortedChefs.map((chef)=> {
                                    return (
                                    <div
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
                                        onClick={(e)=>setChefForEvent(chef)}
                                        >
                                        <p className="text-md">{chef.name} </p>
                                        <div className="">
                                            <Rating 
                                                initialRating={chef.avg_rating}
                                                emptySymbol="fa fa-star-o fa-2x"
                                                fullSymbol="fa fa-star fa-2x"
                                                readonly="true"
                                            /> 
                                        </div>
                                    </div>)}
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col items-center justify-center">
               
                    <div class="datepicker form-floating mb-3" data-mdb-toggle-button="false">
                        <input type="date"
                        class="form-control block w-48 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Select a date" data-mdb-toggle="datepicker"
                        onChange={(e)=>setDate(e.target.value)}/>
                        <label for="floatingInput" class="text-gray-700">Select a date</label>
                    </div>
                </div>

                <div class="flex items-center justify-center">
                    <div class="timepicker form-floating mt-2">
                        <input type="time"
                        class="justify-center form-control block w-48 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Select a start time" 
                        onChange={(e)=>setTime(e.target.value)}/>
                        <label for="floatingInput" class="text-gray-700">Select a start-time</label>
                    </div>
                </div>

                <div className="flex justify-center mb-5 mt-5">
                    <div>
                        <div className="dropdown relative">
                            <button
                                className="
                                dropdown-toggle
                                px-6
                                py-2.5
                                bg-blue-600
                                text-white
                                font-medium
                                text-xs
                                leading-tight
                                uppercase
                                rounded
                                shadow-md
                                hover:bg-blue-700 hover:shadow-lg
                                focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                                active:bg-blue-800 active:shadow-lg active:text-white
                                transition
                                duration-150
                                ease-in-out
                                flex
                                items-center
                                whitespace-nowrap
                                "
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Event duration
                                <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="caret-down"
                                class="w-2 ml-2"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                                >
                                <path
                                    fill="currentColor"
                                    d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                                ></path>
                                </svg>
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
                                {durationsArray.map((duration)=> {
                                    return (
                                    <div
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
                                        onClick={(e)=>setDuration(duration)}
                                        >
                                        <p className="text-md">{duration}</p>
                                    </div>)}
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                <p className="text-md">{duration}</p>

                <label className="form-label">
                    <input className="input-class" type="text" placeholder="Type in a full address..." onChange={(e)=>setAddress(e.target.value)}></input>
                </label>
                
                <button className="submit-button" type="submit" disabled={buttonShouldBeDisabled}>Submit</button>
            </form>
        </div>
    )
}

export default CreateEvent;