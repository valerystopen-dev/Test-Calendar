import * as Action from "../actions/Actions"

const initialState = {
    events: []
}

export const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.FETCH_EVENTS:
            return {
                events: action.payload,
            }
        default:
            return state
    }
}