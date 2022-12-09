import {useNavigate} from 'react-router-dom'
import Rating from 'react-rating'
import ProfileMap from '../ProfileMap';

export default function ProfileContentCustomer({currentUser, currentCustomer}){

    const yourCoordinates = currentCustomer.location

    return (
        <div class="w-full lg:w-8/12 px-4 mx-auto">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 pb-7 shadow-xl rounded-lg mt-20 pt-5">
                <div class="px-2">
                    <div class="flex flex-wrap justify-center">
                        <div class="w-48 h-48 flex justify-center">
                            {currentCustomer?.image ?
                            <img 
                                className="object-cover shadow-xl rounded-full" 
                                src={currentCustomer.image}
                                alt={currentCustomer.name}
                            />:
                            "Upload an image in profile settings!"
                            }
                            
                        </div>
                    </div>
                    <div className="text-center mt-12">
                        <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
                            {currentCustomer.name}
                        </h3>
                        {currentCustomer?.avg_rating ? 
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
                        <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-9/12 px-4 mb-3">
                                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700" >
                                        {currentCustomer.bio}
                                    </p>
                                </div>
                                <div className="p-4 rounded-lg shadow-lg bg-white max-w-sm">
                                    <ProfileMap yourCoordinates={yourCoordinates}/>
                                </div>
                            </div>
                        </div>
                        <p>{currentCustomer.reviews?.size ? ("Reviews: ", currentCustomer.reviews) : ""}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}