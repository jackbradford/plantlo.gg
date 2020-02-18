/**
 * auth.js
 * This file provides a means to authorize users.
 *
 */
import { bindActionCreators } from 'redux';

var fields = (function() {

    /**
     * fields.validate()
     * Attempt to log a user into the site. Works with completeLogin(), which
     * handles the response from the server.
     *
     * string options.fieldType
     * string options.fieldId
     * string options.matchFieldId
     * object options.e
     *
     *
     * return Response
     */
    var attemptValidate = function(options) {

        console.log('Attempting field validate...');
        var url = '/index.php?ctrl=public&actn=validateField';
        var data = encodeURIComponent(JSON.stringify());
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
    };

    var handleErrors = function(response) {

        console.log("Handling errors.");
        if (!response.ok) {
            var errorMsg;
            if (response.status == 500) {
                errorMsg = 'Sorry! The server is having some trouble at the moment.'
            }
            else errorMsg = response.statusText;
            throw Error(errorMsg);
        }
        return response;
    }

    return {

        validate: attemptValidate
    }
}());

export { auth };

