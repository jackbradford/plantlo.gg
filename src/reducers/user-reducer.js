import { combineReducers } from 'redux';
import { auth } from '../auth';
import {
    CHECK_LOGIN_BEGIN,
    CHECK_LOGIN_END,
    CHECK_LOGIN_ERROR
} from '../actions';

export default function user(

    state = {
        checkingLogin: false,
        email: null,
        isLoggedIn: null,
        firstName: null,
        lastName: null,
        message: '',
        userId: null,
        username: null,
    },
    action
) {

    switch (action.type) {

        case CHECK_LOGIN_BEGIN:
            return {
                ...state,
                checkingLogin: true
            };

        case CHECK_LOGIN_END:
            var response = action.payload.response;
            console.log("STATE");
            console.log(state);
            return {
                ...state,
                checkingLogin: false,
                email: response.data.email,
                isLoggedIn: response.data.isLoggedIn,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                userId: response.data.userId,
                username: response.data.username
            };

        case CHECK_LOGIN_ERROR:
            return {
                ...state,
                checkingLogin: false,
                message: action.payload.error.message
            };

        default:
            return state;
    }
}

