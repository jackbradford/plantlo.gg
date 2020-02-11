/**
 * mediator.js
 * This file provides a "mediator" to handle communication.
 *
 */
var mediator = (function() {

    var topics = {};

    var subscribe = function(topic, fn) {

        if (!topics[topic]) {
            topics[topic] = [];
        }
        topics[topic].push({
            context: this,
            callback: fn
        });
        return this;
    };

    var publish = function(topic, callback, args) {

        if (!topics[topic]) return false;
        for (var i=0, j=topics[topic].length ; i<j ; i++) {

            var subscription = topics[topic][i];
            subscription.callback.call(subscription.context, args, callback);
        }
        return this;
    };

    return {

        publish: publish,
        subscribe: subscribe
    };

}());

export { mediator };

