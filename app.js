const express = require('express');
const app = express();
const sequelize = require('./util/database');
const path =require('path')
const fs=require('fs')

const User = require('./models/user')
const Expence = require('./models/expence');
const Order = require("./models/order");
const Forgotpassword=require("./models/forgotpassword");
const downloadedurl=require("./models/downloadedurl");

const cors = require('cors');
const helmet=require('helmet')
const morgan=require('morgan')
const accesslogstream=fs.createWriteStream('access.log',{flags:'a'})
const compression=require('compression')
const bodyParser = require('body-parser');

const userroutes = require('./routes/user');
const expenceroutes = require('./routes/expence');
const purchaseroutes = require('./routes/purchase');
const premiumroutes = require('./routes/premium');
const passwordroutes=require('./routes/forgotpassword');
const downloadroutes=require('./routes/download')

app.use(helmet());
app.use(compression());
app.use(morgan('combined',{stream:accesslogstream}))
app.use(bodyParser.json({ extended: false }));
app.use(cors());

app.use(userroutes);
app.use(expenceroutes);
app.use(purchaseroutes)
app.use(premiumroutes);
app.use(passwordroutes);
//app.use(downloadroutes);
app.use((req,res)=>{
    
   res.sendFile(path.join(__dirname,'public',req.url))
})
User.hasMany(Expence);
Expence.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);
User.hasMany(downloadedurl);
downloadedurl.belongsTo(User);

sequelize.sync()
    .then((responce) => {
        app.listen(3000);
    })
    .catch(err => console.log(err))