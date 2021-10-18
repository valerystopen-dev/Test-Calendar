const express = require("express")


const eventRouter = express.Router();

eventRouter.get('/', async (req, res, next) => {
    try {
        res.status(200).json({
            data: ([
                {
                    "event": "First event",
                    "time": "8 o'clock"
                },
                {
                    "event": "Second event",
                    "time": "11 o'clock"
                },
                {
                    "event": "Third event",
                    "time": "23 o'clock"
                },
                {
                    "event": "Fourth event",
                    "time": "6 o'clock"
                }
            ])
        });
    } catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
})

eventRouter.post('/', async (req, res) => {
    console.log(req.body)
    try {
        res.status(200).json({
            data: ([
                {
                    "event": "First event",
                    "time": "8 o'clock"
                },
                {
                    "event": "Second event",
                    "time": "11 o'clock"
                },
                {
                    "event": "Third event",
                    "time": "23 o'clock"
                },
                {
                    "event": "Fourth event",
                    "time": "6 o'clock"
                },
                {
                    "event": "Fifth event",
                    "time": "13 o'clock"
                }
            ])
        });
    } catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
})


module.exports = {eventRouter};

