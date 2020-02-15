/*
 * Actions and action-creators.
 *
 */
import { auth } from './auth';
export const ATTEMPT_LOGIN = 'ATTEMPT_LOGIN';
export const COMPLETE_LOGIN = 'COMPLETE_LOGIN';
export const LOGIN_BEGIN = 'LOGIN_BEGIN';
export const LOGIN_END = 'LOGIN_END';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const tryLogin = () => {

    return (dispatch) => {

        dispatch(loginBegin());
        return auth.login()
            .then( (response) => {  
                console.log(response);
                dispatch(loginEnd(response));
                return response;
            })
            .catch(error =>
                dispatch(loginError(error))
            );
    };
}
/*
export const tryLogin = () => {

    return (dispatch) => {

        dispatch(loginBegin());
        return auth.login()
            .then(
                (fetchResponse) => {
                    handleLogin(fetchResponse)
                        .then(
                            (response) => {
                                dispatch(loginEnd(response));
                            }
                        );
                }
            );
    };
}
*/
export const loginBegin = () => {

    return {

        type: LOGIN_BEGIN
    };
};

export const loginEnd = (serverResponse) => {

    console.log("Login end.");
    console.log(serverResponse);
    return {

        type: LOGIN_END,
        payload: { serverResponse: JSON.parse(serverResponse) }
    };
};

export const loginError = (error) => {

    return {

        type: LOGIN_ERROR,
        payload: { error: error }
    };
};

export const attemptLogin = () => {

/*
    return {

        type: ATTEMPT_LOGIN,
        payload: {

            url: '/index.php?ctrl=auth&actn=auth',
            data: {
                un: document.getElementById('login-email').value,
                pw: document.getElementById('login-password').value,
            },
            info: {}
        }
    };
*/

    return function(dispatch, getState) {

        return auth.login().then(
            (fetchResponse) => handleLogin(fetchResponse)
        )
        .then(
            (response) => dispatch(completeLogin(response))
        );
    };


//    auth.login(dispatch);
//    return {

//        type: ATTEMPT_LOGIN
//    }
};

export const completeLogin = (serverResponse) => {

    var res = JSON.parse(serverResponse);
    console.log("Res:");
    console.log(res);
    return {

        type: COMPLETE_LOGIN,
        payload: {

            serverResponse: res
        }
    }
}

export const handleLogin = (fetchResponse) => {

//    var serverResponse;
//    var getText = function(text) {

//        console.log(JSON.parse(text));
//        serverResponse = text;
//    }

//    var sr = {};
    console.log("handling the login.");

    return fetchResponse.text();
    /*
    return function() {
        
        return fetchResponse.text().then(
            (serverResponse) =>dispatch(completeLogin(serverResponse))
        );
    }
    */
//    fetchResponse.text().then(function(text) {
//        console.log("JSON: ");
//        console.log(JSON.parse(text));
//        serverResponse = text;
//    };);
//    console.dir("Server response: " + serverResponse);

//    return {

//    }
};

/*
export const attemptAPICall = () => {

    return async.send(
        call.url,
        call.data,
        call.info
    ).then(
        () => dispatch(completeAPICall())
    );
}
*/

