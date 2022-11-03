import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route,Link,Navigate} from 'react-router-dom'
import Header from './components/header/header';
import Body from './components/body/body';
import Footer from './components/footer/footer';
import React,{useState,useEffect} from "react";
import LoggedInHomePage from './components/pages/versions/home/logged_in'
import NotLoggedInHomePage from './components/pages/versions/home/not_logged_in';

function App() {
  
  const [token,setToken] = useState(sessionStorage.getItem("token"))
  const [homePage,setHomePage] = useState(<NotLoggedInHomePage/>)
  const [header,setHeader] = useState([<Link to="/login">Login</Link>,<Link to="/register">Register</Link>])

  const createSession = (token) => {
    sessionStorage.setItem("token",token);
    setToken(sessionStorage.getItem("token"));
    console.log("set session: ", token); 
  }

  const removeSession = () => {
    sessionStorage.setItem("token",null);
    console.log("Checking session storage: ",sessionStorage.getItem("token"));
    setToken(null);
    console.log("remove session: ",token); // POSSIBLE CAUSE: Token is still not converted to null
  }

  const switchHomePage = () =>{
    if(token !== null){
      setHomePage(<LoggedInHomePage token={token}/>)
    }
    if(token === null){
      setHomePage(<NotLoggedInHomePage/>)
    }
  }

  // How did it become null if I have not logged out before? 
  const handleLogOut = () => {
    // *** The if else statement is meant to process the scenario where the user is not logged out even when the token is null.
    if(token===null){
      setToken = null;
    }else{
      fetch(`http://localhost:8080/logout?token=${token}`,{
        method: 'delete',
        // headers: {'authorization': token}
      })
      .then(res=>{
        return res.json()  
      })
      .then(res=>{
        console.log("Checking message sent from back-end to front-end: ", res)
        if(res.closingSessionStatus === true){
          console.log("Session closed. Logging out....")
          removeSession()
        }else{
          console.log("Session not closed. Error....")
        }
      })
    }
  }

  const changeLoginAndRegister = () => {
    if(token !== null){
      setHeader([<Link to="/" onClick={handleLogOut}>Log Out</Link>])
    }
    if(token === null){
      setHeader([<Link to="/login">Login</Link>,<Link to="/register">Register</Link>])
    }
  }
  
  useEffect(()=>{ 
    // Switch if token changes
    console.log("CHANGING STATES!!!! -> UseEffect taking place.....")
    switchHomePage()
    changeLoginAndRegister()
    console.log("checking token: ",token)
  },[token])
  
  return (
    <div className="App">
      <Header loginAndRegister={header}/>
      <Body token={token} homePage={homePage} createSession={createSession} removeSession={removeSession}/>
      <Footer/>
    </div>
  );
}

export default App;
