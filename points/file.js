var BasePoint = require('./base');

var FilePoint = function (data) {
    BasePoint.call(this, data);
};
FilePoint.prototype = Object.create(BasePoint.prototype);

FilePoint.prototype.action = function (sendResult) {
    var error = null;
    // get data
    sendResult(error, 6);
};

module.exports = FilePoint;