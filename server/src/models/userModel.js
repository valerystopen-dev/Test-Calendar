const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true,},
    password: {type: String, required: true,},
    created_date: {type: Date, default: Date.now(),}
});

const userModel = mongoose.model(`users`, userSchema);

module.exports = {userModel};
