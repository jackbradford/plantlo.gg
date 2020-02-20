/**
 * auth.js
 * This file provides a means to authorize users.
 *
 */
import { bindActionCreators } from 'redux';

var validator = (function() {

    var fieldType;
    /**
     * fields.validate()
     * Attempt to log a user into the site. Works with completeLogin(), which
     * handles the response from the server.
     *
     * string options.fieldType
     * string options.fieldId
     *
     *
     * return Response
     */
    var checkField = function(options) {

        fieldType = options.fieldType;
        var url = '/index.php?ctrl=public&actn=validateField';
        var data = encodeURIComponent(JSON.stringify({
            fieldType: options.fieldType,
            userInput: document.getElementById(options.fieldId).value,
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
            
                return response.text();
            });
    };

    var handleErrors = function(response) {

        function ServerErrorException(message, response, fieldType) {
            this.message = message;
            this.response = response;
            this.fieldType = fieldType;
        }

        if (!response.ok) {
            var errorMsg;
            if (response.status == 500) {
                errorMsg = 'Internal server error.'
            }
            else errorMsg = response.statusText;
            throw new ServerErrorException(errorMsg, response, fieldType);
        }
        return response;
    }

    return {

        checkField: checkField
    }
}());

export { validator };

