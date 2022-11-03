import React,{useState} from "react";
import UploadPropertyImage from "./elements/uploadPropertyImage"
import DisplayPropertyImage from "./elements/DisplayPropertyImage"
import { useEffect } from "react";

export default function PropertyImage(variables){
    
    // To make values stay, one idea is to make the app call data from the back-end every time he refreshes the app.
    // It is similar 

    // The big picture: Make the list of images remain the same if the user refreshes
    
    // What do I need: a way to make the data persist no matter how many times the user refreshes. 
    // Reference -> Using session storage to store the token 

    // Current experiment: 
    // - using data fetching from back-end to 
    // - solve the persisting of data 
    // - when the user refreshes 

    // What do I need?
    // 1. backend that sends data
    // 2. front end that has a state based on the data sent to the back-end. 

    const [imageNumber,setImageNumber] = useState(0)

    const moveLeft = () => {
        if(imageNumber>0){
            setImageNumber(imageNumber-1);
        }
    }

    const moveRight = () => {
        if(imageNumber<variables.images.length-1){
            setImageNumber(imageNumber+1);
        }
    }

    useEffect(()=>{
        console.log("current Image number: ",imageNumber)
    },[imageNumber])

    return(
        // I need something that does not cause the data to disappear when I refresh the app.
        // the next question is: can useRef do the job?
        // I need to create an experiment.
        <div>
            <input type="button" value="left" onClick={moveLeft}/>
                {variables.images[imageNumber]}
            <input type="button" value="right" onClick={moveRight}/>
            <input type="button" value="delete" onClick={(event)=>{variables.deleteImage(imageNumber)}}/>
        </div>
    )
}

