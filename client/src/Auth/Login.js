import React from 'react';
import {useState} from 'react'
import {useNavigate} from 'react-router-dom';


export default function Login({setCurrentUser, currentUser}) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const nav = useNavigate();    

    function handleLogin(e){
        e.preventDefault();
        const user = {
            username,
            password
        }
        fetch('/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        .then(res=> {
            if (res.ok){
                res.json().then(e=>setCurrentUser(e))
                window.location.reload(false);
            } else {
                res.json().then(e => console.log(Object.values(e)))
            }
        })
        nav('/')
    }

    return(
        <div className="form-container">
            <form className="form-class">
                <div className="mb-4">
                    <label className="form-label" for="username">
                        Username
                        <input 
                            className="input-class" 
                            type="text"
                            placeholder="Username" 
                            value={username} 
                            onChange={(e)=>setUsername(e.target.value)}
                        />
                    </label>
                    <label className="form-label" for="password">
                        Password
                        <input 
                            className="input-class" 
                            type="password" 
                            placeholder="******************"
                            value={password} 
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </label>
                    <div className="flex items-center justify-between">
                        <button 
                            className="submit-button focus:outline-none focus:shadow-outline"
                            type="submit" 
                            onClick={handleLogin}
                        >
                            Log In
                        </button>
                        <div class="inline-block align-baseline font-bold mt-5 text-sm text-blue-500 hover:text-blue-800" onClick={()=>alert("Maybe just make a new account.")}>
                            Forgot Password?
                        </div>
                    </div>
                </div>    
            </form>
        </div>
    )
}