import {useState, useEffect, useCallback} from 'react';
import Geocode from "react-geocode";
import { useNavigate, json } from 'react-router-dom';
import Dropzone from '../Dropzone';


function CreateCustomer({currentUser, setCurrentUser, setCurrentCustomer}) {

    Geocode.setApiKey("AIzaSyAHlmCaUPNsdfQELihym8-IttZSFNAWmnw")

    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [address, setAddress] = useState('')
    const [location, setLocation] = useState([0,0])
    const [image, setImage] = useState({});

    const nav = useNavigate();

    function setCoordinates(){
        Geocode.fromAddress(address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setLocation([lng, lat]);
            },
            (error) => {console.error(error)}
        );
    }

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
                image: image.src,
                reviews: [],
                ratings: [],
                has_ratings: false,
                has_reviews: false,
                location: location,
            })
        }).then(res => res.json())
        .then(customer => {
            setCurrentCustomer(customer);
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
            <h1>Create Your Profile</h1>
            <form className="form-class" onSubmit={(e)=>handleSubmit(e)}>
                <label className="form-label">
                    <input className="input-class" type="text" placeholder="Name..." onChange={(e)=>setName(e.target.value)}></input>
                </label>
                <label className="form-label">
                    <input className="input-class" type="text" placeholder="Say a few words about yourself..." onChange={(e)=>setBio(e.target.value)}></input>
                </label>
                <label className="form-label">
                    <input className="input-class" type="text" placeholder="Location..." onChange={(e)=>setAddress(e.target.value)}></input>
                </label>
                <Dropzone accept={"image"} setImage={setImage} image={image}/>
                <button className="submit-button" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateCustomer;