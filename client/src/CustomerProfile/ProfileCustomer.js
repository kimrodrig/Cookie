import CreateCustomer from '../CustomerProfile/CreateCustomer';
import ProfileContentCustomer from './ProfileContentCustomer';


export default function ProfileCustomer({currentUser, setCurrentUser, currentCustomer, setCurrentCustomer}){

    return (
        <div>
            {currentUser?.has_profile ? 
            <ProfileContentCustomer 
                currentUser={currentUser} 
                currentCustomer={currentCustomer}
                setCurrentUser={setCurrentUser}
                setCurrentCustomer={setCurrentCustomer}
            /> : 
            <CreateCustomer 
                currentUser={currentUser} 
                setCurrentUser={setCurrentUser}
                setCurrentCustomer={setCurrentCustomer}
            /> }
        </div>
    )
}

