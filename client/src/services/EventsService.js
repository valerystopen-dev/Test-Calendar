import axios from "axios";
import * as Actions from "../redux/actions/EventsActions";

const fetchEvents = () => dispatch => {
    const token = localStorage.getItem("token");
    axios.get('http://localhost:8080/api/events',{headers: {Authorization: token}})
        .then(resp => {
            dispatch(Actions.fetchEvents(resp.data))
        });
}

const addEvent = (title, start, duration) => dispatch => {
    const token = localStorage.getItem("token")
    axios.post('http://localhost:8080/api/events', {
        token,
        title,
        start,
        duration
    })
        .then(resp=>dispatch(Actions.fetchEvents(resp.data.data)))
}

export default {
    fetchEvents,
    addEvent
}