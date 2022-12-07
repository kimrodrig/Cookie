import CreateEvent from './CreateEvent';
import EventContent from './EventContent';
import useLocation from 'react'
//further routes here?

export default function EventPage({currentCustomer, chefForEvent}){
    
    return (
        <div>
            <EventContent currentCustomer={currentCustomer}/> 
        </div>

    )
}