import React from "react";

export default function InputTextField(variables){

    console.log("field Name: ",variables.fieldName);
    console.log("data: ",   variables.formData);
    const data = variables.formData[variables.fieldName]
    console.log(data)

    let element = null;

    if(variables.fieldName==="address"){
        element = <input type="text" id={variables.fieldName} value={data} onChange={(event)=>{variables.handleFormDataChange(event)}} readOnly/>
    }else{
        element = <input type="text" id={variables.fieldName} value={data} onChange={(event)=>{variables.handleFormDataChange(event)}}/>
    }

    return (
        <div>
            <label>{variables.fieldName}</label>
            {element}
        </div>
    )   
}


