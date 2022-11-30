import CreateCustomer from '../CustomerProfile/CreateCustomer';
import ProfileContentCustomer from './ProfileContentCustomer';
import {useEffect} from 'react'

import {useState} from 'react';

 
export default function ProfileCustomer({currentUser, setCurrentUser}){

    // const [hasProfile, setHasProfile] = useState(false)

    // useEffect(() => {
    //     setHasProfile(currentUser?.has_profile)
    // }, [currentUser]);

    console.log(currentUser)

    return (
        <div>
            {currentUser?.has_profile ? <ProfileContentCustomer currentUser={currentUser}/> : <CreateCustomer currentUser={currentUser} setCurrentUser={setCurrentUser}/> }
        </div>
    )
}

