import React from "react";
import { IKImage, IKContext, IKUpload } from 'imagekitio-react';
import { toHaveErrorMessage } from "@testing-library/jest-dom/dist/matchers";



export default function DisplayPropertyImage(variables){
    
    const publicKey = 'public_k0o7zbOkiFy8QSCxNMDgntAvLxg=';
    const urlEndpoint = 'https://ik.imagekit.io/uhtx1amtt';
    const authenticationEndpoint = 'http://localhost:8080/imagekitauth';   
    
    return (

        <div>
            <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticationEndpoint={authenticationEndpoint} >
                <IKImage path={variables.path} id={variables.id} /> 
            </IKContext>
        </div>
        
    )

}