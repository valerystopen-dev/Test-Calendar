import * as Action from "./Actions"

export const fetchEvents = (events) => ({
    type: Action.FETCH_EVENTS,
    payload: events
})

