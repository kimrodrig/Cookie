import {useState, useEffect, useLocation} from 'react';
import Geocode from "react-geocode";

function CreateEvent({currentCustomer, chefForEvent}) {

    Geocode.setApiKey("AIzaSyAHlmCaUPNsdfQELihym8-IttZSFNAWmnw")

    const [datetime, setDatetime] = useState('')
    const [address, setAddress] = useState('')
    const [location, setLocation] = useState([0,0])
    const [customerId, setCustomerId] = useState(0)

    useEffect(() => {
        setCustomerId(currentCustomer?.id)
    },[currentCustomer])
    
    function setCoordinates(){
        Geocode.fromAddress(address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setLocation([lat, lng]);
            },
            (error) => {console.error(error)}
        );
    }

    console.log(JSON.stringify({
        datetime: datetime,
        location: location,
        chef_id: chefForEvent.id,
        customer_id: customerId
    }))

    function handleSubmit(e){
        e.preventDefault();
        setCoordinates()

        fetch('/events/', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({
                datetime: datetime,
                location: location,
                chef_id: chefForEvent.id,
                customer_id: customerId
            })
        })
        
    }

    return (
        <div className="form-container">
            <h2 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mt-10">
            Create New Event {(chefForEvent.name !== undefined) ? `with ${chefForEvent.name}`: ""}</h2>
            <form className="form-class" onSubmit={(e)=>handleSubmit(e)}>
                <label className="form-label">
                    <input className="input-class" type="text" placeholder="Datetime..." onChange={(e)=>setDatetime(e.target.value)}></input>
                </label>
                <label className="form-label">
                    <input className="input-class" type="text" placeholder="Location..." onChange={(e)=>setAddress(e.target.value)}></input>
                </label>
                <button className="submit-button" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateEvent;