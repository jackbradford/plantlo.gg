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
     * string url
     * The URL of the script to access. The URL may include a query string.
     *
     * object data
     * An object to be JSON and URI encoded and passed via POST to the server
     * at the given URL.
     *
     * function callback
     * A function which will be passed "response text" and the response from
     * the server.
     *
     * object info
     * This used to be called, cryptically, "arg." It can be used to pass
     * information to the response-handling callback from the response-
     * initiator.
     *
     */
    var send = function(url, data, callback, info) {

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
        }
    };

    mediator.subscribe('async-request', handleRequest);
    return {}; //{ send: send };
}());

export { asyncHandler };

