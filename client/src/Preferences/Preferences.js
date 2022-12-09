import React from 'react';
import AccountSettings from './AccountSettings'
import ProfileSettings from './ProfileSettings'
import ProfileSettingsChef from './ProfileSettingsChef'

export default function Preferences({setCurrentUser, currentUser, currentCustomer, setCurrentCustomer, currentChef, isChef}){

    console.log(currentChef)
    return (

        <div className="content">
            <div class="accordion" id="accordionExample">
                <div class="accordion-item bg-white border border-gray-200">
                    <h2 class="accordion-header mb-0" id="headingOne">
                    <button class="
                        accordion-button
                        relative
                        flex
                        items-center
                        w-full
                        py-4
                        px-5
                        text-base text-gray-800 text-left
                        bg-white
                        border-0
                        rounded-none
                        transition
                        focus:outline-none
                    " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true"
                        aria-controls="collapseOne">
                        Profile Settings
                    </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample">
                        {isChef ?
                        <ProfileSettingsChef
                            currentCustomer={currentCustomer}
                            setCurrentCustomer={setCurrentCustomer}  
                            currentChef={currentChef}                
                        />:
                        <ProfileSettings
                            currentCustomer={currentCustomer}
                            setCurrentCustomer={setCurrentCustomer}                  
                        />
                        }
                    </div>
                </div>
                <div class="accordion-item bg-white border border-gray-200">
                    <h2 class="accordion-header mb-0" id="headingTwo">
                    <button class="
                        accordion-button
                        collapsed
                        relative
                        flex
                        items-center
                        w-full
                        py-4
                        px-5
                        text-base text-gray-800 text-left
                        bg-white
                        border-0
                        rounded-none
                        transition
                        focus:outline-none
                    " type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false"
                        aria-controls="collapseTwo">
                        Account Settings
                    </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample">                    
                        
                        <AccountSettings 
                            setCurrentUser={setCurrentUser}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}