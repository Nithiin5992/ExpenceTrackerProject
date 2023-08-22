const express=require('express');
const app=express();
const bodyParser=require("body-parser");
const sequalize=require("./util/database");
const orderroutes=require("./routes/orderroutes")
var cors=require("cors");
app.use(bodyParser.json({extended: false}));
app.use(cors())
app.use(orderroutes)
sequalize.sync()
.then(()=>{
    app.listen(8000)
})
.catch(err=>(console.log(err)))
