const {userModel} = require('../models/userModel');
const bcrypt = require('bcrypt');
const jsontoken = require('jsonwebtoken');

const register = async (username, password) => {
    try {
        if (await userModel.findOne({username: username})) {
            throw new Error("Username already exists")
        }
        const User = new userModel({username: username, password: await bcrypt.hash(password, 10)});
        await User.save();
        return 1;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}

const logIn = async (username, password) => {
    try {
        const User = await userModel.findOne({username: username});
        if (!User) {
            throw new Error("Wrong username");
        }
        const isValid = await bcrypt.compare(password, User.password);
        if (!isValid) {
            throw new Error("Wrong password");
        }
        return jsontoken.sign({_id: User._id, username: username, created_date: User.created_date}, "key");
    } catch (e) {
        console.log(e.message);
        return null;
    }
}


module.exports = {register, logIn};

