import React, { useState, useEffect } from "react"
import {createRoot} from "react-dom/client"
import Axios from "axios"
import CreateNewForm from "./components/CreateNewForm"
import StockImageCard from "./components/StockImageCard"

function App(){
    // const stockimages = [{name:"vasanth", tag:"nature"},{name:"mark",tag:"tech"}]
    const [stockimages, setStockImages] = useState([])

    useEffect(()=>{
        async function go(){
            const response = await Axios.get("/api/stockimages")
            setStockImages(response.data)
        }
        go()
    },[])

    return(
        <div className="container">
            <p><a href="/">&laquo;back to public home page</a></p>
            <CreateNewForm setStockImages={setStockImages}/>
            <div className="stockimage-grid">
            {stockimages.map(function(stockimage){
                return <StockImageCard key={stockimage._id} name={stockimage.name} tag = {stockimage.tag} photo = {stockimage.photo} id = {stockimage._id} setStockImages = {setStockImages}/>
            })}
            </div>
        </div>
    )
}

const root = createRoot(document.querySelector("#app"))
root.render(<App />)