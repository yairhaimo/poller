var q = require('q');

module.exports = {
    extend : function (destination, source) {
        for (var property in source)
            destination[property] = source[property];
        return destination;
    },
    promisify: function (nodeAsyncFn, timeout, context) {
        console.log('TIMEOUT:' + timeout);
        return function() {
            var defer = q.defer()
              , args = Array.prototype.slice.call(arguments);

            setTimeout(function () {
                return defer.reject('TIMED OUT');
            }, timeout);

            args.push(function(err, val) {
                if (err !== null) {
                    return defer.reject(err);
                }

                return defer.resolve(val);
            });

            nodeAsyncFn.apply(context || {}, args);

            return defer.promise;
        };
    }
};