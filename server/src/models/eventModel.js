const mongoose = require('mongoose')


const eventSchema = new mongoose.Schema({
    created_by: {type:String, required:true},
    start: {type:Number, required:true},
    duration: {type: Number, required: true},
    title: {type: String, required: true,},
});

const eventModel = mongoose.model(`events`, eventSchema);

module.exports = {eventModel};
