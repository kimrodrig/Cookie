import NavBarCustomer from "./NavBarCustomer"
import {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../Home"
import ChefsPage from "./ChefsPage"
import EventPage from "../Events/EventPage"
import ProfileCustomer from "../CustomerProfile/ProfileCustomer"
import Logout from "../Logout"
import Preferences from "../Preferences/Preferences"
import CreateEvent from "../Events/CreateEvent";

export default function AppPageCustomer({currentUser, setCurrentUser, chefs}){

    const [currentCustomer, setCurrentCustomer] = useState({})
    const [chefForEvent, setChefForEvent] = useState({})

    useEffect(() => {
        fetch(`/customers/${currentUser.customer_id}`)
        .then(res=>res.json()).then(customer => setCurrentCustomer(customer))
    },[])

    return (
        <div>
            <NavBarCustomer/>
            <Routes>
                
                <Route path = "/events" element = {<EventPage 
                    currentCustomer={currentCustomer}
                    chefForEvent={chefForEvent}
                    />}/>
                <Route path = "/" element = {<Home currentUser={currentUser}/>}/>
                <Route path = "/chefs" element = {<ChefsPage 
                    chefs={chefs} 
                    currentUser={currentUser}
                    currentCustomer={currentCustomer}
                    setChefForEvent={setChefForEvent}
                    />}/>
                <Route path="/events/create-event" element = {<CreateEvent
                    currentCustomer={currentCustomer}
                    chefForEvent={chefForEvent}
                    />}/>
                <Route path = "/profile" element = {<ProfileCustomer 
                    currentUser={currentUser} 
                    setCurrentUser={setCurrentUser}
                    currentCustomer={currentCustomer}
                    setCurrentCustomer={setCurrentCustomer}
                    />}/>
                <Route path = "/preferences" element = {<Preferences
                    setCurrentUser={setCurrentUser}
                    currentUser={currentUser}
                    currentCustomer={currentCustomer}
                    setCurrentCustomer={setCurrentCustomer}
                    />}/>
                <Route path = "/logout" element = {<Logout/>}/>
            </Routes>
        </div>
    )
}