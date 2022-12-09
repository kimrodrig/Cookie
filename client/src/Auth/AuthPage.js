import Login from './Login'
import SignUp from './SignUp'
import Home from '../Home'
import {Routes, Route, NavLink} from 'react-router-dom'

export default function AuthPage({setCurrentUser, currentUser}) {

    return (
        <div> 
            <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded ">
                <div class="container flex flex-wrap items-center justify-between mx-auto">
                    <div class="flex items-center">
                        <img src="https://cdn-icons-png.flaticon.com/512/7780/7780470.png" class="h-5 mr-3 sm:h-9" alt="Chef hat" />
                        <span class="self-center text-xl font-semibold whitespace-nowrap ">Cookie</span>
                    </div>
                    
                </div>
            </nav>
            <div className="mb-3 mt-3">
                <button type="button" className="submit-button mr-3"> 
                        <NavLink to="/login">Sign in</NavLink>
                </button>
                <button type="button" className="submit-button ml-3"> 
                        <NavLink to="/signup" >Sign up</NavLink>
                </button>
            </div>

            <Routes>
                <Route path="/login" element={<Login setCurrentUser={setCurrentUser} currentUser={currentUser}/>} />
                <Route path="/signup" element={<SignUp  setCurrentUser={setCurrentUser}/>} />
            </Routes>

            <Home />
        </div>
    )
}