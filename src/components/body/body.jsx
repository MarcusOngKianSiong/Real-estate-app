import React from "react";
import {BrowserRouter as Router,Routes,Route,Redirect,Navigate} from 'react-router-dom';
import Home from '../pages/home';
import Buy from '../pages/buy';
import Sell from '../pages/sell';
import Register from '../pages/register';
import Login from '../pages/login';


export default function Body(){
    return(
        <div id="body">
            
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/buy" element={<Buy/>}/>
                    <Route path="/sell" element={<Sell/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes>
            
        </div>
    )
}

