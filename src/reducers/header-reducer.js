import { combineReducers } from 'redux';
import { auth } from '../auth';
import {
    ATTEMPT_LOGIN,
    COMPLETE_LOGIN,
    LOGIN_BEGIN,
    LOGIN_END,
    LOGIN_ERROR
} from '../actions';

function loginError(state = {}, action) {

//    return Object.keys(state).map( ());
}

export default function header(

/*    state = {
        loginSuccess: null,
        userIsLoggedIn: false,
        loginMessage: 'Test',
        loading: false,
        error: null
    },
*/
    state = {},
    action
) {

    switch (action.type) {

        case ATTEMPT_LOGIN:
//            return Object.assign({}, state, {
//                loginAttempt: action.payload
//            });
            return state;

        case COMPLETE_LOGIN:
            console.log('complete_login');
            console.log(state.serverResponse);
            console.log(action.payload.serverResponse);
            return Object.assign({}, state, {
                serverResponse: action.payload.serverResponse
            });

        case LOGIN_BEGIN:
            return Object.assign({}, state, {
                loading: true,
                error: null
            });
//            return {
//                ...state,
//                loading: true,
//                error: null
//            };

        case LOGIN_END:
            console.log('state/payload');
            console.log(state);
            console.log(action.payload.serverResponse);
            var res = action.payload.serverResponse;
            return Object.assign({}, state, {

                loading: false,
                loginSuccess: res.success,
                userIsLoggedIn: res.userIsLoggedIn,
                loginMessage: res.data.serverMessage
            });
//            return Object.assign({}, state, {
//                loading: false,
//                serverResponse: action.payload.serverResponse
//            });
/*
            return {
                ...state,
                loading: false,
                loginSuccess: res.success,
                userIsLoggedIn: res.userIsLoggedIn,
                loginMessage: res.data.serverMessage
            };
*/

        case LOGIN_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: action.payload.error
            });

        default:
            return state;
    }
}

