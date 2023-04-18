import React, { useState, useEffect } from "react"
import {createRoot} from "react-dom/client"
import Axios from "axios"
import CreateNewForm from "./components/CreateNewForm"
import StockImageCard from "./components/StockImageCard"

function App(){
    // const stockimages = [{name:"vasanth", tag:"nature"},{name:"mark",tag:"tech"}]
    const [userstockimages, setUserStockImages] = useState([])

    useEffect(()=>{
        async function go(){
            const response = await Axios.post("/api/userstockimages")
            setUserStockImages(response.data)
        }
        go()
    },[])

    return(
        <div className="container">
            <CreateNewForm setStockImages={setUserStockImages}/>
            <div className="stockimage-grid">
            {userstockimages.map(function(userstockimage){
                return <StockImageCard key={userstockimage._id} name={userstockimage.name} tag = {userstockimage.tag} photo = {userstockimage.photo} id = {userstockimage._id} setStockImages = {setUserStockImages}/>
            })}
            </div>
        </div>
    )
}

const root = createRoot(document.querySelector("#app"))
root.render(<App />)