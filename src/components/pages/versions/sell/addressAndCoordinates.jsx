import React from "react";
import Map from "../../../assets/map";
import DisplayCoordinates from "../../../assets/displayCoordinates"
import {useState,useEffect} from 'react';

export default function AddressAndCoordinates(variables){
    
    const [locationData,setLocationData] = useState({
        address: "",
        lantitude: "",
        longitude: ""
    })
    
    const changeLocationDataDisplay = (data)=>{
        const newData = {...locationData};
        newData.address = data.address;
        newData.lantitude = data.lantitude;
        newData.longitude = data.longitude;
        setLocationData(newData);
    }

    useEffect(()=>{
        console.log("CHECKING LOCATION DATA ------- ",locationData)
    },[locationData])

    return (
        <div>
            <Map setAddressData={variables.setAddressData} changeLocationDataDisplay={changeLocationDataDisplay}/>
            <DisplayCoordinates locationData={locationData}/>
            
        </div>
    )
}