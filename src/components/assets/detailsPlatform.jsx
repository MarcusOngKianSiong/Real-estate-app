import { findAllByTestId } from "@testing-library/react";
import React from "react";
import DisplayMultiplePropertyImage from './propertyImages/displayMultiplePropertyImage'

export default function DetailsPlatform(Details){
    


    return (
        <div>
            <input type="button" value="close" onClick={Details.closeDetails}/>
            <div id="detailsPlatform">
                
            </div>
            <div id="informationForDetailsPlatform">
                    {/* <button onClick={Details.closeDetails()}>close</button> */}
                    <DisplayMultiplePropertyImage images={Details.data.images}/>
                    
                    <div>
                        <table>
                            <tr>
                                <td>Address</td>
                                <td>{Details.data.address}</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>{Details.data.price}</td>
                            </tr>
                            <tr>
                                <td>Contact</td>
                                <td>{Details.data.contact}</td>
                            </tr>
                            <tr>
                                <td>Comments</td>
                                <td>{Details.data.comments}</td>
                            </tr>
                        </table>
                    </div>
                    </div>
        </div>
    )
}