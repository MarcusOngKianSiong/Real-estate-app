import React from "react";
import { IKImage, IKContext, IKUpload } from 'imagekitio-react';
import { keyboardImplementationWrapper } from "@testing-library/user-event/dist/keyboard";




  


export default function UploadPropertyImage(variables){
    const publicKey = 'public_k0o7zbOkiFy8QSCxNMDgntAvLxg=';
    const urlEndpoint = 'https://ik.imagekit.io/uhtx1amtt';
    const authenticationEndpoint = 'http://localhost:8080/imagekitauth'; 

    const onError = err => {
        console.log("Error", err);
    };

    const onSuccess = res => {

        console.log("Success", res);
        // I cannot use image name to retrieve the image
        // I must use image id to retrieve the image

        // Add another image link to the array
        let imagesInLocalStorage = localStorage.getItem("images")
        if(imagesInLocalStorage === null){
            localStorage.setItem("images","")
            imagesInLocalStorage = localStorage.getItem("images")
        }
        
        imagesInLocalStorage = imagesInLocalStorage.split(",");
        imagesInLocalStorage.unshift(res.name+'___'+res.fileId);
        localStorage.setItem("images",imagesInLocalStorage);
        console.log(localStorage.getItem("images"))
        
        variables.alignStateImagesWithLocalStorageImage()
        
    };

    return(
        <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticationEndpoint={authenticationEndpoint} >
            <IKUpload filename="something.jpeg" onError={onError} onSuccess={onSuccess}/>
        </IKContext>
    )
}


