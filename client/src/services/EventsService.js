import axios from "axios";
import * as Actions from "../redux/actions/EventsActions";

const fetchEvents = () => dispatch => {
    axios.get('http://localhost:8080/api/events')
        .then(resp => dispatch(Actions.fetchEvents(resp.data.data)));
}

const addEvent = (event, name) => dispatch => {
    axios.post('http://localhost:8080/api/events', {
        event,
        name
    })
        .then(resp=>dispatch(Actions.fetchEvents(resp.data.data)))
}

export default {
    fetchEvents,
    addEvent
}