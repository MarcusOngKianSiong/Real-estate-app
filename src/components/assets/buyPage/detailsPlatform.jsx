import React from "react";
import { useNavigate } from "react-router-dom";

const createURLQuery = (data)=>{
    let query = '?';
    for (const dataName in data){
        query+=dataName+'='+data[dataName]+'&';
    }   
    return query.slice(0,query.length-1);
}

export default function DetailsPlatform(variables){
    console.log("INSIDE DETAILS PLATFORM: ",variables.data) 
    const navigate = useNavigate()
    const storeSell = () => {
        const data = variables.data;
        data["token"] = variables.token;
        const query = createURLQuery(data);
        fetch('http://13.215.50.32:8080/createbuyinterest'+query)
        .then(res=>{
            return res.json()
        })
        .then(res=>{
            if(res.outcome === "success"){
                navigate('/')
            }else{
                console.log("error")
            }
        })
    }
    
    return(
        <div>
            <p>Address: {variables.data.address}</p>
            <p>Price: {variables.data.price}</p>
            <p>Contact: {variables.data.contact}</p>
            <p>Comments: {variables.data.comments}</p>
            <input type="button" value="Indicate Purchase Intent" onClick={storeSell}/>
        </div>
    )
}