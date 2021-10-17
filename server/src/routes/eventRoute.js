const express = require("express")


const eventRouter = express.Router();

eventRouter.get('/', async(req, res, next)=>{
    try{
        res.status(200).json({message:`GET`});

    }catch(e){
        res.status(500).json({message:`${e.message}`});
    }
})



module.exports = {eventRouter};

