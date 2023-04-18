const {MongoClient, ObjectId } = require("mongodb")//to handle MongoDB connections and operations
const express = require("express") //to setup a web framework
const multer = require("multer") //to handle forms sending files to server(multipart forms)
const upload = multer() //multer object creation
const sanitizeHTML = require("sanitize-html")//to ensure data entering the db to be free of html tag/attributes
const fse = require('fs-extra')//to handle and represent local system path(project root)
const sharp = require('sharp')//to alter images
let db
const path = require('path')
const React = require("react")
const ReactDomServer = require('react-dom/server')
const StockImageCard = require("./src/components/StockImageCard").default

fse.ensureDirSync(path.join('public','uploaded-photos'))

const app = express()

//EJS Template engine
app.set("view engine","ejs")
//configurations of file paths
app.set("views","./views")
app.use(express.static("public"))
//form data handling
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//app routes below that are not under password protected middleware

//landing page
app.get("/", (req,res)=>{
    res.render("index")
})

//cars library page
app.get("/cars",(req,res)=>{
    res.render("cars")
})

//nature library page
app.get("/natureimg",(req,res)=>{
    res.render("nature")
})

//forest library page
app.get("/forest",(req,res)=>{
    res.render("forest")
})

//api for car react component sending Axios get request to load only car images under responsive grid
app.get("/api/stockcars",async (req,res)=>{
    const allStockCars = await db.collection("stockimages").find({tag:"cars"}).toArray()
    res.json(allStockCars)

})

//api for nature react component sending Axios get request to load only nature images under responsive grid

app.get("/api/stocknature",async (req,res)=>{
    const allStockNature = await db.collection("stockimages").find({tag:"nature"}).toArray()
    res.json(allStockNature)

})

//api for forest react component sending Axios get request to load only forest images under responsive grid

app.get("/api/stockforest",async (req,res)=>{
    const allStockForest = await db.collection("stockimages").find({tag:"forest"}).toArray()
    res.json(allStockForest)

})

//contribute/user registration handler
app.get("/contribute",(req,res)=>{
    res.render("contribute")
})

//user login page handler
app.get("/login",(req,res)=>{
    res.render("login")
})

//user login page authentication handler
app.post("/login-user", async (req,res)=>{
    const user = req.body.username;
    const pswd = req.body.password;
    const existUser = await db.collection("pixapicusers").find({username:user}).toArray()
    if(existUser.length == 0)
    {
        res.send("User does not exist")
    }
    else{
        if(existUser[0].username == user){
            if(existUser[0].password == pswd){
                res.send(existUser[0].username)
            }
            else{
                res.send("Wrong Password")
            }
        }
    }
})

//user registration page handler
app.post("/create-user", userRegCleanup, async(req,res)=>{
    const existnUserEmail = await db.collection("pixapicusers").find({email:req.body.email}).toArray()
    const existnUserName = await db.collection("pixapicusers").find({username:req.body.username}).toArray()
    if((existnUserEmail.length + existnUserName.length)==0){
        const info = await db.collection("pixapicusers").insertOne(req.cleanData)
        res.send("User registration successful")

    }else{
        res.send("User already exits!")
    }
})

//middleware to provide admin authentication for restricted url requests
function passwordProtected(req,res,next){
    res.set("WWW-Authenticate","Basic realm='Stunning Stock App' ")
    if(req.headers.authorization == "Basic YWRtaW46cGl4YWxhdGVGeDgwMQ=="){
        next()
    }else{
        console.log(req.headers.authorization)
        res.status(401).send("Try Again")
    }

}


//all images display library
app.get("/nature", async (req,res)=>{
    const allStockImages = await db.collection("stockimages").find().toArray()
    const generatedHTML = ReactDomServer.renderToString(
        <div className="container">
                {!allStockImages.length && <p>There are no stock images yes. the admin needs to add one.</p>}
            <div className="stockimage-grid mb-3">
                {allStockImages.map(stockimage => <StockImageCard key={stockimage._id} name={stockimage.name} tag={stockimage.tag} photo={stockimage.photo} readOnly={true}/>)}
            </div>
            <p><a href="/admin">Login / manage the stock image listings.</a></p>
        </div>
    )
    // res.send(`<h1>Welcome to the page</h1> ${allStockImages.map(stockimage => `<p>${stockimage.name} - ${stockimage.tag}</p>`).join('')}`)
    res.render("home",{generatedHTML})
})


//middleware to sanitize form text data
function userRegCleanup(req,res,next){
    if(typeof req.body.username != "string") req.body.username = ""
    if(typeof req.body.email != "string") req.body.email = ""
    if(typeof req.body.password != "string") req.body.password = ""
    if(typeof req.body._id != "string") req.body._id = ""

    req.cleanData = {
        username: sanitizeHTML(req.body.username.trim(), {allowedTags:[], allowedAttributes:{}}),
        email: sanitizeHTML(req.body.email.trim(), {allowedTags:[], allowedAttributes:{}}),
        password: sanitizeHTML(req.body.password.trim(), {allowedTags:[], allowedAttributes:{}})
    }
    next()
}


//request for the pages under this below line requires admin authentication
app.use(passwordProtected)

//admin page to handle edit and delete operation on uploaded data
app.get("/admin",(req,res)=>{
    res.render("admin")

})

//admin stockimage card react component get request to display all stockimages
app.get("/api/stockimages",async (req,res)=>{
    const allStockImages = await db.collection("stockimages").find().toArray()
    res.json(allStockImages)

})

//image react card component post request to insert the image to database using multer
app.post("/create-stockimage", upload.single("photo"), stockCleanup, async (req,res)=>{
    if (req.file){
        const photofilename = `${Date.now()}.jpg`
        await sharp(req.file.buffer).jpeg({quality:60}).toFile(path.join("public","uploaded-photos", photofilename))
        req.cleanData.photo = photofilename
    }
    
    console.log(req.body)
    const info = await db.collection("stockimages").insertOne(req.cleanData)
    const newStockImage = await db.collection("stockimages").findOne({_id: new ObjectId(info.insertedId)})
    res.send(newStockImage)
})

//image react card component delete request to delete the image from database 
app.delete("/stockimage/:id", async (req,res) => {
    if(typeof req.params.id != "string") req.params.id = ""
    const doc = await db.collection("stockimages").findOne({_id: new ObjectId(req.params.id)})
    if (doc.photo){
        fse.remove(path.join("public","uploaded-photos",doc.photo))
    }
    db.collection("stockimages").deleteOne({_id: new ObjectId(req.params.id)})
    res.send("Good job")
})

//image react card  component post request to update the image details 
app.post("/update-stockimage", upload.single("photo"), stockCleanup, async(req,res)=>{
    if(req.file){
        const photofilename = `${Date.now()}.jpg`
        await sharp(req.file.buffer).resize(844,456).jpeg({quality:60}).toFile(path.join("public","uploaded-photos", photofilename))
        req.cleanData.photo = photofilename
        const info = await db.collection("stockimages").findOneAndUpdate({_id:  new ObjectId(req.body._id)},{$set : req.cleanData})
        if(info.value.photo){
            fse.remove(path.join("public","uploaded-photos",info.value.photo))
        }
        res.send(photofilename)
    }else{
        db.collection("stockimages").findOneAndUpdate({_id:  new ObjectId(req.body._id)},{$set : req.cleanData})
        res.send(false)

    }
})

//middleware to clean up the registration form data
function stockCleanup(req,res,next){
    if(typeof req.body.name != "string") req.body.name = ""
    if(typeof req.body.tag != "string") req.body.tag = ""
    if(typeof req.body._id != "string") req.body._id = ""

    req.cleanData = {
        name: sanitizeHTML(req.body.name.trim(), {allowedTags:[], allowedAttributes:{}}),
        tag: sanitizeHTML(req.body.tag.trim(), {allowedTags:[], allowedAttributes:{}})
    }
    next()
}

//function to load the database first when the server starts 
async function start(){
    const client = new MongoClient("mongodb://root:root1qa21zxjspfer@localhost:27017/StunningStockApp?&authSource=admin")
    await client.connect()
    db = client.db()
    app.listen(3000)
}
start()
