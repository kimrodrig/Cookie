import React from 'react';
import useCollapse from 'react-collapsed';
import AccountSettings from './AccountSettings'
import ProfileSettings from './ProfileSettings'

export default function Preferences({setCurrentUser, currentUser, currentCustomer}){

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    
    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                Preferences
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    
                    <AccountSettings 
                        setCurrentUser={setCurrentUser}
                        currentUser={currentUser}
                    />

                    <ProfileSettings/>

                </div>
            </div>
        </div>
    )
}