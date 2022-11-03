import React from "react";
import {IKImage,IKContext} from 'imagekitio-react'

export default function displayImage(imageData){
    const publicKey = 'public_k0o7zbOkiFy8QSCxNMDgntAvLxg=';
    const urlEndpoint = 'https://ik.imagekit.io/uhtx1amtt';
    const authenticationEndpoint = 'http://localhost:8080/imagekitauth';   
    return (
        <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticationEndpoint={authenticationEndpoint} >
                <IKImage path={imageData.path} id={imageData.id} /> 
        </IKContext>
    )
}