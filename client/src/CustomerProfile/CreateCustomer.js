import {useState, useEffect} from 'react';
import Geocode from "react-geocode";
import { useNavigate, json } from 'react-router-dom';


function CreateCustomer({currentUser, setCurrentUser}) {

    Geocode.setApiKey("AIzaSyAHlmCaUPNsdfQELihym8-IttZSFNAWmnw")

    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [address, setAddress] = useState('')
    const [location, setLocation] = useState([0,0])
    
    const nav = useNavigate();

    function setCoordinates(){
        Geocode.fromAddress(address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setLocation([lat, lng]);
            },
            (error) => {console.error(error)}
        );
    }

    console.log("address: ", address)
    console.log('location: ', location)

    useEffect(()=>{
        setCoordinates();
    },[address])

    function handleSubmit(e){
        e.preventDefault();
        setCoordinates()

        fetch('/customers/', {
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
        }).then(res => res.json())
        .then(customer => {
            fetch(`/users/${currentUser.id}`, {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    has_profile: true,
                    customer_id: customer.id
                })
            })
            .then(res=>res.json())
            .then(e=>setCurrentUser(e))
        })           
        .then(nav('/'))
    }

    return (
        <div className="form-container">
            <h1>User -- Create My Profile</h1>
            <form className="form-class" onSubmit={(e)=>handleSubmit(e)}>
                <label className="form-label">
                    <input className="input-class" type="text" placeholder="Name..." onChange={(e)=>setName(e.target.value)}></input>
                </label>
                <label className="form-label">
                    <input className="input-class" type="text" placeholder="Bio..." onChange={(e)=>setBio(e.target.value)}></input>
                </label>
                <label className="form-label">
                    <input className="input-class" type="text" placeholder="Location..." onChange={(e)=>setAddress(e.target.value)}></input>
                </label>
                <button className="submit-button" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateCustomer;