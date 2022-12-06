import Rating from 'react-rating'
import useCollapse from 'react-collapsed';

function ChefCard({chef, yourCoordinates}){

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    function handleClick(event){
        console.log("hire me")
    }

    return(
        <div>
            <div className="max-w-sm w-full lg:max-w-full lg:flex">
                {/* <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={`background-image: url(${chef.image})`} title={chef.name}>
                </div> */}
                <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                        <div className="text-gray-900 font-bold text-xl mb-2">
                            {chef.name}
                        </div>
                        {chef.avg_rating ? 
                        <div>
                            <Rating 
                                initialRating={chef.avg_rating}
                                emptySymbol="fa fa-star-o fa-2x"
                                fullSymbol="fa fa-star fa-2x"
                                readonly="true"
                            /> 
                            x {chef.ratings.length}
                        </div>
                        :
                        "They're new here, so they haven't received any feedback yet!"
                        }  
                        <p className="text-gray-700 text-base">{chef.bio}</p>
                        <p className="text-gray-700 text-base">Cuisines: {chef.cuisines.join(', ')}</p>
                        <div className="collapsible">
                            <div className="header" {...getToggleProps()}>
                                {isExpanded ? "Reviews:" : "Show Reviews"} 
                            </div>
                            <div {...getCollapseProps()}>
                                {chef.reviews}
                            </div>
                        </div>
                        <button className="submit-button" onClick={handleClick}>Hire this chef</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChefCard;