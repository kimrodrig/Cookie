import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import EventCard from './EventCard';

export default function EventContent({currentCustomer, rerender, setRerender}){
    const [myEvents, setMyEvents] = useState([])
    const nav = useNavigate();

    useEffect(()=>{
        if (currentCustomer.events){
            setMyEvents(currentCustomer.events)
        }
    },[currentCustomer, rerender])

    const sortedEventsByDate = [...myEvents].sort((a,b)=>(Date.parse(a.datetime) - Date.parse(b.datetime)))

    return (
        <div>
            {(myEvents.length === 0) ? 
            <div>
                <h2 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mt-10">
                    You don't have any scheduled events yet!
                </h2> 
                <button className="submit-button" onClick={() => nav('/events/create-event')}>Create one now</button>
            </div>
            :
            <div className="flex flex-cols p-4 gap-4 justify-items-stretch">
                {sortedEventsByDate.map((event) => 
                    {return <EventCard 
                        event={event}
                        setRerender={setRerender}
                    />}
                )}
            </div>           
            }
        </div>
    )
}