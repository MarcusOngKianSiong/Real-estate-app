import React from "react";
import DetailsPlatform from "./detailsPlatform";
import DisplayOnePropertyImage from '../assets/propertyImages/displayOnePropertyImage'

export default function PropertyCard(variables){

    console.log(variables.data)
    const contact = variables.contact;
    const comments = variables.comments;

    const data = variables.data

    return (
        <div id="card">
            {/* <img src={variables.img}></img> */}
            <DisplayOnePropertyImage image={variables.data.images}/> 
            <table>
                <tr>
                    <td>address</td>
                    <td>{variables.data.address}</td>
                </tr>
                <tr>
                    <td>price</td>
                    <td>{variables.data.price}</td>
                </tr>
            </table>
            <input type="button" id={variables.data} onClick={(event)=>{variables.showDetails(data)}} value="view Details" />
        </div>
    )
}