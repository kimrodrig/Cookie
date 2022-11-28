import {useState} from 'react';
import Geocode from "react-geocode";

function CreateCustomer() {

    Geocode.setApiKey("AIzaSyAHlmCaUPNsdfQELihym8-IttZSFNAWmnw")

    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [address, setAddress] = useState('')
    const [location, setLocation] = useState([0,0])
    
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
            name: name,
            bio: bio,
            reviews: [],
            ratings: [],
            has_ratings: false,
            has_reviews: false,
            location: location}))

        fetch('/users/', {
         method: "POST",
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
            body: JSON.stringify({
            name: name,
            bio: bio,
            reviews: [],
            ratings: [],
            has_ratings: false,
            has_reviews: false,
            location: location,
          })
        })
        
    }

    return (
        <div>
            <h1>User -- Create New Profile</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input type="text" placeholder="Name..." onChange={(e)=>setName(e.target.value)}></input>
                <input type="text" placeholder="Bio..." onChange={(e)=>setBio(e.target.value)}></input>
                <input type="text" placeholder="Location..." onChange={(e)=>setAddress(e.target.value)}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateCustomer;