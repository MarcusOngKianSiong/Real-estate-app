import React from "react";
import {BrowserRouter as Router,Routes,Route,Link,Navigate} from 'react-router-dom'
import Home from '../pages/home';
import Buy from '../pages/buy';
import Sell from '../pages/sell';
import Register from '../pages/register';
import Login from '../pages/login';

export default function Header(){
    return(
        <div id="header">
                    <Link to="/">Home</Link>
                    <Link to="/buy">Buy</Link>
                    <Link to="/sell">Sell</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
        </div>
    )
}