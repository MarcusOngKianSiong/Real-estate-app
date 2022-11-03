import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";
import React from "react";

export default function Home(variables){
    console.log("THIS!!!: ",variables.homePage)
    return(
        <div>
            {variables.homePage}
        </div>
    )
}
