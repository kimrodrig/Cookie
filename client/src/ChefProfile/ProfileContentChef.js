import {useState, useEffect} from 'react'
import Rating from 'react-rating'


export default function ProfileContentChef({currentUser}){

    const [chef, setChef] = useState({})

    useEffect(() => {
        fetch(`/chefs/${currentUser.chef_id}`)
        .then(res=>res.json()).then(chef => setChef(chef))
    },[])

    return (
        <div>
            <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div class="mb-8">
                    <div class="text-gray-900 font-bold text-xl mb-2">
                        {chef.name}
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
                    <div> {chef.avg_rating ? (chef.avg_rating, " stars") : ""}
                    </div>
                    <p class="text-gray-700 text-base">{chef.bio}</p>
                    <p class="text-gray-700 text-base">Cuisines: {chef.cuisines}</p>
                    <p class="text-gray-700 text-base">Location: {chef.location}</p>
                    <p class="text-gray-700 text-base">{chef.reviews?.size ? ("Reviews: ", chef.reviews) : "This is where the reviews go. No reviews -- delete later"}</p>
                </div>
            </div>
        </div>
    )
}