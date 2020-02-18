/**
 * async.js
 * This file provides a means through which to communicate with the server
 * asyncronously.
 *
 */
import { mediator } from './mediator';

var asyncHandler = (function() {

    /**
     * handleRequest()
     * This function handles async-request events.
     *
     * When publishing an `async-request` event, the args object should
     * include:
     * args = { url: 'string', data: {}, info: {} }
     *
     * args.info is optional.
     *
     */
    var handleRequest = function(args, callback) {

        send(args.url, args.data, callback, args.info);
    };

    /**
     * send()
     * Send an asynchronous request.
     *
     * object options
     * An object with the properties 'url' and 'data'.
     *
     * string options.url
     * The URL of the request.
     *
     * object options.data
     * This object will be converted to JSON and URI encoded before being
     * passed to the server via post.
     *
     * 
     *
     */
    var send = function(options) {

        console.log('Attempting async request...');
        var url = options.url;
        var data = encodeURIComponent(JSON.stringify(object.data));
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

        console.log("Handling errors (async).");
        if (!response.ok) {
            var errorMsg;
            if (response.status == 500) {
                errorMsg = 'Sorry! The server is having some trouble at the moment.'
            }
            else errorMsg = response.statusText;
            throw Error(errorMsg);
        }
        return response;
    };
/*
        var req = new XMLHttpRequest();
        info = info || null;
        data = encodeURIComponent(JSON.stringify(data));
        console.log(data);
        if (!req) {
            alert('Cannot create an XMLHttpRequest instance.'); // TODO replace
            return false;
        }
        var params = "data=" + data + "&async=1";

        req.onreadystatechange = alertContents;
        req.open('POST', url);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send(params)

        function alertContents() {

            if (req.readyState === XMLHttpRequest.DONE) {
                if (req.status === 200) {
                    console.log('Async request complete; Status 200.');
                    var rt = req.responseText;
                    if (info !== null) callback(rt, info);
                    else callback(rt);
                }
                else alert('There was a problem with the request.'); // TODO replace
            }
        }*/
//    };

//    mediator.subscribe('async-request', handleRequest);
    return { request: send };
}());

export { asyncHandler };

