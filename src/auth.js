/**
 * auth.js
 * This file provides a means to authorize users.
 *
 */
import { mediator } from './mediator';

var auth = (function() {

    var attemptLogin = function() {

        var loginData = {
            un: document.getElementById('login-email').value,
            pw: document.getElementById('login-password').value,
        }
        console.log(loginData.un+' '+loginData.pw);
        mediator.publish('async-request', completeLogin, {
            url: '/auth',
//            url: 'index.php?ctrl=auth&actn=auth&async=1',
            data: loginData
        });
    };

    var completeLogin = function(text) {

        console.log('Something.');
    };

    return {

        login: attemptLogin
    }
}());

export { auth };

