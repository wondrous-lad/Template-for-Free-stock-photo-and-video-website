import React, { useEffect, useState } from "react"
import {createRoot} from "react-dom/client"
import Axios from "axios"


function App(){
    var json1=[]
    var json2=[]
    var json3=[]
    var json4=[]
    const [stockimagecars, setStockImageCars] = useState([])
    useEffect(()=>{
        async function go(){
            const response = await Axios.get("api/stockcars")
            setStockImageCars(response.data)
        }go()

    },[])
    
console.log(stockimagecars)
for(var i=0;i<(stockimagecars.length);i++){
    if(i<(stockimagecars.length/2)){
        if(i<(stockimagecars.length/4)){
            json1.push(stockimagecars[i])
        }
        else{
            json2.push(stockimagecars[i])
        }
    }
    else{
        if(i<(stockimagecars.length*3/4)){
            json3.push(stockimagecars[i])
        }
        else{
            json4.push(stockimagecars[i])
        }
    }
}
    return(
        <div className="row">
            <div className="column">
            {json1.map(function (stockimagecar){
                 return <StockImageCar key={stockimagecar._id} name = {stockimagecar.name} tag={stockimagecar.tag} photo = {stockimagecar.photo} id = {stockimagecar._id}  />
            })}   
            </div>
            <div className="column">
            {json2.map(function (stockimagecar){
                 return <StockImageCar key={stockimagecar._id} name = {stockimagecar.name} tag={stockimagecar.tag} photo = {stockimagecar.photo} id = {stockimagecar._id} />
            })}   
            </div>
            <div className="column">
            {json3.map(function (stockimagecar){
                 return <StockImageCar key={stockimagecar._id} name = {stockimagecar.name} tag={stockimagecar.tag} photo = {stockimagecar.photo} id = {stockimagecar._id} />
            })}   
            </div>
            <div className="column">
            {json4.map(function (stockimagecar){
                 return <StockImageCar key={stockimagecar._id} name = {stockimagecar.name} tag={stockimagecar.tag} photo = {stockimagecar.photo} id = {stockimagecar._id} />
            })}   
            </div>
        </div>


        // <div className="container">
        //     <p><a href="/">&laquo;back to public home page</a></p>
        //     <p>Hey, this is from react</p>
        //     <div className="stockimage-grid">
        //     {stockimagecars.map(function (stockimagecar){
        //         return <StockImageCar key={stockimagecar._id} name = {stockimagecar.name} tag={stockimagecar.tag} photo = {stockimagecar.photo} id = {stockimagecar._id}/>
        //     })}
        //     </div>
        // </div>        
    )
}
function StockImageCar(props){
    return (
        <div className="image-container">
            <img src={props.photo ? `/uploaded-photos/${props.photo}` : "/fallback.png"} className="picture" alt={`${props.tag} named ${props.name}`} style={{width:100+'%',zIndex:1}} />
            <span className="name" style={{width:100+'%',zIndex:2}}>{props.name}</span>
        </div>
    )

}
const root = createRoot(document.querySelector("#app"))
root.render(<App />)
