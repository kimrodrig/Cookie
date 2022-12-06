import {useEffect, useState} from 'react';
import Geocode from "react-geocode";
import { useNavigate, json } from 'react-router-dom';


function CreateChef({currentUser, setCurrentUser}) {

    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [cuisineText, setCuisineText] = useState('')
    const [address, setAddress] = useState('')
    const [location, setLocation] = useState([0,0])
    
    const nav = useNavigate();
    
    Geocode.setApiKey("AIzaSyAHlmCaUPNsdfQELihym8-IttZSFNAWmnw")
    
    console.log("address: ", address)
    console.log('location: ', location)

    useEffect(()=>{
        setCoordinates();
    },[address])

    function setCoordinates(){
        Geocode.fromAddress(address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setLocation([lng, lat]);
            },
            (error) => {console.error(error)}
        );
    }

    function handleSubmit(e){
        e.preventDefault();

        setCoordinates()

        fetch('/chefs/', {
         method: "POST",
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
            body: JSON.stringify({
            name: name,
            cuisines: cuisineText.split(','),
            bio: bio,
            reviews: [],
            ratings: [],
            has_ratings: false,
            has_reviews: false,
            location: location,
          })
        }).then(res => res.json())
        .then(chef=>{
            fetch(`/users/${currentUser.id}`, {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    has_profile: true,
                    chef_id: chef.id
                })
            })
            .then(res=>res.json()).then(e=>setCurrentUser(e))
        })
        .then(nav('/'))
    }

    return (
        <div className="form-container">
            <h1>Create My Profile</h1>            
            <form className="form-class" onSubmit={(e)=>handleSubmit(e)}>
                <label className="form-label">
                    <input className="input-class" type="text" placeholder="Name..." onChange={(e)=>setName(e.target.value)}></input>
                </label>
                <label className="form-label">
                    <input className="input-class" type="text" placeholder="Bio..." onChange={(e)=>setBio(e.target.value)}></input>
                </label>
                <label className="form-label">
                    <input className="input-class" type="text" placeholder="Cuisines..." onChange={(e)=>setCuisineText(e.target.value)}></input>
                </label>
                <label className="form-label">
                    <input className="input-class" type="text" placeholder="Location..." onChange={(e)=>setAddress(e.target.value)}></input>
                </label>
                <button className="submit-button focus:outline-none focus:shadow-outline" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateChef;