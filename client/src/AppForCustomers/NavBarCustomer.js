import React from "react";
import { NavLink} from "react-router-dom";

function NavBarCustomer() {


    function handleLogout(){
        fetch('/logout', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        })
        .then(res=>{
            if (res.ok) {
                console.log("Successfully logged out")
                window.location.reload(false);
            }
            else {console.log("not ok")}
        })
    } 

    return (
        <div>
            <nav className="nav-class">
                <div className="nav-container">
                    <NavLink exact="true" to="/" className="nav-link-button">
                        Home
                    </NavLink>
                    <NavLink to="/chefs" className="nav-link-button">
                        Chefs
                    </NavLink>
                    <NavLink to="/create-event" className="nav-link-button">
                        Create Event
                    </NavLink>
                    <NavLink to="/profile" className="nav-link-button">
                        Profile
                    </NavLink> 
                    <NavLink to="/logout" className="nav-link-button" onClick={handleLogout}>
                        Logout
                    </NavLink>
                </div>
            </nav>
        </div>
    )
}

export default NavBarCustomer;