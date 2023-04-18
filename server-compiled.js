(()=>{var e={535:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});const o=require("axios");var n=a.n(o),s=a(689),r=a.n(s);const i=function(e){const[t,a]=(0,s.useState)(!1),[o,i]=(0,s.useState)(""),[c,l]=(0,s.useState)(),[d,m]=(0,s.useState)("");return r().createElement("div",{className:"card"},r().createElement("div",{className:"our-card-top"},t&&r().createElement("div",{className:"our-custom-input"},r().createElement("div",{className:"our-custom-input-interior"},r().createElement("input",{onChange:e=>l(e.target.files[0]),className:"form-control form-control-sm",type:"file"}))),r().createElement("img",{src:e.photo?`/uploaded-photos/${e.photo}`:"/fallback.png",className:"card-img-top",alt:`${e.tag} named ${e.name}`})),r().createElement("div",{className:"card-body"},!t&&r().createElement(r().Fragment,null,r().createElement("h4",null,e.name),r().createElement("p",{className:"text-muted small"},e.tag),!e.readOnly&&r().createElement(r().Fragment,null,r().createElement("button",{onClick:()=>{a(!0),i(e.name),m(e.tag),l("")},className:"btn btn-sm btn-primary"},"Edit")," ",r().createElement("button",{onClick:async()=>{n().delete(`/stockimage/${e.id}`),e.setStockImages((t=>t.filter((t=>t._id!=e.id))))},className:"btn btn-sm btn-outline-danger"},"Delete"))),t&&r().createElement("form",{onSubmit:async function(t){t.preventDefault(),a(!1),e.setStockImages((t=>t.map((function(t){return t._id==e.id?{...t,name:o,tag:d}:t}))));const s=new FormData;c&&s.append("photo",c),s.append("_id",e.id),s.append("name",o),s.append("tag",d);const r=await n().post("/update-stockimage",s,{headers:{"Content-Type":"multipart/form-data"}});r.data&&e.setStockImages((t=>t.map((function(t){return t._id==e.id?{...t,photo:r.data}:t}))))}},r().createElement("div",{className:"mb-1"},r().createElement("input",{autoFocus:!0,onChange:e=>i(e.target.value),type:"text",className:"form-control form-control-sm",value:o})),r().createElement("div",{className:"mb-2"},r().createElement("input",{onChange:e=>m(e.target.value),type:"text",className:"form-control form-control-sm",value:d})),r().createElement("button",{className:"btn btn-sm btn-success"},"Save")," ",r().createElement("button",{onClick:()=>a(!1),className:"btn btn-sm btn-outline-secondary"},"Cancel"))))}},860:e=>{"use strict";e.exports=require("express")},470:e=>{"use strict";e.exports=require("fs-extra")},13:e=>{"use strict";e.exports=require("mongodb")},738:e=>{"use strict";e.exports=require("multer")},689:e=>{"use strict";e.exports=require("react")},684:e=>{"use strict";e.exports=require("react-dom/server")},109:e=>{"use strict";e.exports=require("sanitize-html")},441:e=>{"use strict";e.exports=require("sharp")},17:e=>{"use strict";e.exports=require("path")}},t={};function a(o){var n=t[o];if(void 0!==n)return n.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,a),s.exports}a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var o in t)a.o(t,o)&&!a.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{const{MongoClient:e,ObjectId:t}=a(13),o=a(860),n=a(738)(),s=a(109),r=a(470),i=a(441);let c;const l=a(17),d=a(689),m=a(684),u=a(535).Z;r.ensureDirSync(l.join("public","uploaded-photos"));const p=o();function g(e,t,a){"string"!=typeof e.body.name&&(e.body.name=""),"string"!=typeof e.body.tag&&(e.body.tag=""),"string"!=typeof e.body._id&&(e.body._id=""),e.cleanData={name:s(e.body.name.trim(),{allowedTags:[],allowedAttributes:{}}),tag:s(e.body.tag.trim(),{allowedTags:[],allowedAttributes:{}})},a()}p.set("view engine","ejs"),p.set("views","./views"),p.use(o.static("public")),p.use(o.json()),p.use(o.urlencoded({extended:!1})),p.get("/",((e,t)=>{t.render("index")})),p.get("/cars",((e,t)=>{t.render("cars")})),p.get("/natureimg",((e,t)=>{t.render("nature")})),p.get("/forest",((e,t)=>{t.render("forest")})),p.get("/api/stockcars",(async(e,t)=>{const a=await c.collection("stockimages").find({tag:"cars"}).toArray();t.json(a)})),p.get("/api/stocknature",(async(e,t)=>{const a=await c.collection("stockimages").find({tag:"nature"}).toArray();t.json(a)})),p.get("/api/stockforest",(async(e,t)=>{const a=await c.collection("stockimages").find({tag:"forest"}).toArray();t.json(a)})),p.get("/contribute",((e,t)=>{t.render("contribute")})),p.get("/login",((e,t)=>{t.render("login")})),p.post("/login-user",(async(e,t)=>{const a=e.body.username,o=e.body.password,n=await c.collection("pixapicusers").find({username:a}).toArray();0==n.length?t.send("User does not exist"):n[0].username==a&&(n[0].password==o?t.send(n[0].username):t.send("Wrong Password"))})),p.post("/create-user",(function(e,t,a){"string"!=typeof e.body.username&&(e.body.username=""),"string"!=typeof e.body.email&&(e.body.email=""),"string"!=typeof e.body.password&&(e.body.password=""),"string"!=typeof e.body._id&&(e.body._id=""),e.cleanData={username:s(e.body.username.trim(),{allowedTags:[],allowedAttributes:{}}),email:s(e.body.email.trim(),{allowedTags:[],allowedAttributes:{}}),password:s(e.body.password.trim(),{allowedTags:[],allowedAttributes:{}})},a()}),(async(e,t)=>{const a=await c.collection("pixapicusers").find({email:e.body.email}).toArray(),o=await c.collection("pixapicusers").find({username:e.body.username}).toArray();a.length+o.length==0?(await c.collection("pixapicusers").insertOne(e.cleanData),t.send("User registration successful")):t.send("User already exits!")})),p.get("/nature",(async(e,t)=>{const a=await c.collection("stockimages").find().toArray(),o=m.renderToString(d.createElement("div",{className:"container"},!a.length&&d.createElement("p",null,"There are no stock images yes. the admin needs to add one."),d.createElement("div",{className:"stockimage-grid mb-3"},a.map((e=>d.createElement(u,{key:e._id,name:e.name,tag:e.tag,photo:e.photo,readOnly:!0})))),d.createElement("p",null,d.createElement("a",{href:"/admin"},"Login / manage the stock image listings."))));t.render("home",{generatedHTML:o})})),p.use((function(e,t,a){t.set("WWW-Authenticate","Basic realm='Stunning Stock App' "),"Basic YWRtaW46cGl4YWxhdGVGeDgwMQ=="==e.headers.authorization?a():(console.log(e.headers.authorization),t.status(401).send("Try Again"))})),p.get("/admin",((e,t)=>{t.render("admin")})),p.get("/api/stockimages",(async(e,t)=>{const a=await c.collection("stockimages").find().toArray();t.json(a)})),p.post("/create-stockimage",n.single("photo"),g,(async(e,a)=>{if(e.file){const t=`${Date.now()}.jpg`;await i(e.file.buffer).jpeg({quality:60}).toFile(l.join("public","uploaded-photos",t)),e.cleanData.photo=t}console.log(e.body);const o=await c.collection("stockimages").insertOne(e.cleanData),n=await c.collection("stockimages").findOne({_id:new t(o.insertedId)});a.send(n)})),p.delete("/stockimage/:id",(async(e,a)=>{"string"!=typeof e.params.id&&(e.params.id="");const o=await c.collection("stockimages").findOne({_id:new t(e.params.id)});o.photo&&r.remove(l.join("public","uploaded-photos",o.photo)),c.collection("stockimages").deleteOne({_id:new t(e.params.id)}),a.send("Good job")})),p.post("/update-stockimage",n.single("photo"),g,(async(e,a)=>{if(e.file){const o=`${Date.now()}.jpg`;await i(e.file.buffer).resize(844,456).jpeg({quality:60}).toFile(l.join("public","uploaded-photos",o)),e.cleanData.photo=o;const n=await c.collection("stockimages").findOneAndUpdate({_id:new t(e.body._id)},{$set:e.cleanData});n.value.photo&&r.remove(l.join("public","uploaded-photos",n.value.photo)),a.send(o)}else c.collection("stockimages").findOneAndUpdate({_id:new t(e.body._id)},{$set:e.cleanData}),a.send(!1)})),async function(){const t=new e("mongodb://root:root1qa21zxjspfer@localhost:27017/StunningStockApp?&authSource=admin");await t.connect(),c=t.db(),p.listen(3e3)}()})()})();