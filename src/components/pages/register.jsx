import { findByPlaceholderText, getByPlaceholderText, getNodeText } from "@testing-library/react";
import { getSpaceUntilMaxLength, hasSelectionSupport } from "@testing-library/user-event/dist/utils";
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Register(variables){
    
    // Registration not successful.....
    const inputError = (errors) => {
        resetInputFieldDesign()
        for(const dataType in errors){
            setDataFieldBorderColor(dataType,"1px solid red"); 
            setDataFieldErrorMessage(dataType,errors[dataType]);
        }
    }
    
    const setDataFieldBorderColor = (inputField,design) => {
        input.forEach(dataField=>{
            if(dataField.name === inputField){      
                dataField.style.border = design;
            }
        })
    }
    const setDataFieldErrorMessage = (inputField,message) => {
        small.forEach(item=>{
            if (item.id === inputField){
                item.textContent = message;
            }
        })
    }
    const resetInputFieldDesign = () => {
        const inputFields = ["email","name","password","password_confirmation"]
        inputFields.forEach(inputField=>{
            setDataFieldBorderColor(inputField,"");
            setDataFieldErrorMessage(inputField,"")
        })
    }

    const input = document.querySelectorAll('input');
    const small = document.querySelectorAll('small');
    
    const [formData,setFormData] = useState({
        email: "", 
        name: "", 
        password: "",
        password_confirmation: ""
    })
    const navigate = useNavigate();     // To progammatically navigate through the money.

    const createURLQuery = (data)=>{
        let query = '?';
        for (const dataName in data){
            query+=dataName+'='+data[dataName]+'&';
        }    
        return query.slice(0,query.length-1);
    }
    
    const handleSubmit = async ()=>{
        console.log("SUBMITTING DATA TO BACK-END!!!")
        const query = createURLQuery(formData)
        console.log(query)
        const something = await fetch('http://localhost:8080/register'+query)
        .then(res=>{
            return res.json();
        })
        .then(res=>{
            // If the registration is unsuccessful, change the input design to indicate an error.
            if (!res.outcome){
                inputError(res);
            }
            
            // If the registration is successful, .......
            if(res.outcome){
                // 1. Store token
                console.log(res.outcome);
                variables.createSession(res.JWTToken);
                console.log("STORED JWT TOKEN: ",variables.token);
                // 2. Make another http call to get user data
                console.log("REDIRECTING TO LOGGED IN HOME PAGE.....")
                navigate('/')
            }
        }) 
    }

    const handleChange = (event) => {
        const updatedFormData = {...formData}
        updatedFormData[event.target.name] = event.target.value;
        setFormData(updatedFormData)
        console.log(formData)
    }

    return(

        <div>
            <form>
                <label>
                    Email
                    <input name="email" type="email" onChange={handleChange}/>
                    <small id="email"></small>
                </label>
                <label>
                    Name
                    <input name="name" type="text" onChange={handleChange}/>
                    <small id="name"></small>
                </label>
                <label>
                    Password
                    <input name="password" type="password" onChange={handleChange}/>
                    <small id="password"></small>
                </label>
                <label>
                    Password Confirmation
                    <input name="password_confirmation" type="password" onChange={handleChange}/>
                    <small id="password_confirmation"></small>
                </label>
                <input value="Register" type="button" onClick={handleSubmit}/>
            </form>
        </div>
    )
}