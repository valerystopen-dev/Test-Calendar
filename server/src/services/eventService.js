const {eventModel} = require('../models/eventModel');
const {getUser} = require('./userService');


const getEvents = async (token) => {
    try {
        const User = await getUser(token);
        if (!User) {
            throw new Error("Wrong token")
        }
        let loads = await eventModel.find({created_by: User._id});
        return loads
    } catch (e) {
        console.log(e.message);
        return null;
    }
}

const addEvent = async (token, start, duration, title) => {
    try {
        const User = await getUser(token);
        if (!User) {
            throw new Error("Wrong token")
        }
        const Event = new eventModel({
            created_by: User._id,
            title: title,
            start:start,
            duration:duration
        });
        await Event.save();
        return 1;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}

const deleteEvent = async (token, _id) => {
    try {
        const User = await getUser(token);
        if (!User) {
            throw new Error("Wrong token")
        }
        const Event = await eventModel.findOne({created_by: User._id, _id: _id});
        if (!Event) {
            throw new Error("Wrong id")
        }
        await eventModel.deleteOne({_id: _id});
        return 1;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}



module.exports = {getEvents, addEvent, deleteEvent}

