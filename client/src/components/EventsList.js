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
import {Button, ButtonGroup} from "@material-ui/core";
import moment from "moment";
import {useHistory} from "react-router";
import {EditingState, IntegratedEditing} from "@devexpress/dx-react-scheduler";

export const EventsList = () => {

    const events = useSelector((state) => state.eventsReducer.events)

    const history = useHistory();

    const [show, setShow] = useState(false);

    const [title, setTitle] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(EventsService.fetchEvents())
    }, [dispatch])



    function changeStart(){
        let hours = Number.parseInt(start.substr(0,2));
        let minutes = Number.parseInt(start.substr(3,2));
        return (hours-8)*60+minutes;
    }
    function findDuration(){
        let startTime = changeStart();
        let hours = Number.parseInt(end.substr(0,2));
        let minutes = Number.parseInt(end.substr(3,2));
        let endTime = (hours-8)*60+minutes;
        return endTime-startTime;
    }
    function changeStart2(startTime){
        let hours =(startTime-startTime%60)/60+8;
        let minutes = startTime%60;
        return new Date(2021, 10, 22, hours, minutes)
    }
    function changeEnd2(startTime, duration){
        let endTime =duration + startTime
        let hours =(endTime-endTime%60)/60+8;
        let minutes = endTime%60;
        return new Date(2018, 10, 22, hours, minutes)
    }

    const currentDate = moment();
    let date = currentDate.date();

    const makeTodayAppointment = (startDate, endDate) => {
        const nextStartDate = moment(startDate)
            .year(currentDate.year())
            .month(currentDate.month())
            .date(date);
        const nextEndDate = moment(endDate)
            .year(currentDate.year())
            .month(currentDate.month())
            .date(date);

        return {
            startDate: nextStartDate.toDate(),
            endDate: nextEndDate.toDate(),
        };
    };

    function hideFields(key,value)
    {
        if (key=="_id") return undefined;
        else if (key=="created_by") return undefined;
        else if (key=="__v") return undefined;
        else return value;
    }

    function downloadJsonFile () {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(events, hideFields)], {type: 'json'});
        element.href = URL.createObjectURL(file);
        element.download = "myEvents.json";
        document.body.appendChild(element);
        element.click();
    }

    return (
        <div>

            <Paper>
            <Scheduler
                data={events && events.map(({ start, duration, id=0, ...restArgs}) => {
                    id=restArgs._id;
                    const result = {
                        ...makeTodayAppointment(changeStart2(start), changeEnd2(start, duration)),
                        id,
                        ...restArgs,
                    };
                    return result;
                })}
                >
                <EditingState
                    onCommitChanges={(id)=>{
                        (dispatch(EventsService.deleteEvent(id)));
                    }}
                />
                <IntegratedEditing />
                <DayView
                        startDayHour={8}
                        endDayHour={17}
                    />
                <Appointments/>
                    <AppointmentTooltip
                        showDeleteButton/>
                </Scheduler>

            </Paper>
            <br/>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group size="lg" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                autoFocus
                                type="string"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="start">
                            <Form.Label>Start at</Form.Label>
                            <Form.Control
                                type="time"
                                value={start}
                                onChange={(e) => setStart(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="end">
                            <Form.Label>End At</Form.Label>
                            <Form.Control
                                type="time"
                                value={end}
                                onChange={(e) => setEnd(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" style={{marginLeft: '20px'}} onClick=
                        {()=> {
                            (dispatch(EventsService.addEvent(title, changeStart(), findDuration())));
                            handleClose()
                            }}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
            <Button variant="contained" size="large" color="primary" style={{marginLeft:"1%"}} onClick={handleShow}>ADD</Button>
            <Button variant="contained" size="large" color="primary" style={{marginLeft:"1%"}} onClick={()=>{
                downloadJsonFile();
            }}>EXPORT</Button>
            <Button variant="contained" size="large" color="primary" style={{float: "right", marginRight:"1%"}}onClick={()=> {
                localStorage.clear();
                history.push('/register')
            }}>LOGOUT</Button>
        </div>
    );
};

export default {
    EventsList
}