import { toBeRequired } from "@testing-library/jest-dom/dist/matchers";
import { keyboardImplementationWrapper } from "@testing-library/user-event/dist/keyboard";
import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import DisplayPropertyImage from "./property_detail_components/elements/DisplayPropertyImage";
import UploadPropertyImage from "./property_detail_components/elements/uploadPropertyImage";
import PropertyImage from "./property_detail_components/propertyImage";
import PropertyInformation from "./property_detail_components/propertyInformation"

const createURLQuery = (data)=>{
    let query = '?';
    for (const dataName in data){
        query+=dataName+'='+data[dataName]+'&';
    }   
    return query.slice(0,query.length-1);
}

export default function PropertyData(variables){
    
    console.log("---PASSING LOCATION DATA TO STEP 2: -> ",variables.locationData)
    
    const [images,setImage] = useState([]);
    const [formData,setFormData] = useState({
        token: variables.locationData.token,
        address: variables.locationData.address,
        lantitude: variables.locationData.lantitude, 
        longitude: variables.locationData.longitude, 
        price: "",
        contact: "",
        comments: ""
    })
    const navigate = useNavigate()

    const handleFormDataChange = (event) => {
        
        // How do I make it such that the changes from previous change do not reset?
        console.log("----CHECKING FORM DATA CHANGE PROCESS------")
        const newData = event.target.value;
        const createNew = {...formData};
        console.log("checking ID: ",event.target.id)
        createNew[event.target.id] = newData
        setFormData(createNew)
   
    }
    
    const alignStateImagesWithLocalStorageImage = () => {
        const images = localStorage.getItem("images")
        const imagesList = images.split(",");
        const arrayOfImageDisplay = []; 
        imagesList.forEach(item=>{
            const name_id = item.split("___");
            arrayOfImageDisplay.push(<DisplayPropertyImage path={name_id[0]} fileId={name_id[1]}/>);    /// HEREEREREE
        })
        setImage(arrayOfImageDisplay)
        console.log("ALIGNING STATE WITH MEMORY (IMAGE LIST): ",images)
    } 
    
    const deleteImage = (imageNumber) => {
        // remove the localstorage
        const imageArray = localStorage.getItem("images").split(",");
        const deletedItem = imageArray.splice(imageNumber,1);
        localStorage.setItem("images",imageArray);
        
        // align the state
        alignStateImagesWithLocalStorageImage();
        
        // Get the image id
        const name_id = deletedItem[0].split('___')
        
        // delete the backend
        fetch(`http://localhost:8080/deleteimage?imageName=${name_id[1]}`,{method: "DELETE"})
        .then(res=>{
            return res.json()
        })
        .then(res=>{
            console.log("THIS: ",res); 
        })
    }

    // 
    const postPropertySale = () => {
        console.log("------------Uploading Property sale-------------")
        // consolidate image data, location data, and property details

        const consolidation = {...formData};
        consolidation["images"] = localStorage.getItem("images");
        
        console.log("Checking data: ",consolidation) 
        
        const query = createURLQuery(consolidation)
        console.log(query)
        fetch("http://localhost:8080/sell"+query)
        .then(res=>{
            return res.json()
        })
        .then(res=>{
            if(res.outcome === "success"){
                navigate('/')
            }else{
                console.log("Error in saving data")
            }
        })
    }
    
    useEffect(()=>{
        localStorage.setItem("images","")
        alignStateImagesWithLocalStorageImage()
        console.log(images)
    },[])

    useEffect(()=>{
        console.log("FORM DATA CHANGING: -----> ",formData)
        // setFormData(formData)
    },[formData])

    return(
        <div>
            {/* <DisplayPropertyImage path={"/something_RaygOCHTt.jpeg"}/> */}
            <PropertyImage images={images} deleteImage={deleteImage}/>
            <UploadPropertyImage alignStateImagesWithLocalStorageImage={alignStateImagesWithLocalStorageImage}/>            
            <PropertyInformation formData={formData} handleFormDataChange={handleFormDataChange}/>
            <input type="button" value="submit sale" onClick={postPropertySale}/>
        </div>
    )
}