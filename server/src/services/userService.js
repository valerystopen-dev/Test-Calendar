const {userModel} = require ('../models/userModel');
const jsontoken = require("jsonwebtoken");

const tokenVerification = (authorization) => {
    if (!authorization) {
        return null;
    }
    const [, token] = authorization.split(" ");
    if (!token) {
        return null;
    }
    try {
        const tokenPayload = jsontoken.verify(token, "key");
        const User = {
            _id: tokenPayload._id,
            username: tokenPayload.username,
            created_date: tokenPayload.created_date,
        };
        return User;
    } catch (err) {
        return null;
    }
};

const getUser = async (authorization)=>{
    try{
        const User = await tokenVerification(authorization);
        if(!User){
            throw new Error("Wrong token")
        }
        const User2 = await userModel.findOne({username: User.username});
        if(!User2){
            throw new Error("Wrong token")
        }
        return User;
    }catch (e){
        console.log(e.message);
        return null;
    }
}

module.exports = {getUser}
