import CreateCustomer from '../CustomerProfile/CreateCustomer';
import ProfileContentCustomer from './ProfileContentCustomer';

 
export default function ProfileCustomer({currentUser, setCurrentUser}){

    return (
        <div>
            {currentUser?.has_profile ? 
            <ProfileContentCustomer currentUser={currentUser}/> : 
            <CreateCustomer currentUser={currentUser} setCurrentUser={setCurrentUser}/> }
        </div>
    )
}

