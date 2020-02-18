import { combineReducers } from 'redux';
import { auth } from '../auth';
import {
    VALIDATE_FORM_FIELD_BEGIN,
    VALIDATE_FORM_FIELD_END,
    VALIDATE_FORM_FIELD_ERROR,
} from '../actions';

export default function register(

    state = {
        fields: {
            emailAddress: {
                error: null,
                isValid: null,
                isValidating: false,
                message: '',
                serverData: {},
            },
            username: {
                error: null,
                isValid: null,
                isValidating: false,
                message: '',
                serverData: {},
            },
            password: {
                error: null,
                isValid: null,
                isValidating: false,
                message: '',
                serverData: {},
            },
            passwordMatch: {
                error: null,
                isValid: null,
                isValidating: false,
                message: '',
                serverData: {},
            },
            firstName: {
                error: null,
                isValid: null,
                isValidating: false,
                message: '',
                serverData: {},
            },
            lastName: {
                error: null,
                isValid: null,
                isValidating: false,
                message: '',
                serverData: {},
            },
        }
    },
    action
) {

    switch (action.type) {

        case VALIDATE_FORM_FIELD_BEGIN:
            var field = action.payload.fieldType;
            var newFieldState = {};
            newFieldState[field] = {
                isValidating: true,
                error: null
            };
            console.log('FIELD TEST');
            console.log(state.fields[field]);
            var updatedFields = Object.assign({}, state.fields, newFieldState);
            return Object.assign({}, state, {

                fields: updatedFields
            });

        case VALIDATE_FORM_FIELD_END:
            var field = action.payload.fieldType;
            var newFieldState = {};
            newFieldState[field] = {
                isValidating: false,
                isValid: res.data.isValid,
                message: res.data.message,
                serverData: res.data,
            };
            return Object.assign({}, state, {
                fields: Object.assign({}, state.fields, newFieldState),
            });

        case VALIDATE_FORM_FIELD_ERROR:
            var field = action.payload.fieldType;
            var newFieldState = {};
            newFieldState[field] = {
                error: action.payload.error,
                isValid: false,
                isValidating: false,
                message: action.payload.error.message
            };
            return Object.assign({}, state, {
                fields: Object.assign({}, state.fields, newFieldState),
            });

        default:
            return state;
    }
}

