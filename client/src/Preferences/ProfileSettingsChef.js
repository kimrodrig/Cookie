import {React, useEffect, useState} from 'react';
import Dropzone from '../Dropzone';
import Geocode from "react-geocode";

export default function ProfileSettings({currentCustomer, setCurrentCustomer, currentChef}){

    Geocode.setApiKey("AIzaSyAHlmCaUPNsdfQELihym8-IttZSFNAWmnw")

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState({});
    const [address, setAddress] = useState('')
    const [cuisines, setCuisines] = useState([])
    const [location, setLocation] = useState([0,0])
    const [buttonShouldBeDisabled, setButtonShouldBeDisabled] = useState(true)

    function setCoordinates(){
        Geocode.fromAddress(address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setLocation([lng, lat]);
            },
            (error) => {
                console.error(error)
                setLocation([0,0])
            }
        );
    }

    useEffect(()=>{
        setCoordinates();
    },[address])


    function determineWhatToPatch(){
        body["name"] = name;
        body["bio"] = bio;
        body["location"] = location;
        body["cuisines"] = cuisines;
        body["image"] = image.src
    }

    useEffect(() => {
        determineWhatToPatch();
        if (name === '' && bio === '' && !image && body["cuisines"][0] === undefined && body["cuisines"][0] === ""&& (location[0] === 0 && location[1] === 0)){
            setButtonShouldBeDisabled(true)
        } else {
            setButtonShouldBeDisabled(false)
        }
        if (body["name"] === ""){
            delete body["name"]
        } if (body["bio"] === ""){
            delete body["bio"]
        } if ((body["location"][0] === 0)&&(body["location"][1] === 0)){
            delete body["location"]
        } if ((body["cuisines"][0] === undefined) || (body["cuisines"][0] === "")){
            delete body["cuisines"]
        } if (body["image"] === undefined){
            delete body["image"]
        }
    }, [name, bio, image, location, cuisines])

    function update(e){
        e.preventDefault();
        console.log(body)
        console.log("clicked")
        fetch(`/chefs/${currentChef.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        .then(res=> {
            if (res.ok){
                res.json().then(e=>setCurrentCustomer(e))
                window.location.reload(false);
            } else {
                res.json().then(e => console.log(Object.values(e)))
            }
        })
    }

    function handleCuisines(e){
        const cuisinesString = e.target.value
        setCuisines(cuisinesString.split(','))
    }

    return (
        <div className="content">
            <div className="form-container">
                <h2 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mt-10">Edit your profile</h2>
                <form className="form-class">
                    <label className="form-label">
                        Change your display name
                        <input className="input-class" type="text" placeholder="Type in a new name..." onChange={(e)=>setName(e.target.value)}></input>
                    </label>
                    <label className="form-label">
                        Edit your intro to the community
                        <input className="input-class" type="text" placeholder="Type in a new introduction..." onChange={(e)=>setBio(e.target.value)}></input>
                    </label>
                    <label className="form-label">
                        Move somewhere else
                        <input className="input-class" type="text" placeholder="Type in an address..." onChange={(e)=>setAddress(e.target.value)}></input>
                    </label>
                    <label className="form-label">
                        Type in new cuisines
                        <input className="input-class" type="text" placeholder="Separate them by commas..." onChange={(e)=>handleCuisines(e.target.value)}></input>
                    </label>
                    <label className="form-label">
                        Upload a new photo
                        <Dropzone accept="image" setImage={setImage} image={image}/>
                    </label>
                    <div className="flex items-center justify-between">
                        <button 
                            disabled={buttonShouldBeDisabled}
                            className="submit-button"
                            type="submit" 
                            onClick={update}
                        >
                            Update 
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}