import react from'react'

export default function DisplayCoordinates(variables){
    
    return(
        <div>
            <h3>Address</h3>
            <p>{variables.locationData.address}</p>
            <h3>Coordinates</h3>
            <p>Lantitude: {variables.locationData.lantitude}</p>
            <p>Longitude: {variables.locationData.longitude}</p>
        </div>
    )
}