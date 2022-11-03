
import React from "react";
import Map from '../assets/map'
import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { keyboardImplementationWrapper } from "@testing-library/user-event/dist/keyboard";
import { Path } from "leaflet";

import AddressAndCoordinates from "./versions/sell/addressAndCoordinates";
import PropertyDetails from "./versions/sell/propertyDetails";
import DisplayCoordinates from "../assets/displayCoordinates";
import { getAllByAltText } from "@testing-library/react";
import { hasPointerEvents } from "@testing-library/user-event/dist/utils";

export default function Sell(variables){
    
    const navigate = useNavigate();
    
    const [back,setBack] = useState(null)
    const [confirmAddress,setConfirmAddress] = useState(null)
    // const [confirmPropertyDetails,setConfirmPropertyDetails] = useState(null)
    const [step,setStep] = useState(null)
    
    const [data,setData] = useState({
        token: "",
        images: [],
        address: null,
        lantitude: null,
        longitude: null,
        price: "",
        contact: "",
        comments: ""
    })

    const checkToken = () => {
        console.log("CHECKING TOKEN: ",variables.token);
        const token = sessionStorage.getItem("token");
        console.log("CHECKING SELL TOKEN: ",token);
        if(token){
            const newData = {...data};
            newData.token = variables.token; 
            console.log("newData?? -> ",newData)
            setData(newData);
        }else{
            console.log("nothing here....")
            navigate('/login')
        }
    }
    
    const setAddressData = (address,lantitude,longitude) => {
        console.log("SETTING ADDRESS DATA HEREEREEHRHEHREHHREHHR!!!! ->>>>>>> ")
        console.log("Address: ",address)
        console.log("Latitude: ",lantitude)
        console.log("Longitude: ",longitude)
        const newData = {...data};
        const token = variables.token
        console.log(newData)
        newData.address = address
        newData.lantitude = lantitude
        newData.longitude = longitude
        newData.token = token
        console.log("CHECKING NEW DATA: ",newData)
        setData(newData);
        console.log("CHECKING THE OUTCOME: ",data)
        
    }
    
    const setPropertyDetails = (details)=>{
        console.log("------------CHECKING ELEMENT DETAILS-----------------");
        console.log(details.target.id," --- ",details.target.value)
        const newData = {...data};
        newData[details.target.id] = details.target.value
        console.log("newdata: ",newData)
        setData(newData);
    }
    
    // Change page from one to the other
    const propertyDetailsPage = (details) => {
        
        // Create the buttons
        console.log("data ONE: ",data)
        setBack(<input type="button" onClick={addressPage} value="Back" />)
        
        // Remove the button
        setConfirmAddress(null)
        console.log("BEFORE CREATING IT: ",data)
        setStep(<PropertyDetails locationData={data} setPropertyDetails={setPropertyDetails} address={data.address}/>)
    }
    
    const addressPage = () => {

        // Create the button
        setConfirmAddress(null)
        // Remove the buttons
        setBack(null)
        
        setStep(<AddressAndCoordinates setAddressData={setAddressData}/>)

    }
    
    useEffect(()=>{
        addressPage()
        checkToken();
        console.log("FINAL: ",data)
        // setStep(<AddressAndCoordinates setAddressData={setAddressData}/>)
    },[])
    
    useEffect(()=>{
        
        console.log("data storage ->>>>>>>> ",data)
        setConfirmAddress(<input type="button" onClick={propertyDetailsPage} value="Confirm Address"/>)

    },[data])

    return (
        <div>
            
            {back}
            {step}
            {confirmAddress}

        </div>
    )
}