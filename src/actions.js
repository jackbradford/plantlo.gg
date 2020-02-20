/*
 * Actions and action-creators.
 *
 */
import { auth } from './auth';
import { async } from './async';
import { validator } from './validator';

export const REGISTER_USER_BEGIN = 'REGISTER_USER_BEGIN';
export const REGISTER_USER_END = 'REGISTER_USER_END';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

export const attemptRegisterUser = (formData) => {

    return (dispatch) => {

        dispatch(registerUserBegin());
        return async.request({
            url: 'index.php?ctrl=public&actn=registerUser',
            data: formData
        })
        .then(
            (response) => {
                response = JSON.parse(response);
                dispatch(registerUserEnd(response));
            }
        )
        .catch(
            (error) => {
                console.log("TEST: ");
                console.log(error);
                dispatch(registerUserError(error));
            }
        );
    };
};

export const registerUserBegin = () => {

    return {
        type: REGISTER_USER_BEGIN,
    }
}

export const registerUserEnd = (response) => {

    return {
        type: REGISTER_USER_END,
        payload: { response: response }
    };
};

export const registerUserError = (error) => {

    return {
        type: REGISTER_USER_ERROR,
        payload: {
            error: error,
        }
    };
};


/**
 * Actions for /register
 *
 */
export const VALIDATE_FORM_FIELD_BEGIN = 'VALIATE_FORM_FIELD_BEGIN';
export const VALIDATE_FORM_FIELD_END = 'VALIATE_FORM_FIELD_END';
export const VALIDATE_FORM_FIELD_ERROR = 'VALIATE_FORM_FIELD_ERROR';
export const RESET_REGISTER_NAME = 'RESET_REGISTER_NAME';

/**
 * string options.fieldType
 * Can be one of:
 *  emailAddress
 *  username
 *  password
 *  passwordMatch
 *  name
 *
 * string options.fieldId   
 * The ID of the field to validate.
 *
 * Event options.e
 * The oject representing the Event.
 *
 */
export const attemptValidateFormField = (options) => {

    return (dispatch) => {

        dispatch(validateFormFieldBegin(options));
        return validator.checkField(
            options
        )
        .then(
            (response) => {
                response = JSON.parse(response);
                dispatch(validateFormFieldEnd(response));
            }
        )
        .catch(
            (error) => {
                console.log("TEST: ");
                console.log(error);
                dispatch(validateFormFieldError(error));
            }
        );
    };
};

export const validateFormFieldBegin = (options) => {

    console.log("FIELD_TYPE: " + options.fieldType);
    return {

        type: VALIDATE_FORM_FIELD_BEGIN,
        payload: {

            fieldType: options.fieldType,
            fieldId: options.fieldId,
            matchFieldId: options.matchFieldId,
            e: options.e
        }
    };
};

export const validateFormFieldEnd = (serverResponse) => {

//    console.log("field type: " + options.fieldType);
    console.log("RESPONSE:");
    console.log(serverResponse);
    return {

        type: VALIDATE_FORM_FIELD_END,
        payload: {
//            fieldType: fieldType,
            serverResponse: serverResponse,
        }
    };
};

export const validateFormFieldError = (error) => {

    return {

        type: VALIDATE_FORM_FIELD_ERROR,
        payload: {
//            fieldType: fieldType,
            error: error
        }
        
    };
};

export const resetRegisterName = (options) => {

    return {

        type: RESET_REGISTER_NAME,
        payload: {
            fieldType: options.fieldType
        }
    }
};

/**
 * Action for the app header/navigation
 *
 */
export const LOGIN_REQUEST_BEGIN = 'LOGIN_REQUEST_BEGIN';
export const LOGIN_REQUEST_END = 'LOGIN_REQUEST_END';
export const LOGIN_REQUEST_ERROR = 'LOGIN_REQUEST_ERROR';
export const RESET_LOGIN_MESSAGE = 'RESET_LOGIN_MESSAGE';

export const attemptLoginRequest = () => {

    return (dispatch) => {

        dispatch(loginRequestBegin());
        return auth.login()
            .then(
                (response) => { dispatch(loginRequestEnd(JSON.parse(response))); }
            )
            .catch(
                (error) => { dispatch(loginRequestError(error)); }
            );
    };
}

export const loginRequestBegin = () => {

    return {

        type: LOGIN_REQUEST_BEGIN
    };
};

/**
 * Even though the login REQUEST has ended successfully, the user may still not
 * be logged in.
 */
export const loginRequestEnd = (serverResponse) => {

    return {

        type: LOGIN_REQUEST_END,
        payload: { 
            serverResponse: serverResponse
        }
    };
};

/**
 * This error occurs when the server returns (e.g.) a 500 error. This error
 * does NOT occur when the server denies the login due to invalid credentials,
 * for example.
 */
export const loginRequestError = (error) => {

    return {

        type: LOGIN_REQUEST_ERROR,
        payload: { error: error }
    };
};

export const resetLoginMessage = () => {

    return {

        type: RESET_LOGIN_MESSAGE
    };
};

// TODO: is this used??
export const attemptValidateUsername = () => {

    return (dispatch) => {

        dispatch(validateUsernameBegin());
        return async.request({
            url: 'index.php?ctrl=auth&actn=validateUsername',
            data: {
                username: document.getElementById('register-username').value,
            }
        })
            .then(
                (response) => { dispatch(validateUsernameEnd(JSON.parse(response))); }
            )
            .catch(
                (error) => { dispatch(validateUsernameError(error)); }
            );
    };
};

