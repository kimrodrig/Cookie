import CreateChef from './CreateChef';
import ProfileContentChef from './ProfileContentChef';
import {useEffect, useState} from 'react'
 
export default function ProfileChef({currentUser, setCurrentUser}){

    const [hasProfile, setHasProfile] = useState(false)

    useEffect(() => {
        setHasProfile(currentUser?.has_profile)
    }, []);

    console.log(currentUser)

    return (
        <div>
            {hasProfile ? <ProfileContentChef currentUser={currentUser}/> : <CreateChef currentUser={currentUser} setCurrentUser={setCurrentUser}/> }
        </div>
    )
}

