import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import EventCard from './EventCard';
import PastEventCard from './PastEventCard';

export default function EventContent({currentCustomer, rerender, setRerender}){
    const [myEvents, setMyEvents] = useState([])
    const nav = useNavigate();

    useEffect(()=>{
        if (currentCustomer.events){
            setMyEvents(currentCustomer.events)
        }
    },[currentCustomer, rerender])

    const sortedEventsByDate = [...myEvents].sort((a,b)=>(Date.parse(a.datetime) - Date.parse(b.datetime)))
    const sortedPastEvents = []
    const sortedUpcomingEvents = []

    for (const event of sortedEventsByDate){
        if (Date.now()-Date.parse(event.datetime) > 0){
            sortedPastEvents.push(event)
        } else {
            sortedUpcomingEvents.push(event)
        }
    }

    return (
        <div>
            {/* upcoming events */}
            {(sortedUpcomingEvents.length === 0) ? 
            <div>
                <h2 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mt-10">
                    You don't have any scheduled events yet!
                </h2> 
                <button className="submit-button" onClick={() => nav('/events/create-event')}>Create one now</button>
            </div>
            :
            <div>
                <h2 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mt-10">
                        Upcoming Events
                    </h2>
                <div className="flex flex-wrap p-4 gap-4 justify-items-stretch">
                    
                    {sortedUpcomingEvents.map((event) => 
                        {return <EventCard 
                            event={event}
                            setRerender={setRerender}
                        />}
                    )}
                </div>  
            </div>         
            }
            {/* past events */}
            {(sortedPastEvents.length === 0) ? 
            <div>
                <h2 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mt-10">
                    You don't have any scheduled events yet!
                </h2> 
                <button className="submit-button" onClick={() => nav('/events/create-event')}>Create one now</button>
            </div>
            :
            <div>
                <h2 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mt-10">
                        Past Events
                </h2>
                <div className="flex flex-wrap p-4 gap-4 justify-items-stretch">
                    
                    {sortedPastEvents.map((event) => 
                        {return <PastEventCard 
                            event={event}
                            setRerender={setRerender}
                        />}
                    )}
                </div>  
            </div>            
            }
        </div>
    )
}