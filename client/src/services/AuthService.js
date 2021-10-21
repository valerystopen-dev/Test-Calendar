import axios from "axios";
import * as Actions from "../redux/actions/AuthActions";

const addUser = (username, password, history) => dispatch => {
    axios.post('http://localhost:8080/api/auth/register', {
        username,
        password
    })
        .then(resp=>{
            dispatch(Actions.createUserSuccess(resp.data.data))
        })
        .then(()=> history.push("/login"))
        .catch(err=>{
            dispatch(Actions.createUserError(err.response.data))
        })
}

const loginUser = (username, password, history) => dispatch => {
     axios.post('http://localhost:8080/api/auth/login', {
        username,
        password
    })
        .then(resp=>{
            localStorage.setItem("token", resp.data.jwt_token);
            dispatch(Actions.loginUserSuccess(resp.data.data))
        })
         .then(()=> history.push("/calendar"))
        .catch(err=>{
             dispatch(Actions.loginUserError(err.response.data))
        })
}

export default {
    addUser,
    loginUser
}