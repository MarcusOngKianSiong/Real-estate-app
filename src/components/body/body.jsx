import React from "react";
import {BrowserRouter as Router,Routes,Route,Redirect,Navigate} from 'react-router-dom';
import Home from '../pages/home';
import Buy from '../pages/buy';
import Sell from '../pages/sell';
import Register from '../pages/register';
import Login from '../pages/login';

export default function Body(variables){
    
    return(
        <div id="body">
            
                <Routes>
                    <Route path="/" element={<Home homePage={variables.homePage}/>}/>
                    <Route path="/buy" element={<Buy token={variables.token}/>}/>
                    <Route path="/sell" element={<Sell token={variables.token}/>} />
                    <Route path="/register" element={<Register token={variables.token} createSession={variables.createSession} removeSession={variables.removeSession}/>}/> 
                    <Route path="/login" element={<Login createSession={variables.createSession}/>}/>
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes>
            
        </div>
    )
}

