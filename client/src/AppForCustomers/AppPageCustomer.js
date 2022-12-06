import NavBarCustomer from "./NavBarCustomer"
import {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../Home"
import ChefsPage from "./ChefsPage"
import EventPage from "../Events/EventPage"
import ProfileCustomer from "../CustomerProfile/ProfileCustomer"
import Logout from "../Logout"

export default function AppPageCustomer({currentUser, setCurrentUser, chefs}){

    const [currentCustomer, setCurrentCustomer] = useState({})

    useEffect(() => {
        fetch(`/customers/${currentUser.customer_id}`)
        .then(res=>res.json()).then(customer => setCurrentCustomer(customer))
    },[])

    console.log(currentCustomer)

    return (
        <div>
            <NavBarCustomer/>
            <Routes>
                <Route path = "/" element = {<Home currentUser={currentUser}/>}/>
                <Route path = "/chefs" element = {<ChefsPage 
                    chefs={chefs} 
                    currentUser={currentUser}
                    currentCustomer={currentCustomer}
                    />}/>
                <Route path = "/events" element = {<EventPage currentProfile={currentCustomer}/>}/>
                <Route path = "/profile" element = {<ProfileCustomer 
                    currentUser={currentUser} 
                    setCurrentUser={setCurrentUser}
                    currentCustomer={currentCustomer}
                    setCurrentCustomer={setCurrentCustomer}
                    />}/>
                <Route path = "/logout" element = {<Logout/>}/>
            </Routes>
        </div>
    )
}