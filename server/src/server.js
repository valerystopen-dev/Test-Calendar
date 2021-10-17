const express = require('express')
const mongoose = require('mongoose')
const cors  = require('cors');

const {eventRouter} = require("./routes/eventRoute");
const app = express();

app.use(cors())
app.use("/api/events", eventRouter);

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
