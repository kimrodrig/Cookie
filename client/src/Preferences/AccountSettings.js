import  {useState, React} from 'react';
import useCollapse from 'react-collapsed';

export default function AccountSettings({currentUser, setCurrentUser}){

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
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



    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                Account Settings
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    <div className="form-container">
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

                            <div>
                                CHANGE ACCOUNT DEPENDING ON CURRENT ACCOUNT
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}