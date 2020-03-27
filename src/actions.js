/*
 * Actions and action-creators.
 *
 */
import { auth } from './auth';
import { async } from './async';
import { validator } from './validator';

export const SUBMIT_NEW_INDIVIDUAL_BEGIN = 'SUBMIT_NEW_INDIVIDUAL_BEGIN';
export const SUBMIT_NEW_INDIVIDUAL_END = 'SUBMIT_NEW_INDIVIDUAL_END';
export const SUBMIT_NEW_INDIVIDUAL_ERROR = 'SUBMIT_NEW_INDIVIDUAL_ERROR';

export const trySubmitNewIndividual = (values) => {

    return (dispatch) => {

        dispatch(submitNewIndividualBegin());
        return async.request({
            url: '/index.php?ctrl=public&actn=addNewIndividual',
            data: values,
        }).then(
            (serverResponse) => {
                var response = JSON.parse(serverResponse);
                dispatch(submitNewIndividualEnd(response));
            }
        )
        .catch (
            (error) => {
                dispatch(submitNewIndividualError(error));
            }
        )
    }
}

export const submitNewIndividualBegin = () => {

    return {
        type: SUBMIT_NEW_INDIVIDUAL_BEGIN,
    };
}

export const submitNewIndividualEnd = (response) => {

    return {
        type: SUBMIT_NEW_INDIVIDUAL_END,
        payload: response.data
    };
}

export const submitNewIndividualError = (error) => {

    return {
        type: SUBMIT_NEW_INDIVIDUAL_ERROR,
        payload: {
            error: error
        }
    }
}
export const UPDATE_NEW_INDIVIDUAL_NEW_CONDITION = 'UPDATE_NEW_INDIVIDUAL_NEW_CONDITION';
export const updateNewIndividualNewCondition = (condition, field, value) => {

    return {
        type: UPDATE_NEW_INDIVIDUAL_NEW_CONDITION,
        payload: {
            condition: condition,
            field: field,
            value: value,
        }
    }
}

export const UPDATE_NEW_INDIVIDUAL_FIELD = 'UPDATE_NEW_INDIVIDUAL_FIELD';

export const updateNewIndividualField = (fieldName, value) => {

    return {
        type: UPDATE_NEW_INDIVIDUAL_FIELD,
        payload: {
            fieldName: fieldName,
            value: value,
        }
    }
}

export const NEW_INDIVIDUAL_UPDATE_REQUIRED_FIELDS = 'NEW_INDIVIDUAL_UPDATE_REQUIRED_FIELDS';
export const TOGGLE_ADD_NEW_PLANT_CONDITION = 'TOGGLE_ADD_NEW_PLANT_CONDITION';

export const toggleAddNewPlantCondition = (fieldName) => {

    return {
        type: TOGGLE_ADD_NEW_PLANT_CONDITION,
        payload: {
            fieldName: fieldName,
        }
    }
}

export const updateRequiredFieldsForNewIndividual = (operation, array) => {

    return {
        type: NEW_INDIVIDUAL_UPDATE_REQUIRED_FIELDS,
        payload: {
            operation: operation,
            requiredFields: array,
        }
    }
};

export const RESET_MENU_EXPAND = 'RESET_MENU_EXPAND';

export const resetMenuExpand = () => {

    return {
        type: RESET_MENU_EXPAND,
    };
};

export const LOAD_USER_AND_APP_DATA_BEGIN = 'LOAD_USER_AND_APP_DATA_BEGIN';
export const LOAD_USER_AND_APP_DATA_END = 'LOAD_USER_AND_APP_DATA_END';
export const LOAD_USER_AND_APP_DATA_ERROR = 'LOAD_USER_AND_APP_DATA_ERROR';

export const tryLoadUserAndAppData = (userId) => {

    return (dispatch) => {

        dispatch(loadUserAndAppDataBegin());
        return async.request({
            url: '/index.php?ctrl=public&actn=getUserAndAppData',
            data: {},
        }).then(
            (serverResponse) => {
                var response = JSON.parse(serverResponse);
                dispatch(loadUserAndAppDataEnd(response));
            }
        )
        .catch (
            (error) => {
                dispatch(loadUserAndAppDataError(error));
            }
        )
    }
}

export const loadUserAndAppDataBegin = () => {

    return {
        type: LOAD_USER_AND_APP_DATA_BEGIN,
    };
}

export const loadUserAndAppDataEnd = (response) => {

    return {
        type: LOAD_USER_AND_APP_DATA_END,
        payload: response.data
    };
}

export const loadUserAndAppDataError = (error) => {

    return {
        type: LOAD_USER_AND_APP_DATA_ERROR,
        payload: {
            error: error
        }
    }
}

export const CHECK_LOGIN_BEGIN = 'CHECK_LOGIN_BEGIN';
export const CHECK_LOGIN_END = 'CHECK_LOGIN_END';
export const CHECK_LOGIN_ERROR = 'CHECK_LOGIN_ERROR';

export const checkUserIsLoggedIn = () => {

    return (dispatch) => {

        dispatch(checkLoginBegin());
        return async.request({
            url: '/index.php?ctrl=public&actn=checkUserIsLoggedIn',
            data: {}
        }).then(
            (serverResponse) => {
                var response = JSON.parse(serverResponse);
                dispatch(checkLoginEnd(response));
            }
        )
        .catch (
            (error) => {
                dispatch(checkLoginError(error));
            }
        )
    }
}

export const checkLoginBegin = () => {

    return {
        type: CHECK_LOGIN_BEGIN,
    }
}

export const checkLoginEnd = (response) => {

    return {
        type: CHECK_LOGIN_END,
        payload: {
            response: response
        }
    }
}

export const checkLoginError = (error) => {

    return {
        type: CHECK_LOGIN_ERROR,
        payload: {
            error: error
        }
    }
}

export const ACTIVATE_USER_BEGIN = 'ACTIVATE_USER_BEGIN';
export const ACTIVATE_USER_END = 'ACTIVATE_USER_END';
export const ACTIVATE_USER_ERROR = 'ACTIVATE_USER_ERROR';
export const GENERATE_NEW_ACTIVATION_LINK_BEGIN = 'GENERATE_NEW_ACTIVATION_LINK_BEGIN';
export const GENERATE_NEW_ACTIVATION_LINK_END = 'GENERATE_NEW_ACTIVATION_LINK_END';
export const GENERATE_NEW_ACTIVATION_LINK_ERROR = 'GENERATE_NEW_ACTIVATION_LINK_ERROR';
export const RESET_GENERATE_NEW_ACTIVATION_LINK = 'RESET_GENERATE_NEW_ACTIVATION_LINK';

export const resetGenerateNewActivationLink = () => {

    return {
        type: RESET_GENERATE_NEW_ACTIVATION_LINK
    };
}

export const attemptGenerateNewActivationLink = (userId) => {

    return (dispatch) => {
        dispatch(generateNewActivationLinkBegin(userId));
        return async.request({
            url: '/index.php?ctrl=public&actn=generateNewActivationLink',
            data: {
                userId: userId,
            }
        }).then(
            (serverResponse) => {
                var response = JSON.parse(serverResponse);
                dispatch(generateNewActivationLinkEnd(
                    response.data.success,
                    response.data.message,
                ));
            }
        )
        .catch (
            (error) => {
                dispatch(generateNewActivationLinkError(error));
            }
        )
    }
}

export const generateNewActivationLinkBegin = (userId) => {

    return {
        type: GENERATE_NEW_ACTIVATION_LINK_BEGIN,
        payload: {
            userId: userId
        }
    };
};

export const generateNewActivationLinkEnd = (success, message) => {

    return {
        type: GENERATE_NEW_ACTIVATION_LINK_END,
        payload: {
            success: success,
            message: message,
        }
    };
};

export const generateNewActivationLinkError = (error) => {

    return {
        type: GENERATE_NEW_ACTIVATION_LINK_ERROR,
        payload: {
            error: error
        }
    };
};

export const attemptActivateUser = (userId, activationCode) => {

    return (dispatch) => {
        dispatch(activateUserBegin(userId, activationCode));
        return async.request({
            url: '/activate/' + userId + '/' + activationCode,
            data: {
                userId: userId,
                activationCode: activationCode
            }
        }).then(
            (serverResponse) => {
                var response = JSON.parse(serverResponse);
                dispatch(activateUserEnd(
                    response.data.success,
                    response.data.userId,
                    response.data.message
                ));
            }
        )
        .catch(
            (error) => {
                dispatch(activateUserError(error));
            }
        );
    };
};

export const activateUserBegin = (userId, code) => {

    return {
        type: ACTIVATE_USER_BEGIN,
        payload: {
            userId: userId,
            activationCode: code,
        }
    };
};

export const activateUserEnd = (success, userId, message) => {

    return {
        type: ACTIVATE_USER_END,
        payload: {
            success: success,
            userId: userId,
            message: message,
        }
    };
};

export const activateUserError = (error) => {

    return {
        type: ACTIVATE_USER_ERROR,
        payload: { error: error }
    };
};

export const REGISTER_USER_BEGIN = 'REGISTER_USER_BEGIN';
export const REGISTER_USER_END = 'REGISTER_USER_END';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
export const RESET_REGISTER_FORM_STATUS = 'RESET_REGISTER_FORM_STATUS';
export const RESET_REGISTER_FORM = 'RESET_REGISTER_FORM';
export const TOGGLE_MENU = 'TOGGLE_MENU';

export const resetForm = () => {

    return { type: RESET_REGISTER_FORM, }
}

export const resetFormStatus = () => {

    return {
        type: RESET_REGISTER_FORM_STATUS,
    }
}

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
                dispatch(validateFormFieldError(error));
            }
        );
    };
};

export const validateFormFieldBegin = (options) => {

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

    return {

        type: VALIDATE_FORM_FIELD_END,
        payload: {
            serverResponse: serverResponse,
        }
    };
};

export const validateFormFieldError = (error) => {

    return {

        type: VALIDATE_FORM_FIELD_ERROR,
        payload: {
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

export const attemptLoginRequest = (history) => {

    return (dispatch) => {

        dispatch(loginRequestBegin());
        return auth.login()
            .then(
                (response) => { 
                    response = JSON.parse(response);
                    dispatch(loginRequestEnd(response));
                    if (response.success === true) {
                        history.push('/');
                        dispatch(toggleMenu());
                        dispatch(tryLoadUserAndAppData());
                    }
                }
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

export const toggleMenu = () => {

    return {

        type: TOGGLE_MENU,
    };
}

