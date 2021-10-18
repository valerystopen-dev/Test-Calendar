const express = require('express')
const mongoose = require('mongoose')
const cors  = require('cors');
const morgan = require('morgan');


const {eventRouter} = require("./routes/eventRoute");
const {authRouter} = require("./routes/authRoute");
const app = express();

app.use(cors())
app.use(morgan("tiny"));
app.use(express.json())
app.use("/api/events", eventRouter);
app.use("/api/auth", authRouter);

const MONGO_URL = 'mongodb://localhost:27017/calendar'
async function Start (){
    try{
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(8080);
        console.log("DB connected")
    }catch (e)
    {
        console.log("DB not connected");
    }
}

Start() ;
