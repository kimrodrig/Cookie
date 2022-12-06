import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import CreateEvent from './Events/CreateEvent';
import ChefsPage from './AppForCustomers/ChefsPage';
import Home from './Home';
import Profile from './ChefProfile/ProfileChef';
import NavBar from './AppForChefs/NavBarChef';
import SignUp from './Auth/SignUp'
import Login from './Auth/Login'
import AuthPage from './Auth/AuthPage';
import AppPageChef from './AppForChefs/AppPageChef';
import AppPageCustomer from './AppForCustomers/AppPageCustomer';
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
  },[currentUser?.has_profile]);

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
  }, [currentUser?.has_profile]);

  console.log(currentUser);

  function whichAppToShow(){
    return (
      (currentUser?.account_type === "chef") ? 
      <AppPageChef setCurrentUser={setCurrentUser} currentUser={currentUser} chefs={chefs}/> : 
      <AppPageCustomer setCurrentUser={setCurrentUser} currentUser={currentUser} chefs={chefs} customers={customers}/> 
    )
  }
  
  return (
    <div className="App">
      <BrowserRouter>
        {currentUser 
        ? 
        whichAppToShow()
        : 
        <AuthPage setCurrentUser={setCurrentUser} currentUser={currentUser}/>
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
