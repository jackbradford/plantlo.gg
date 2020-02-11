/**
 * async.js
 * This file provides a means through which to communicate with the server
 * asyncronously.
 *
 */
import { mediator } from './mediator';

var asyncHandler = (function() {

    /**
     * When publishing an `async-request` event, the args object should
     * include:
     * args = { url: '', data: {}, arg: ? }
     *
     */
    var handleRequest = function(args, callback) {

        send(args.url, args.data, callback, args.arg);
    };

    var send = function(url, data, callback, arg) {

        var req = new XMLHttpRequest();
        arg = arg || null;
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
                    if (arg !== null) callback(rt, arg);
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

