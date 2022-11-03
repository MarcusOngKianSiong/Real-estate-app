import React from "react";
import ImageKit from 'imagekitio-react'
import DisplayImage from './assets/displayImage'

export default function displayMultiplePropertyImage(ImageData){
    
    let pathAndID = null
    
    if(ImageData.image){
        const firstImage = ImageData.image.split(',')[0];
        console.log("this: ",firstImage)
        pathAndID = firstImage.split('___')
    }

    return (
        <DisplayImage path={pathAndID[0]} id={pathAndID[1]}/>
    )
}