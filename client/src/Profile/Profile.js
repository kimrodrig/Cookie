import CreateCustomer from '../CreateCustomer';
import CreateChef from './CreateChef';
import ProfileContentChef from './ProfileContentChef';
import CreateProfile from './CreateProfile';

import {useState} from 'react';

 
export default function Profile({currentUser, setCurrentUser}){

    return (
        <div>
            {currentUser.has_profile ? <ProfileContentChef currentUser={currentUser}/> : <CreateProfile currentUser={currentUser} setCurrentUser={setCurrentUser}/> }
        </div>
    )
}

