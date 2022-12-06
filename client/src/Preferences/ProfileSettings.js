import {React, useState} from 'react';
import useCollapse from 'react-collapsed';


export default function ProfileSettings({setCurrentProfile}){

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [address, setAddress] = useState('');
    const [whatToUpdate, setWhatToUpdate] = useState('');

    function update(e){
        e.preventDefault();
        fetch('/updatecustomer', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(whatToUpdate)
        })
        .then(res=> {
            if (res.ok){
                res.json().then(e=>setCurrentProfile(e))
                window.location.reload(false);
            } else {
                res.json().then(e => console.log(Object.values(e)))
            }
        })
    }



    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                Profile Settings
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    Update your profile below
                    <div className="form-container">
                        <form className="form-class">
                            <label className="form-label">
                                <input className="input-class" type="text" placeholder="New name..." onChange={(e)=>setName(e.target.value)}></input>
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
                            <label className="form-label">
                                <input className="input-class" type="text" placeholder="Tell us about yourself..." onChange={(e)=>setBio(e.target.value)}></input>
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
                            <label className="form-label">
                                <input className="input-class" type="text" placeholder="Location..." onChange={(e)=>setAddress(e.target.value)}></input>
                            </label>
                            <button className="submit-button" type="submit">Submit</button>

                        </form>
                            <div>
                                CHANGE ACCOUNT DEPENDING ON CURRENT ACCOUNT
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}