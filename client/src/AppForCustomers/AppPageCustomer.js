import NavBarCustomer from "./NavBarCustomer"
import {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate} from "react-router-dom"
import Home from "../Home"
import ChefsPage from "./ChefsPage"
import EventContent from "../Events/EventContent"
import ProfileCustomer from "../CustomerProfile/ProfileCustomer"
import Logout from "../Logout"
import Preferences from "../Preferences/Preferences"
import CreateEvent from "../Events/CreateEvent";

export default function AppPageCustomer({currentUser, setCurrentUser, chefs}){

    const [currentCustomer, setCurrentCustomer] = useState({})
    const [chefForEvent, setChefForEvent] = useState({})
    const [rerender, setRerender] = useState(false)
    const location = useLocation();
    const nav = useNavigate();

    useEffect(() => {
        fetch(`/customers/${currentUser.customer_id}`)
        .then(res=>res.json()).then(customer => setCurrentCustomer(customer))
    },[rerender])

    if (currentUser.has_profile === false && location.pathname !== '/profile') {
        nav("/profile")
    } 
    
    return (
        <div>
            <NavBarCustomer/>
            <Routes>            
                <Route path = "/events" element = {<EventContent 
                    currentCustomer={currentCustomer}
                    chefForEvent={chefForEvent}
                    rerender={rerender}
                    setRerender={setRerender}
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
                    setChefForEvent={setChefForEvent}
                    chefs={chefs}
                    setRerender={setRerender}
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