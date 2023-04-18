import React, { useEffect, useState } from "react"
import {createRoot} from "react-dom/client"
import Axios from "axios"


function App(){
    var json1=[]
    var json2=[]
    var json3=[]
    var json4=[]
    const [stockimagenature, setStockImageNature] = useState([])
    useEffect(()=>{
        async function go(){
            const response = await Axios.get("api/stocknature")
            setStockImageNature(response.data)
        }go()

    },[])
    
console.log(stockimagenature)
for(var i=0;i<(stockimagenature.length);i++){
    if(i<(stockimagenature.length/2)){
        if(i<(stockimagenature.length/4)){
            json1.push(stockimagenature[i])
        }
        else{
            json2.push(stockimagenature[i])
        }
    }
    else{
        if(i<(stockimagenature.length*3/4)){
            json3.push(stockimagenature[i])
        }
        else{
            json4.push(stockimagenature[i])
        }
    }
}
    return(
        <div className="row">
            <div className="column">
            {json1.map(function (stockimagenature){
                 return <StockImageNature key={stockimagenature._id} name = {stockimagenature.name} tag={stockimagenature.tag} photo = {stockimagenature.photo} id = {stockimagenature._id}  />
            })}   
            </div>
            <div className="column">
            {json2.map(function (stockimagenature){
                 return <StockImageNature key={stockimagenature._id} name = {stockimagenature.name} tag={stockimagenature.tag} photo = {stockimagenature.photo} id = {stockimagenature._id} />
            })}   
            </div>
            <div className="column">
            {json3.map(function (stockimagenature){
                 return <StockImageNature key={stockimagenature._id} name = {stockimagenature.name} tag={stockimagenature.tag} photo = {stockimagenature.photo} id = {stockimagenature._id} />
            })}   
            </div>
            <div className="column">
            {json4.map(function (stockimagenature){
                 return <StockImageNature key={stockimagenature._id} name = {stockimagenature.name} tag={stockimagenature.tag} photo = {stockimagenature.photo} id = {stockimagenature._id} />
            })}   
            </div>
        </div>


        // <div className="container">
        //     <p><a href="/">&laquo;back to public home page</a></p>
        //     <p>Hey, this is from react</p>
        //     <div className="stockimage-grid">
        //     {stockimagenatures.map(function (stockimagenature){
        //         return <StockImagenaturestockimagenature key={stockimagenature._id} name = {stockimagenature.name} tag={stockimagenature.tag} photo = {stockimagenature.photo} id = {stockimagenature._id}/>
        //     })}
        //     </div>
        // </div>        
    )
}
function StockImageNature(props){
    return (
        <div className="image-container">
            <img src={props.photo ? `/uploaded-photos/${props.photo}` : "/fallback.png"} className="picture" alt={`${props.tag} named ${props.name}`} style={{width:100+'%',zIndex:1}} />
            <span className="name" style={{width:100+'%',zIndex:2}}>{props.name}</span>
        </div>
    )

}
const root = createRoot(document.querySelector("#app"))
root.render(<App />)
