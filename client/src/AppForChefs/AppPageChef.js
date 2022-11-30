import NavBarChef from "./NavBarChef"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../Home"
import ProfileChef from "../ChefProfile/ProfileChef"

export default function AppPageChef({currentUser, setCurrentUser}){
    return (
        <div>
                <NavBarChef/>
                <Routes>
                    <Route path = "/" element = {<Home currentUser={currentUser}/>}/>
                    <Route path = "/profile" element = {<ProfileChef currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
                </Routes>
        </div>
    )
}