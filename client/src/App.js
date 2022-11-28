import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import CreateEvent from './CreateEvent';
import ChefsPage from './ChefsPage';
import Home from './Home';
import Profile from './Profile/Profile';
import NavBar from './NavBar';
import SignUp from './Auth/SignUp'
import Login from './Auth/Login'
import Logout from './Auth/Logout'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {

  const [currentUser, setCurrentUser] = useState('')
  const [errors, setErrors] = useState([])
  const [chefs, setChefs] = useState([])
  const [customers, setCustomers] = useState([])
  const [events, setEvents] = useState([])


  useEffect(()=>{
    fetch('/chefs/')
    .then(res => res.json())
    .then(data => setChefs(data))
  },[]);

  useEffect(()=>{
    fetch('/customers/')
    .then(res => res.json())
    .then(data => setCustomers(data))
  },[]);
 
  useEffect(()=>{
    fetch('/events/')
    .then(res => res.json())
    .then(data => setEvents(data))
  },[]);

  useEffect(() => {
    fetch('/auth/')
    .then(res => {
      if (res.ok){
        res.json().then(user => setCurrentUser(user))
      } 
    })
  }, []);

  console.log("Current user id:", currentUser.id)
  console.log("Current user type:", currentUser.account_type)
  console.log("Does current user have a profile?", currentUser.has_profile)

  function appRoutes(){
    return (
      <Routes>
        {/* {goToLogin()}         */}
          <Route path = "/" element = {<Home setCurrentUser={setCurrentUser}/>}/>
          <Route path = "/chefs" element = {<ChefsPage chefs={chefs}/>}/>
          <Route path = "/create-event" element = {<CreateEvent/>}/>
          <Route path = "/profile" element = {<Profile/>}/>
        </Routes>
    )
  }

  return (
    <div className="App">
        <BrowserRouter>
          <NavBar/>
          <Routes>
          {/* {goToLogin()}         */}
            <Route path = "/signup" element = {<SignUp setCurrentUser={setCurrentUser}/>}/>
            <Route path = "/login" element = {<Login setCurrentUser={setCurrentUser}/>}/>
            <Route path = "/logout" element = {<Logout currentUser={currentUser}/>}/>
            <Route path = "/" element = {<Home currentUser={currentUser}/>}/>
            <Route path = "/chefs" element = {<ChefsPage chefs={chefs}/>}/>
            <Route path = "/create-event" element = {<CreateEvent/>}/>
            <Route path = "/profile" element = {<Profile currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
