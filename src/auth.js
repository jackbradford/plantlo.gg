/**
 * auth.js
 * This file provides a means to authorize users.
 *
 */
import { mediator } from './mediator';
import { bindActionCreators } from 'redux';
import { completeLogin as cl } from './actions';

var auth = (function() {

    /**
     * auth.login()
     * Attempt to log a user into the site. Works with completeLogin(), which
     * handles the response from the server.
     *
     * return void
     */
    var attemptLogin = function(dispatch) {

//        response = undefined;
        console.log('Attempting async login...');
        var url = '/index.php?ctrl=auth&actn=auth';
        var data = encodeURIComponent(JSON.stringify({
        
            un: document.getElementById('login-email').value,
            pw: document.getElementById('login-password').value,
        }));
        return fetch(url, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "data=" + data + "&async=1"

        })
            .then(handleErrors)
            .then( (response) => { 
            
                console.log("TEST");
                console.log(response);
                return response.text();
            });
/*        mediator.publish('async-request', completeLogin, {
//            url: '/auth',
            url: '/index.php?ctrl=auth&actn=auth',
            data: {
                un: document.getElementById('login-email').value,
                pw: document.getElementById('login-password').value,
            },
            info: {
                test: 'sample-text',
                dispatch: dispatch
            }
        });
//        while (response == undefined) {}
//        return response;
*/
    };

    /**
     * auth.completeLogin()
     * Handle the response from plantlo.gg/auth.
     * 
     * string json_response
     * The async request handler should pass the response from the server,
     * which is to be a JSON-encoded string.
     *
     * object info
     * This was the endpoint of the mysterious "arg". Now it's an object
     * which originates from auth.login() for the purpose of passing
     * information.
     *
     */
    var completeLogin = function(json_response, info) {

        console.log('From the server: ' + json_response);
        console.log(info);
        try {
            var serverResponse = JSON.parse(json_response);
//            info.dispatch(cl(response));
            response = serverResponse;
            return;

            return response;

            if (response.success === true) {
                // Login success.

            }
            else {
                // Login failed.
                var errorDiv = document.getElementById('login-error');
                var span = document.createElement('span');
                this.clearErrors(errorDiv);
                span.appendChild(document.createTextNode(response.data.serverMessage));
//                errorDiv.appendChild(span);
                document.body.insert
            }
        }
        catch (e) {
            
            console.log("Error: " + e);
            response = {};
            return
        }
    };

    var handleErrors = function(response) {

        console.log("Handling errors.");
        if (!response.ok) throw Error(response.statusText);
        return response;
    }

    var clearErrors = function(e) {

        while (e.firstChild) e.removeChild(e.firstChild);
    };

    return {

        login: attemptLogin
    }
}());

export { auth };

