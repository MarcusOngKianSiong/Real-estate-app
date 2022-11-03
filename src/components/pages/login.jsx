import { ErrorResponse } from "@remix-run/router";
import { getAllByAltText } from "@testing-library/react";
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Login(variables){

    const navigate = useNavigate();     // To progammatically navigate through the money.const navigate = useNavigate();     // To progammatically navigate through the money.
    const [formData,setFormData] = useState({
        email: "",
        password: ""
    })
    const error = document.querySelector("#error");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const errorIndication = () => {
        email.style.border = "1px solid red";
        password.style.border = "1px solid red";
        error.textContent = "Login data error. Please try again."
    }

    const handleChange = (event)=>{
        const updatedFormData = {...formData}
        updatedFormData[event.target.name] = event.target.value;
        setFormData(updatedFormData)
        console.log(formData)
    }

    const createURLQuery = (data)=>{
        let query = '?';
        for (const dataName in data){
            query+=dataName+'='+data[dataName]+'&';
        }   
        return query.slice(0,query.length-1);
    }

    const handleLogin = () => {
        console.log("HANDLING LOGIN: ",formData)
        const query = createURLQuery(formData)
        fetch('http://13.215.50.32:8080/login'+query)
        .then(res=>{
            return res.json();
        })
        .then(res=>{
            if(!res.outcome){
                console.log(res)
                errorIndication();
            }
            if(res.outcome){
                console.log(res);
                variables.createSession(res.JWTToken)
                navigate('/')
            }
        })
    }

    return(
        <div>
            <label>
                email
                <input name="email" id="email" type="email" onChange={handleChange}/>
            </label>
            <label>
                Password
                <input name="password" id="password" type="password" onChange={handleChange}/>
            </label>
            <small id="error"></small>
            <input type="button" value="Login" onClick={handleLogin}/>
        </div>
    )
}