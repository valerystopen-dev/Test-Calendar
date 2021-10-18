import * as Action from "../actions/Actions"

const initialState = {
    token: '',
    error: ''
}

export const authReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case Action.REGISTER_USER_SUCCESS:
            return {
                ...state,
                error: ''
            }
        case Action.REGISTER_USER_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case Action.LOGIN_USER_SUCCESS:
            return {
                ...state,
                token: action.payload,
                error: ''
            }
        case Action.LOGIN_USER_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}