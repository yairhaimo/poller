var BasePoint = require('./base');
var os = require('os-utils');

var CPUPoint = function (data) {
    BasePoint.call(this, data);
}
CPUPoint.prototype = Object.create(BasePoint.prototype);

CPUPoint.prototype.action = function (sendResult) {
    var error = null;
    // get data
    os.cpuUsage(function (value) {
        sendResult(error, parseInt(value * 100));
    });
}

module.exports = CPUPoint;