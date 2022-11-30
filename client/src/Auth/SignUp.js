import React from 'react';
import {useState} from 'react'
import {useNavigate} from 'react-router-dom';

export default function SignUp({setCurrentUser}) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [accountType, setAccountType] = useState('chef')
    const [errors, setErrors] = useState([])

    const nav = useNavigate();

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
        nav("/profile")
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
                    <div className="mt-5">
                        I am
                        <select onChange={(e)=>setAccountType(e.target.value)}>
                            <option value="chef">a chef</option>
                            <option value="customer">looking for chefs</option>
                        </select>
                    </div>
                    <div>
                        <button 
                            className="submit-button focus:outline-none focus:shadow-outline"
                            type="submit"onClick={handleSignup}>Sign Up</button>
                    </div>
                </div>
            </form>
        </div>

    )
}