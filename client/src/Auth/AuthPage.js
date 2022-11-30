import Login from './Login'
import SignUp from './SignUp'
import {Routes, Route, NavLink} from 'react-router-dom'

export default function AuthPage({setCurrentUser, currentUser}) {

    

    return (
        <div>
            <NavLink to="/login">LOGIN</NavLink>
            <NavLink to="/signup">SIGNUP</NavLink>

            <Routes>
                <Route path="/login" element={<Login setCurrentUser={setCurrentUser} currentUser={currentUser}/>} />
                <Route path="/signup" element={<SignUp  setCurrentUser={setCurrentUser}/>} />
            </Routes>
        </div>
    )
}