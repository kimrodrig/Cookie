import CreateEvent from './CreateEvent';
import EventContent from './EventContent';
//further routes here?

export default function EventPage({currentProfile}){
    
    return (
        <div>
            <CreateEvent/>
            <EventContent currentProfile={currentProfile}/> 
        </div>

    )
}