import {useEffect, useState} from 'react';
import Geocode from "react-geocode";
import { json } from 'react-router-dom';
import Profile from './Profile'


function CreateChef({currentUser, setCurrentUser}) {


    Geocode.setApiKey("AIzaSyAHlmCaUPNsdfQELihym8-IttZSFNAWmnw")

    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [cuisineText, setCuisineText] = useState('')
    const [address, setAddress] = useState('')
    const [location, setLocation] = useState([0,0])
    const [accountId, setAccountId] = useState(0)
    
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

        console.log(name, address, cuisineText.split(','), location)

        console.log(JSON.stringify({
            name: name,
            cuisines: cuisineText.split(','),
            bio: bio,
            reviews: [],
            ratings: [],
            has_ratings: false,
            has_reviews: false,
            location: location}))

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
            .then(res=>res.json()).then(e=>console.log(e))
        })
        
    }

    return (
        <div>
            <h1>Chef -- Create My Profile</h1>            
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input type="text" placeholder="Name..." onChange={(e)=>setName(e.target.value)}></input>
                <input type="text" placeholder="Bio..." onChange={(e)=>setBio(e.target.value)}></input>
                <input type="text" placeholder="Cuisines..." onChange={(e)=>setCuisineText(e.target.value)}></input>
                <input type="text" placeholder="Location..." onChange={(e)=>setAddress(e.target.value)}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateChef;