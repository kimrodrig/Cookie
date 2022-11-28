
function ChefCard({chef}){

    return(
        <div>
            <div class="max-w-sm w-full lg:max-w-full lg:flex">
                {/* <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={`background-image: url(${chef.image})`} title={chef.name}>
                </div> */}
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
        </div>
    )
}

export default ChefCard;