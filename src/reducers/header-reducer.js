import { combineReducers } from 'redux';
import { auth } from '../auth';
import {
    LOGIN_REQUEST_BEGIN,
    LOGIN_REQUEST_END,
    LOGIN_REQUEST_ERROR,
    RESET_LOGIN_MESSAGE
} from '../actions';

export default function header(

    state = {
        error: null,
        loading: false,
        loginMessage: '',
        loginSuccess: null,
        serverData: {},
        userIsLoggedIn: false,
    },
    action
) {

    switch (action.type) {

        case LOGIN_REQUEST_BEGIN:
            return Object.assign({}, state, {
                loading: true,
                error: null
            });

        case LOGIN_REQUEST_END:
            var res = action.payload.serverResponse;
            return Object.assign({}, state, {

                loading: false,
                loginMessage: res.data.serverMessage,
                loginSuccess: res.success,
                serverData: res.data,
                userIsLoggedIn: res.userIsLoggedIn,
            });

        case LOGIN_REQUEST_ERROR:
            return Object.assign({}, state, {
                error: action.payload.error,
                loading: false,
                loginMessage: action.payload.error.message
            });

        case RESET_LOGIN_MESSAGE:
            return Object.assign({}, state, {
                loginMessage: ''
            });

        default:
            return state;
    }
}

