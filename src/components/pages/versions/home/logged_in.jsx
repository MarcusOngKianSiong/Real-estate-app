import { joinPaths } from "@remix-run/router";
import { keyboardImplementationWrapper } from "@testing-library/user-event/dist/keyboard";
import { getSpaceUntilMaxLength } from "@testing-library/user-event/dist/utils";
import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from '../../../assets/propertyCards'
import DetailsPlatform from "../../../assets/detailsPlatform";
import { toHaveErrorMessage } from "@testing-library/jest-dom/dist/matchers";

export default function LoggedInHomePage(variables){

    const getSellData = () => {
        const sellData = fetch(`http://localhost:8080/showsell?token=${variables.token}`)
        const data = sellData.then(res=>{return res.json()})
        return data
    }
    
    const getBuyData= async ()=>{
        const sellData = await fetch(`http://localhost:8080/showbuyinterest?token=${variables.token}`)
        .then(res=>{
            return res.json();
        })
        .then(res=>{
            return res
        })
        return sellData;
        // console.log(buyData)
        // console.log("hihi: ",buyDatajson())
        // const data = buyData.then(res=>{
        //     console.log("CHECK CEHKC: ",res.json())
        //     return res.json();
        // })
        // return data
    }
    
    const getPersonalPropertyData = (dataType) =>{
        const cards = [];
        if(dataType === "buy"){
            // 1. Get the personal buy property data.
            // 2. Create a card for each piece of data. 
            // 3. store the cards in the card array.
        }
        if(dataType === "sell"){
            // 1. Get the personal sell property data. 
            // 2. Create a card for each piece of data. 
            // 3. Store the card in the cards array. 
        }
        return cards
    }
    
    const navigate = useNavigate();
    const [buyOrSell,setBuyOrSell] = useState("Buy");
    const [cards,setCards] = useState([])
    const [detailsPlatform,setDetailsPlatform] = useState(null)
    const changeCards = () => {
        if(buyOrSell === "buy"){
            
        }
        if(buyOrSell === "sell"){

        }
    }
    
    const showBuy = () => {
        setCards([])
        setBuyOrSell("Buy")
        const buyData = getBuyData();
        buyData.then(res=>{
            const cardArray = []
            res.forEach(item=>{
                cardArray.push(createCard(item));
            })
            setCards(cardArray)
        })
        // console.log("THEHERE: ",buyData)
        // buyData.then(res=>{
        //     console.log("CHECKING BUY DATA: ",res)
        // })
        
        // buyData.then(res=>{
        //     const cardArray = []
        //     res.forEach(item=>{
        //         cardArray.push(createCard(item));
        //     })
        // })
    }

    const showSell = () => {
        setCards([])
        setBuyOrSell("Sell"); 
        const sellData = getSellData();
        sellData.then(res=>{
            console.log(res)
            const cardArray = []
            res.forEach(item=>{
                cardArray.push(createCard(item));
            })
            setCards(cardArray)
        })
    }

    const closeDetails = () => {
        setDetailsPlatform(null)
    }
    const showDetails = (data) => {
        
        setDetailsPlatform(<DetailsPlatform closeDetails={closeDetails} data={data}/>)
    }
    
    const createCard = (data)=>{
        return <PropertyCard data={data} showDetails={showDetails}/>
    }

    const createNew = () => {
        if(buyOrSell === "Buy"){
            navigate('/buy')
        }
        if(buyOrSell === "Sell"){
            navigate('/sell')
        }
    }

    useEffect(()=>{
        showBuy()
    },[])

    useEffect(()=>{
        changeCards()
    },[buyOrSell])

    return(
        <div>
            <div>
                <button id="buy" onClick={showBuy} >Buy</button>
                <button id="sell" onClick={showSell} >Sell</button>
            </div>
            <div> 
                <button id='new' onClick={()=>{createNew()}}>{buyOrSell} new</button>
            </div>
            <div>
                {detailsPlatform}
                {cards}
            </div>
        </div>
    )
}

