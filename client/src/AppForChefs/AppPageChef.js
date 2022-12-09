import NavBarChef from "./NavBarChef"
import {useState, useEffect} from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import Home from "../Home"
import ProfileChef from "../ChefProfile/ProfileChef"
import Logout from "../Logout"
import Preferences from "../Preferences/Preferences"
import EventContentForChef from "../Events/EventContentForChef"

export default function AppPageChef({currentUser, setCurrentUser}){

    const [currentChef, setCurrentChef] = useState({})
    const [rerender, setRerender] = useState(false)
    const location = useLocation();
    const nav = useNavigate();

    useEffect(() => {
        fetch(`/chefs/${currentUser.chef_id}`)
        .then(res=>res.json()).then(chef => {
            if (chef !== null){
                setCurrentChef(chef)
            } 
        })
    },[rerender])

    if (currentUser.has_profile === false && location.pathname !== '/profile') {
        nav("/profile")
    } 

    return (
        <div>
            <NavBarChef/>
                <Routes>            
                    <Route path = "/" element = {<Home currentUser={currentUser}/>}/>
                    <Route path = "/events" element = {<EventContentForChef 
                        currentChef={currentChef}
                        rerender={rerender}
                        setRerender={setRerender}
                        />}/>
                    <Route path = "/profile" element = {<ProfileChef 
                        currentUser={currentUser} 
                        setCurrentUser={setCurrentUser}
                        currentChef={currentChef}
                        setCurrentChef={setCurrentChef}
                        />}/>
                    <Route path = "/preferences" element = {<Preferences
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}
                        currentChef={currentChef}
                        setCurrentChef={setCurrentChef}
                        isChef={true}
                        />}/>
                    <Route path = "/logout" element = {<Logout/>}/>
                </Routes>
        </div>
    )
}