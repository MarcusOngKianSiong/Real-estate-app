import {useRef,useEffect} from 'react'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'

import esriConfig from '@arcgis/core/config'
import Search from '@arcgis/core/widgets/Search'
import { keyboardImplementationWrapper } from '@testing-library/user-event/dist/keyboard'

const MyMap=(variables)=>{
    const mapRef = useRef(null);
    esriConfig.apiKey = "AAPK768fe6b6477e4c81920d51bae919e383LUfFQpe4GPvEL-NUgn1mQbgZvZHPZvBJIr_s-QYaShYERbooVbNGaWTOiCt0jXta"

    const search = new Search(); 
    
    const getCoordinates = () => {
        console.log("GETTING COORDINATES!!!!")
        search.on('search-complete',(result)=>{
          const geom = result.results[0].results[0].feature.geometry;
          const longitude = geom.longitude;
          const latitude = geom.latitude;
          const address = result.searchTerm;
          console.log("HELLOOOO")
          console.log("Longitude: ",longitude)
          console.log("lantitude: ",latitude)
          console.log("searchTerm: ",result.searchTerm)
          variables.setAddressData(address,latitude,longitude)
          variables.changeLocationDataDisplay({
            address: address,
            lantitude: latitude,
            longitude: longitude
          })
        })
    }
    
    const handleClick = (event) => {
        const element = event.target.className;
        if(element === "esri-icon-search" || element === "esri-menu__list-item"){
          getCoordinates()
        }
    }
    
    const handleKeyDown = (event) => {
        if(event.code === "Enter"){
            getCoordinates()
        }
    }

    useEffect(()=>{
        const something = new MapView({
            container: mapRef.current,
            map: new Map({
                basemap: "arcgis-navigation"
            }),
            center: [103.851959,1.290270],
            zoom: 12,
        })
        // How do you even attach the search onto the map by default?
        search.view = something
        
        something.ui.add(search,{
            position: "top-left",
            index: 2
        })
        
    },[])
    
    

    return <div ref={mapRef} onClick={(event)=>{handleClick(event)}} onKeyDown={(event)=>{handleKeyDown(event)}} style={{height: "50vh",width: "50vw"}}/>
    
}

export default MyMap;
