import { combineReducers } from 'redux';
import { auth } from '../auth';
import {
    VALIDATE_FORM_FIELD_BEGIN,
    VALIDATE_FORM_FIELD_END,
    VALIDATE_FORM_FIELD_ERROR,
    RESET_REGISTER_NAME,
    RESET_REGISTER_FORM_STATUS,
    REGISTER_USER_BEGIN,
    REGISTER_USER_END,
    REGISTER_USER_ERROR,
} from '../actions';

export default function register(

    state = {
        form: {
            isBeingSubmitted: false,
            submittedSuccessfully: null,
            hasErrors: false,
            error: null,
            message: '',
            email: null,
        },
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

        case RESET_REGISTER_NAME:
            var field = action.payload.fieldType;
            var newFieldState = {};
            newFieldState[field] = {
                isValidating: false,
                error: null,
                message: null,
                isValid: null,
                serverData: null,
            };
            return Object.assign({}, state, {
                fields: Object.assign({}, state.fields, {
                    [field]: Object.assign({}, state.fields[field], {
                        isValidating: false,
                        error: null,
                        message: null,
                        isValid: null,
                        serverData: null,
                    })
                }),
            });

        case VALIDATE_FORM_FIELD_BEGIN:
            var field = action.payload.fieldType;
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [field]: {
                        ...state.fields[field],
                        isValidating: true,
                        error: null
                    }
                }
            };

        case VALIDATE_FORM_FIELD_END:
            var response = action.payload.serverResponse;
            var field = response.data.fieldType;
            var newFieldState = {};
            newFieldState[field] = {
                isValidating: false,
                isValid: response.data.success,
                message: response.data.message,
                serverData: response.data,
            };
            return Object.assign({}, state, {
                fields: Object.assign({}, state.fields, newFieldState),
            });

        case VALIDATE_FORM_FIELD_ERROR:
            var field = action.payload.error.fieldType;
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

        case REGISTER_USER_BEGIN:
            return Object.assign({}, state, {
                form: Object.assign({}, state.form, {
                    isBeingSubmitted: true,
                }),
            });

        case REGISTER_USER_END:
            var response = action.payload.response;
            return Object.assign({}, state, {
                form: Object.assign({}, state.form, {
                    isBeingSubmitted: false,
                    hasErrors: !response.data.success,
                    message: response.data.message,
                    email: response.data.email,
                    submittedSuccessfully: response.data.success
                    
                }),
            });

        case REGISTER_USER_ERROR:
            var error = action.payload.error;
            return Object.assign({}, state, {
                form: Object.assign({}, state.form, {
                    isBeingSubmitted: false,
                    hasErrors: true,
                    message: error.message,
                    submittedSuccessfully: false
                }),
            });

        case RESET_REGISTER_FORM_STATUS:
            return Object.assign({}, state, {
                form: Object.assign({}, state.form, {
                    isBeingSubmitted: false,
                    submittedSuccessfully: null,
//                    hasErrors: false,
//                    error: null,
//                    message: '',
                    email: null,
                }),
            });

        default:
            return state;
    }
}

