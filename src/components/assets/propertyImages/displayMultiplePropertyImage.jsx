import React,{useState,useEffect} from "react";
import {IKContext,IKImage} from 'imagekitio-react'
import DisplayImage from './assets/displayImage'

export default function DisplayMultiplePropertyImage(data){

    const [ImageNumber,setImageNumber] = useState(0)
    

    let imagesArray = data.images.split(',');
    let pathAndID = imagesArray[0].split("___")

    const [ImageElement,setImageElement] = useState(<DisplayImage path={pathAndID[0]} id={pathAndID[1]}/>)

    const changeImage = (event) => {
        if(event.target.id === "left" && ImageNumber !== 0){
            setImageNumber(ImageNumber-1)
        }
        if(event.target.id==="right" && ImageNumber !== imagesArray.length-1){
            setImageNumber(ImageNumber+1)
        }
    }

    

    

    useEffect(()=>{
        pathAndID = imagesArray[ImageNumber].split("___")
        setImageElement(<DisplayImage path={pathAndID[0]} id={pathAndID[1]}/>)
    },[ImageNumber])

    // const [images,setImages] = useState(createImageElements(data.images))
    
    return (
        // {images}
        <div>
            {ImageElement}
            <input type="button" value="Left" id="left" onClick={(event)=>{changeImage(event)}}/>
            <input type="button" value="Right" id="right" onClick={(event)=>{changeImage(event)}}/>
        </div>
        
    )
}