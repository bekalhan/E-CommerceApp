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


//connect mongodb
require('./config/DbConnect/dbConnect');

//using all routes


const PORT = process.env.port || 3000;

app.listen(PORT,()=>{
    console.log("server is running on port " + PORT);
})