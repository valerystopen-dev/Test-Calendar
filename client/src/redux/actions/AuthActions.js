import * as Action from "./Actions"

export const createUserSuccess = (username, password) => ({
    type: Action.REGISTER_USER_SUCCESS,
    payload: {username, password}
})

export const createUserError = (error) => ({
    type: Action.REGISTER_USER_ERROR,
    payload: error
})

export const loginUserSuccess = (token) => ({
    type: Action.LOGIN_USER_SUCCESS,
    payload: {token}
})

export const loginUserError = (error) => ({
    type: Action.LOGIN_USER_ERROR,
    payload: error
})

