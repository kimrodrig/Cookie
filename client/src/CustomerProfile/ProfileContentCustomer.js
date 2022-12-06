import {useState, useEffect} from 'react'
import Rating from 'react-rating'
import MapFn from '../AppForCustomers/MapFn';
import Preferences from '../Preferences/Preferences';

export default function ProfileContentCustomer({currentUser, currentCustomer, setCurrentUser}){

    const yourCoordinates = currentCustomer.location

    return (
        <div>
            <div>
                <div>
                    <div>
                        {currentCustomer.name}
                    </div>
                    {currentUser?.avg_rating ? 
                    <Rating 
                        initialRating={currentUser.avg_rating}
                        emptySymbol="fa fa-star-o fa-2x"
                        fullSymbol="fa fa-star fa-2x"
                        readonly="true"
                    /> :
                    "You're new here! You don't have any reviews yet."
                    }    
                    <div> {currentCustomer.avg_rating ? (currentCustomer.avg_rating, " stars") : ""}
                    </div>
                    <p>{currentCustomer.bio}</p>
                    <p>Location:</p>
                    {/* <MapFn yourCoordinates={yourCoordinates}/> */}
                    <p>{currentCustomer.reviews?.size ? ("Reviews: ", currentCustomer.reviews) : "This is where the reviews go. No reviews -- delete later"}</p>
                </div>
            </div>

            <Preferences 
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                currentCustomer={currentCustomer}
            />
        </div>
    )
}