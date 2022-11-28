import {useState, useEffect} from 'react'

export default function ProfileContent({currentUser}){

    const [chef, setChef] = useState({})

    useEffect(() => {
        fetch(`/chefs/${currentUser.chef_id}`)
        .then(res=>res.json()).then(chef => setChef(chef))
    },[])

    console.log(chef)

    return (
        <div>
            <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div class="mb-8">
                        <div class="text-gray-900 font-bold text-xl mb-2">
                            {chef.name} -- {chef.avg_rating} stars
                        </div>
                        <p class="text-gray-700 text-base">{chef.bio}</p>
                        <p class="text-gray-700 text-base">Cuisines: {chef.bio}</p>
                        <p class="text-gray-700 text-base">Location: {chef.location}</p>
                        <p class="text-gray-700 text-base">Reviews: {chef.reviews}</p>
                    </div>
                </div>
        </div>
    )
}