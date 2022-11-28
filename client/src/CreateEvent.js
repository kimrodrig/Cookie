import {useState} from 'react';
import Geocode from "react-geocode";

function CreateEvent() {

    Geocode.setApiKey("AIzaSyAHlmCaUPNsdfQELihym8-IttZSFNAWmnw")

    const [datetime, setDatetime] = useState('')
    const [address, setAddress] = useState('')
    const [location, setLocation] = useState([0,0])
    
    const chef_id = 1
    const user_id = 1

    function setCoordinates(){
        Geocode.fromAddress(address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setLocation([lat, lng]);
            },
            (error) => {console.error(error)}
        );
    }
    function handleSubmit(e){
        e.preventDefault();
        setCoordinates()

        console.log(JSON.stringify({
            datetime: datetime,
            location: location,
            chef_id: chef_id,
            user_id: user_id
        }))

        fetch('/events/', {
         method: "POST",
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
            body: JSON.stringify({
            datetime: datetime,
            location: location,
            chef_id: chef_id,
            user_id: user_id
          })
        })
        
    }

    return (
        <div>
            <h1>Create New Event</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input type="text" placeholder="Datetime..." onChange={(e)=>setDatetime(e.target.value)}></input>
                <input type="text" placeholder="Location..." onChange={(e)=>setAddress(e.target.value)}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateEvent;