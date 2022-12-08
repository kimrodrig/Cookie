import  {useState, React, useEffect} from 'react';
import useCollapse from 'react-collapsed';

export default function AccountSettings({currentUser, setCurrentUser}){

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameButtonShouldBeDisabled, setUsernameButtonShouldBeDisabled] = useState(true)
    const [passwordButtonShouldBeDisabled, setPasswordButtonShouldBeDisabled] = useState(true)

    let whatToUpdate = '';

    function update(){
        console.log({whatToUpdate: whatToUpdate})
        fetch(`/users/${currentUser.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({whatToUpdate: whatToUpdate})
        })
        .then(res=> {
            if (res.ok){
                res.json().then(e=>setCurrentUser(e))
                window.location.reload(false);
            } else {
                res.json().then(e => console.log(Object.values(e)))
            }
        })
    }

    useEffect(()=>{
        if (username===""){setUsernameButtonShouldBeDisabled(true)} else setUsernameButtonShouldBeDisabled(false);
        if (password===""){setPasswordButtonShouldBeDisabled(true)} else setPasswordButtonShouldBeDisabled(false);
    }, [username, password])


    return (
        <div className="content">
            <div className="form-container">
                <h2 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mt-10">Change your username or password</h2>
                <form className="form-class"> 
                    <label className="form-label" for="username">
                    Username
                        <input 
                            className="input-class" 
                            type="text"
                            placeholder="New Username..." 
                            value={username} 
                            onChange={(e)=>setUsername(e.target.value)}
                        />
                    </label>
                    <div className="flex items-center justify-between">
                        <button 
                            disabled={usernameButtonShouldBeDisabled}
                            className="submit-button"
                            type="submit" 
                            onClick={
                                (e) => {
                                    e.preventDefault()
                                    whatToUpdate = username;
                                    update()
                            }}
                        >
                            Change Username
                        </button>
                    </div>
                    <label className="form-label" for="password">
                        Password
                        <input 
                            className="input-class" 
                            type="password" 
                            placeholder="New Password..." 
                            value={password} 
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </label>
                    <div className="flex items-center justify-between">
                        <button 
                            disabled={passwordButtonShouldBeDisabled}
                            className="submit-button"
                            type="submit" 
                            onClick={(e) => {
                                    e.preventDefault()
                                    whatToUpdate = username;
                                    update()
                            }}
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}