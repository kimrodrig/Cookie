import NavBarCustomer from "./NavBarCustomer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../Home"
import ChefsPage from "./ChefsPage"
import CreateEvent from "./CreateEvent"
import ProfileCustomer from "../CustomerProfile/ProfileCustomer"

export default function AppPageCustomer({currentUser, setCurrentUser, chefs}){
    return (
        <div>
                <NavBarCustomer/>
                <Routes>
                    <Route path = "/" element = {<Home currentUser={currentUser}/>}/>
                    <Route path = "/chefs" element = {<ChefsPage chefs={chefs}/>}/>
                    <Route path = "/create-event" element = {<CreateEvent/>}/>
                    <Route path = "/profile" element = {<ProfileCustomer currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
                </Routes>
        </div>
    )
}