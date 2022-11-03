import {useRef,useEffect,useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import esriConfig from '@arcgis/core/config'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import Button from '@arcgis/core/widgets/Editor'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils'
import { point } from 'leaflet'
import { control } from 'leaflet'

import {locationToAddress} from '@arcgis/core/rest/locator'

export default function DisplaySalesOnMap(variables){

    // Key data
    esriConfig.apiKey = "AAPK768fe6b6477e4c81920d51bae919e383LUfFQpe4GPvEL-NUgn1mQbgZvZHPZvBJIr_s-QYaShYERbooVbNGaWTOiCt0jXta"
    const locatorUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";
    
    // Establishing necessary 
    const saleData = useRef(null)
    const mapRef = useRef(null);
    const navigation = useNavigate()
    

    // Establish the map and the graphic layer

    const findAddressBasedOnCoordinates = (targetCoordinates,sales) => {
        console.log("HERE!!!! ->>>>", sales)
        let returnValue = null
        sales.forEach(sale=>{
            const lantitude = sale.lantitude;
            const longitude = sale.longitude;
            if(lantitude === String(targetCoordinates.lantitude) && longitude === String(targetCoordinates.longitude)){
                if(returnValue === null){
                    returnValue = sale
                }
            }
        })
        return returnValue
    }

    const createPointGraphic = (sales,listOfGraphicPoints=[]) => {
        sales.forEach(sale=>{
            listOfGraphicPoints.push(
                new Graphic({
                    geometry: {type: "point", longitude: parseFloat(sale.longitude), latitude: parseFloat(sale.lantitude)},
                    symbol: {type: "simple-marker",color: [226, 119, 40], outline: { color: [255, 255, 255], width: 1}}
                })
            )
        })
        return listOfGraphicPoints
    }

    function placePoints(graphicPoints,graphicLayer){
        graphicPoints.forEach(pointer=>{
            console.log("Helloooo???")
            graphicLayer.add(pointer)
        })
    }

    useEffect(()=>{
        // FAILED TO FETCH?????
        variables.getSellData().then(res=>{
            const salesData = res
            // Lay out the platform (map and layer)
            const map = new MapView({
                container: mapRef.current,
                map: new Map({
                    basemap: "arcgis-navigation"
                }),
                center: [103.851959,1.290270],
                zoom: 12,
            })
            const graphicsLayer = new GraphicsLayer();
            map.map.add(graphicsLayer)
            
            // Create the graphic points
            const graphicPoints = createPointGraphic(res)
            placePoints(graphicPoints,graphicsLayer)

            map.popup.autoOpenEnabled = false;
            map.on("click",(event)=>{
                
                const screenPoint = {x: event.x, y: event.y}; 
                
                map.hitTest(screenPoint).then(response=>{
                    if(response.results.length === 2 && response.results[0].graphic.symbol.type === "simple-marker"){
                        
                        map.popup.open({title: "Property Details",location: response.results[0].mapPoint, actions: [{title: 'hello'}]})
                        const params = {
                            location: response.results[0].mapPoint
                        }; 
                        
                        locationToAddress(locatorUrl,params)
                        .then(res=>{
                            const pointAddress = findAddressBasedOnCoordinates({lantitude: response.results[0].graphic.geometry.latitude,longitude: response.results[0].graphic.geometry.longitude},salesData)
                            map.popup.content = "Address: "+pointAddress.address+"\n";
                            saleData.current = pointAddress
                        })
                        
                        // console.log(response.results[0].mapPoint)
                    }
                })                 
            })

            map.popup.on("trigger-action",(event)=>{
                if(sessionStorage.getItem("token")===null || sessionStorage.getItem("token")===""){
                    navigation('/')
                }else{
                    console.log("TRIGGERED!!!! ->>>> ", saleData.current)
                    console.log("CHecking current sale: ",saleData.current)
                    variables.showDetails(saleData.current)
                }
                
                // variables.showDetails("Hello there idiot")
            })

        

        })

    },[])


    return <div ref={mapRef} style={{height: "50vh",width: "100vw"}}/>

}