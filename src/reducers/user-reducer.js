import { combineReducers } from 'redux';
import { auth } from '../auth';
import {
    LOGIN_REQUEST_BEGIN,
    LOGIN_REQUEST_END,
    LOGIN_REQUEST_ERROR,
    RESET_LOGIN_MESSAGE,
    CHECK_LOGIN_BEGIN,
    CHECK_LOGIN_END,
    CHECK_LOGIN_ERROR
} from '../actions';

export default function user(

    state = {
        details: {
            email: null,
            isLoggedIn: null,
            firstName: null,
            lastName: null,
            userId: null,
            username: null
            
        },
        loginRequest: {
            error: null,
            loading: false,
            message: '',
        },
        loginCheck: {
            error: null,
            loading: false,
            message: ''
        },
    },
    action
) {

    switch (action.type) {

        case CHECK_LOGIN_BEGIN:
            return {
                ...state,
                loginCheck: {
                    ...state.loginCheck,
                    error: null,
                    loading: true,
                }
            };

        case CHECK_LOGIN_END:
            var response = action.payload.response;
            console.log("STATE");
            console.log(state);
            return {
                ...state,
                details: {
                    ...state.details,
                    email: response.data.email,
                    isLoggedIn: response.data.isLoggedIn,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    userId: response.data.userId,
                    username: response.data.username,
                    
                },
                loginCheck: {
                    ...state.loginCheck,
                    loading: false,
                    message: response.data.message,
                }
            };

        case CHECK_LOGIN_ERROR:
            return {
                ...state,
                loginCheck: {
                    ...state.loginCheck,
                    error: action.payload.error,
                    loading: false,
                    message: action.payload.error.message
                }
            };

        case LOGIN_REQUEST_BEGIN:
            return {
                ...state,
                loginRequest: {
                    ...state.loginRequest,
                    loading: true,
                    error: null
                }
            };

        case LOGIN_REQUEST_END:
            var res = action.payload.serverResponse;
            console.log("RESPONSE");
            console.log(res);
            return {
                ...state,
                details: {
                    ...state.details,
                    email: res.data.email,
                    isLoggedIn: res.userIsLoggedIn,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    userId: res.data.userId,
                    username: res.data.username,
                },
                loginRequest: {
                    ...state.loginRequest,
                    loading: false,
                    message: res.data.message,

                }
            };

        case LOGIN_REQUEST_ERROR:
            return {
                ...state,
                loginRequest: {
                    ...state.loginRequest,
                    error: action.payload.error,
                    loading: false,
                    message: action.payload.error.message
                }
            };

        case RESET_LOGIN_MESSAGE:
            return {
                ...state,
                loginRequest: {
                    ...state.loginRequest,
                    message: ''
                }
            };

        default:
            return state;
    }
}

