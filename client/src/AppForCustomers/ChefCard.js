import Rating from 'react-rating'
import useCollapse from 'react-collapsed';
import { useNavigate } from 'react-router-dom';

function ChefCard({chef, yourCoordinates, setChefForEvent, deactivateClick, setSelectedChefId}){

    const nav = useNavigate();
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    
    function hireClick(event){
        event.preventDefault();
        setChefForEvent(chef)
        nav("/events/create-event")
    }


    function cardClick(event) {
        event.preventDefault();
        if (deactivateClick===false) {
            setSelectedChefId(chef.id)
        } 
    }
    

    return(
        <div onClick={cardClick}>
            <div className="h-full min-w-0 break-words bg-white w-full mb-6 pb-7 shadow-xl rounded-lg mt-20 pt-5">
                <div className="">
                    <div className="mb-8">

                        <div class="flex flex-wrap justify-center">
                            <div class="w-24 h-24 flex justify-center">
                                {chef?.image ?
                                <img 
                                    className="object-cover shadow-xl rounded-full" 
                                    src={chef.image}
                                    alt={chef.name}
                                />:
                                "No image yet! But we assure you this chef exists."
                                }
                                
                            </div>
                        </div>
                    
                        <div className="text-center mt-6 mb-4">

                            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
                                {chef.name}
                            </h3>
                        </div>

                        {chef.avg_rating ? 
                        <div className="mb-4">
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
                        
                        <div className="mt-10 py-4 border-t border-blueGray-200 text-center">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-9/12 px-4">
                                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700" >
                                        {chef.bio}
                                    </p>
                                </div>
                                <p className="text-gray-700 text-base">Cuisines: {chef.cuisines.join(', ')}</p>
                            </div>
                        </div>
                    
                        <div className="collapsible">
                            <div className="text-sky-700 mb-3 italic" {...getToggleProps()}>
                                {isExpanded ? "Hide Reviews" : "Show Reviews"} 
                            </div>
                            <div {...getCollapseProps()}>
                                {chef.reviews.map((review)=>{
                                    return (
                                    <div className="mt-2 mb-2">{review}</div>)
                                })}
                            </div>
                        </div>
                        <button className="submit-button" onClick={hireClick}>Hire this chef</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChefCard;