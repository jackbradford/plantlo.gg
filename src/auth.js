/**
 * auth.js
 * This file provides a means to authorize users.
 *
 */
import { mediator } from './mediator';

var auth = (function() {

    /**
     * auth.login()
     * Attempt to log a user into the site. Works with completeLogin(), which
     * handles the response from the server.
     *
     * return void
     */
    var attemptLogin = function() {

        mediator.publish('async-request', completeLogin, {
//            url: '/auth',
            url: '/index.php?ctrl=auth&actn=auth',
            data: {
                un: document.getElementById('login-email').value,
                pw: document.getElementById('login-password').value,
            },
            info: {
                test: 'sample-text',

            }
        });
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
            var response = JSON.parse(json_response);
            if (response.success === true) {
                // Login success.

            }
            else {
                // Login failed.
            }
        }
        catch (e) {
            
        }
    };

    return {

        login: attemptLogin
    }
}());

export { auth };

