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
        <form>
            <label>
                Username
                <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            </label>
            <label>
                Password
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </label>
            <div>
                <button type="submit" onClick={handleLogin}>Log In</button>
            </div>
        </form>
    )
}