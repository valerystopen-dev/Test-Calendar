import * as React from 'react';
import {useEffect, useState} from "react";
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import EventsService from "../services/EventsService";

export const EventsList = () => {

    const events = useSelector((state) => state.eventsReducer.events)

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
        </div>
    );
};

export default {
    EventsList
}