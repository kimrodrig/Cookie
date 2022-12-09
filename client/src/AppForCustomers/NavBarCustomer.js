import React from "react";
import { NavLink, useNavigate} from "react-router-dom";

function NavBarCustomer() {

    const nav = useNavigate();

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
        }).then(nav("/logout"))
    } 

    return (
        <div>
            <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
                <div class="container flex flex-wrap items-center justify-between mx-auto">
                    <div class="flex items-center" onClick={e=>(nav('/'))}>
                        <img src="https://cdn-icons-png.flaticon.com/512/7780/7780470.png" class="h-5 mr-3 sm:h-9" alt="Chef hat" />
                        <span class="self-center text-xl font-semibold whitespace-nowrap ">Cookie</span>
                    </div>
                    <div class="flex md:order-2">
                        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 " onClick={handleLogout}> 
                            Log out
                        </button>
                    </div>
                    <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                        <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white ">
                            <NavLink exact="true" to="/" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
                                Home
                            </NavLink>
                            <NavLink to="/events/create-event" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
                                Create an Event
                            </NavLink>
                            <NavLink to="/chefs" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
                                Chefs
                            </NavLink>
                            <NavLink to="/events" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
                                My Events
                            </NavLink>
                            <NavLink to="/profile" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
                                Profile
                            </NavLink> 
                            <NavLink to="/preferences" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
                                Preferences
                            </NavLink>                    
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBarCustomer;