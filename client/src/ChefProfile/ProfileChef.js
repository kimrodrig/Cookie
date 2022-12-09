import CreateChef from '../ChefProfile/CreateChef';
import ProfileContentChef from './ProfileContentChef';


export default function ProfileChef({currentUser, setCurrentUser, currentChef, setCurrentChef}){

    return (
        <div>
            {currentUser?.has_profile ? 
            <ProfileContentChef 
                currentUser={currentUser} 
                currentChef={currentChef}
                setCurrentUser={setCurrentUser}
                setCurrentChef={setCurrentChef}
            /> : 
            <CreateChef
                currentUser={currentUser} 
                setCurrentUser={setCurrentUser}
                setCurrentChef={setCurrentChef}
            /> }
        </div>
    )
}


