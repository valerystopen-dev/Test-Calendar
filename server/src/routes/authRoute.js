const express = require("express")
const {register, logIn} = require('../services/authService')


const authRouter = express.Router();

authRouter.get('/', async (req, res)=>{
    res.status(200).json({message: "GET"})
})

authRouter.post('/register', async (req, res)=>{
    try{
        const {username, password} = req.body;
        if(username && password) {
            const result = await register(username, password);
            if (result == null) {
                res.status(400).json(`User with username: ${username} already exists`)
            } else {
                res.status(200).json({username: username, password: password});
            }
        }
        else{
            res.status(400).json("No username or password");
        }

    }catch (e){
        res.status(500).json({message:`${e.message}`});
    }
})

authRouter.post("/login", async (req, res)=>{
    try {
        const {username, password} = req.body;
        if (username && password) {
            const token = await logIn(username, password);
            if (!token) {
                res.status(400).json("Wrong username or password");
            } else {
                res.status(200).json({"jwt_token": token});
            }
        }
        else{
            res.status(400).json("No username or password");
        }
    }
    catch(e){
        res.status(500).json({message:`${e.message}`});
    }
})

module.exports = {authRouter};