const express = require("express")
const {getEvents, addEvent, deleteEvent} = require("../services/eventService")

const eventRouter = express.Router();

eventRouter.get("/", async (req, res) => {
    try {
        const token = req.header('Authorization');
        const events = await getEvents(token);
        if (!events) {
            res.status(400).json("Client error")
        } else {
            res.status(200).json(events);
        }
    } catch (e) {
        res.status(500).json(e.message);
    }
})

eventRouter.post("/", async (req, res) => {
    try {
        const {token, start, duration, title} = req.body;
        if(!token || !start || !duration || !title){
            res.status(400).json( "Wrong data")
        }
        if(duration<0){
            res.status(400).json( "Wrong data")
        }
        const event = await addEvent(token, start, duration, title);
        if (!event) {
            res.status(400).json( "Wrong data")
        } else {
            res.status(200).json("Event created successfully");
        }
    } catch (e) {
        res.status(500).json(e.message);
    }
})

eventRouter.delete("/:_id", async (req, res) => {
    try {
        const {_id, token} = req.body;
        const del = await deleteEvent(token, _id);
        if (!del) {
            res.status(400).json({message: "Cannot delete"})
        } else {
            res.status(400).json({message: "Event deleted successfully"})
        }
    } catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
})




module.exports = {eventRouter};

