const express = require('express');
const cors  = require('cors');
const dotenv = require('dotenv');
const { urlencoded } = require('express');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.use(cors());

// create application/json parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//routes
const userRoutes = require('./route/user/userRoutes');
const productRoutes = require('./route/product/productRoutes');
const cartRoutes = require('./route/cart/cartRoutes');
const orderRoutes = require('./route/order/orderRoutes');
const stripeRoutes = require('./route/stripe/stripeRoutes');


//connect mongodb
require('./config/DbConnect/dbConnect');

//using all routes
app.use('/',userRoutes);
app.use('/',productRoutes);
app.use('/',cartRoutes);
app.use('/',orderRoutes);
app.use('/',stripeRoutes);


const PORT = process.env.port || 3000;

app.listen(PORT,()=>{
    console.log("server is running on port " + PORT);
})