import {combineReducers} from "redux";
import {authReducer} from "./AuthReducer";
import {eventsReducer} from "./EventsReducer";

export default combineReducers({
    authReducer,
    eventsReducer
})