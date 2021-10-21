import * as React from 'react';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import EventsService from "../services/EventsService";
import Paper from '@material-ui/core/Paper';
import {Form, Modal} from "react-bootstrap";

import {
    Scheduler,
    DayView,
    Appointments,
    AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import {Button} from "@material-ui/core";


export const EventsList = () => {

    const events = useSelector((state) => state.eventsReducer.events)

    const [show, setShow] = useState(false);

    const [title, setTitle] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(EventsService.fetchEvents())
    }, [dispatch])


    return (
        <div>
            TEST
            <ul>
                {events.length > 0 &&
                events.map((event) => (
                    <li>{event.event}</li>
                ))
                }
            </ul>
            <button onClick={()=>(dispatch(EventsService.addEvent('test event','test time')))}>Update</button>
            <Paper>
            <Scheduler
                >
                    <DayView
                        startDayHour={8}
                        endDayHour={13}
                    />
                    <Appointments />
                    <AppointmentTooltip />
                </Scheduler>
            </Paper>
            <br/>
            <Button variant="contained" size="large" color="primary" onClick={handleShow}>
            Add
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                autoFocus
                                type="string"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>Start at</Form.Label>
                            <Form.Control
                                autoFocus
                                type="time"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>End At</Form.Label>
                            <Form.Control
                                autoFocus
                                type="time"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default {
    EventsList
}