const express = require("express")
const {getUser} = require("../services/userService")

const userRouter = express.Router();

userRouter.get("/me", async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        const User = await getUser(authorization);
        if (!User) {
            res.status(400).json({message: "Wrong token"})
        } else {
            res.status(200).json({"user": User});
        }
    } catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
})
