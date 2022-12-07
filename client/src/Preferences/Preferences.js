import React from 'react';
import useCollapse from 'react-collapsed';
import AccountSettings from './AccountSettings'
import ProfileSettings from './ProfileSettings'

export default function Preferences({setCurrentUser, currentUser, currentCustomer, setCurrentCustomer}){

    
    return (

        <div className="content">
                        
            <AccountSettings 
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
            />

            <ProfileSettings
                currentCustomer={currentCustomer}
                setCurrentCustomer={setCurrentCustomer}
            />

        </div>
    )
}