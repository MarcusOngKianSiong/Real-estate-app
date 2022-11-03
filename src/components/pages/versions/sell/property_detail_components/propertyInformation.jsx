import React,{useState,useEffect} from "react";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import InputTextField from "./elements/inputTextField";

export default function PropertyInformation(variables){

    const inputFields = ["address","price","contact","comments"]
    console.log("CHECKING THIS ONE: ",variables.formData)

    const createInputFields = (inputFieldNames) => {
        const inputFieldElementArray = []
        console.log(variables.formData)
        inputFieldNames.forEach(field=>{
            inputFieldElementArray.push(<InputTextField fieldName={field} formData={variables.formData} handleFormDataChange={variables.handleFormDataChange}/>)
        })
        return inputFieldElementArray
    }
    
    const inputFieldElements = createInputFields(inputFields)
    
    return(
        <form>
            {inputFieldElements}
        </form>
    )
}