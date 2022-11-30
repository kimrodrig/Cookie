import Login from './Login'
import SignUp from './SignUp'
import {Routes, Route, NavLink} from 'react-router-dom'

export default function AuthPage({setCurrentUser, currentUser}) {

    

    return (
        <div>
            <nav className="nav-class">
                <div className="flex md:flex md:flex-grow flex-row justify-end px-8 space-x-6">
                    <NavLink to="/login" className="nav-link-button">Sign in</NavLink>
                    <NavLink to="/signup" className="nav-link-button">Sign up</NavLink>
                </div>
            </nav>
            
            <Routes>
                <Route path="/login" element={<Login setCurrentUser={setCurrentUser} currentUser={currentUser}/>} />
                <Route path="/signup" element={<SignUp  setCurrentUser={setCurrentUser}/>} />
            </Routes>
        </div>
    )
}