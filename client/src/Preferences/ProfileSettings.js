import {React, useEffect, useState} from 'react';
import useCollapse from 'react-collapsed';
import Dropzone from '../Dropzone';
import Geocode from "react-geocode";

export default function ProfileSettings({currentCustomer, setCurrentCustomer}){

    Geocode.setApiKey("AIzaSyAHlmCaUPNsdfQELihym8-IttZSFNAWmnw")

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState({});

    const [address, setAddress] = useState('')
    const [location, setLocation] = useState([0,0])


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

    console.log(location)

    function determineWhatToPatch(){
        const whatToPatch = {};
        if (name !== ''){
            body["name"] = name
        } if (bio !== ''){
            body["bio"] = bio
        } if (location !== ''){
            body["location"] = location
        } if (image !== ''){
            body["image"] = image.src
        } setBody(body)
    }

    console.log(body)
    useEffect(() => {
        determineWhatToPatch();
    }, [name, bio, image, location])

    function update(e){
        e.preventDefault();
        console.log("clicked")
        fetch(`/customers/${currentCustomer.id}`, {
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
                        Edit your introduction to the community
                        <input className="input-class" type="text" placeholder="Type in a new introduction..." onChange={(e)=>setBio(e.target.value)}></input>
                    </label>
                    <label className="form-label">
                        Move somewhere else
                        <input className="input-class" type="text" placeholder="Type in an address..." onChange={(e)=>setAddress(e.target.value)}></input>
                    </label>
                    <label className="form-label">
                        Upload a new photo
                        <Dropzone accept="image" setImage={setImage} image={image}/>
                    </label>
                    <div className="flex items-center justify-between">
                        <button 
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