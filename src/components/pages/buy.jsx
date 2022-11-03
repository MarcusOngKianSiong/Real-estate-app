import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import DisplaySalesOnMap from '../assets/buyPage/displaySalesOnMap'
import DetailsPlatform from '../assets/buyPage/detailsPlatform'

export default function Buy(variables){

    const [mapSales,setmapSales] = useState([])
    const [detailsPlatform,createDetailsPlatform] = useState(null)
    const navigate = useNavigate()
    
    const getSellData = () => {
        console.log("RUNNING THIS DAM THING!!!!")
        const data =  fetch('http://13.215.50.32:8080/buyData')
        return data.then(res=>{return res.json()})
    }

    const showDetailsOnDetailsPlatform = (data) => {
        console.log("RUNNING DETAILS PLATFORM...")
        createDetailsPlatform(<DetailsPlatform data={data} token={variables.token}/>)
    }
    const removeDetailsPlatform = () => {
        createDetailsPlatform(null)
    }

    // useEffect(()=>{
    //     // get sell data from back end (returns a promise)
    //     console.log("this: ",mapSales)
    // },[mapSales])
    
    const showDetails = (saleData) => {
        console.log("CURRENTLY IN PARENT: ",saleData)
        showDetailsOnDetailsPlatform(saleData)
    }

    const indicatePurchaseIntent = (saleID) => {
        console.log("-------------STORING PURCHASE--------------")
        // store the buy data in your data base
        fetch('http://13.215.50.32:8080/buy').then(res=>{
            return res.json()
        })
        .then(res=>{
            console.log(res)
            
        })
        // redirect
        

    }

    useEffect(()=>{
        // getSellData().then(res=>{
        //     console.log(res)
        //     setmapSales(res)
        // })
    },[])
    
    // const [map,setMap] = useState(<DisplaySalesOnMap sales={mapSales} showDetails={showDetails}/>)

    // const refreshMap = () => {
    //     setMap(<DisplaySalesOnMap sales={mapSales} showDetails={showDetails}/>)
    // }

    return(
        <div>
            {/* <button onClick={refreshMap}>Rrefresh</button> */}
            <DisplaySalesOnMap getSellData={getSellData} showDetails={showDetails}/>
            {/* {map}  */}
            {detailsPlatform}
        </div>
    )
}