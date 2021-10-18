import * as Action from "./Actions"

export const fetchEvents = (events) => ({
    type: Action.FETCH_EVENTS,
    payload: events
})

export const createEvent = (event, time) => ({
    type: Action.ADD_EVENT,
    payload: {event, time}
})