import React from 'react';
import {useState} from 'react'

export default function SignUp({setCurrentUser}) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [accountType, setAccountType] = useState('')
    const [errors, setErrors] = useState([])

    function handleSignup(e){
        e.preventDefault();
        const user = {
            username,
            password,
            account_type: accountType,
            has_profile: false,
            chef_id: 0,
            customer_id: 0
        }
        fetch('/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        .then(res => {
            if (res.ok){
                res.json().then(setCurrentUser)
            } else {
                res.json().then(e => console.log(e))
            }
        })
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
            <select onChange={(e)=>setAccountType(e.target.value)}>
                <option value="customer">I am:</option>
                <option value="chef">a chef</option>
                <option value="customer">looking for chefs</option>
            </select>
            <div>
                <button type="submit" onClick={handleSignup}>Sign Up</button>
            </div>
        </form>
    )
}