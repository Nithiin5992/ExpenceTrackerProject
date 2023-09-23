const express = require('express');
const app = express();
const sequelize = require('./util/database');
const path = require('path')
const fs = require('fs')

const user = require('./models/user')
const expence = require('./models/expence');
const order = require("./models/order");
const forgotPassword = require("./models/forgotpassword");
const downloadedUrl = require("./models/downloadedurl");

const cors = require('cors');

const morgan = require('morgan')
const accessLogStream = fs.createWriteStream('access.log', { flags: 'a' })
const compression = require('compression')
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const expenceRoutes = require('./routes/expence');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const passwordRoutes = require('./routes/forgotpassword');
const downloadRoutes = require('./routes/download')


app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }))
app.use(bodyParser.json({ extended: false }));
app.use(cors());

app.use(userRoutes);
app.use(expenceRoutes);
app.use(purchaseRoutes)
app.use(premiumRoutes);
app.use(passwordRoutes);
app.use(downloadRoutes)
//app.use(downloadRoutes);
app.use((req, res) => {

    res.sendFile(path.join(__dirname, 'public', req.url))
})
user.hasMany(expence);
expence.belongsTo(user);
user.hasMany(order);
order.belongsTo(user);
user.hasMany(forgotPassword);
forgotPassword.belongsTo(user);
user.hasMany(downloadedUrl);
downloadedUrl.belongsTo(user);

sequelize.sync()
    .then((responce) => {
        app.listen(3000);
    })
    .catch(err => console.log(err))