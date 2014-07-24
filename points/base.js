var q = require('q');
var utils = require('../infrastructure/utils');
var extend = utils.extend;
var promisify = utils.promisify;

var BasePoint = function (data) {
    extend(this, data);
    this.action = promisify(this.action, this.pollingTime*0.9);
    console.log(Date.parse(new Date())/1000 + ' - polling time is ' + this.pollingTime);
};

BasePoint.prototype.poll = function () {
    var self = this;
    setInterval(function () {
        console.log(Date.parse(new Date())/1000 + ' base point polling:' + self.config.name + ', slept for ' + self.pollingTime);
        self.action().then(function (value) {
            // timeoutCounter = 0;
            self.calculate(value);
        }, function (err) {
            // timeoutCounter++;
            console.log(Date.parse(new Date()) / 1000 + ' ***' + self.config.name + ' - Error:' + err);
        });
    }, self.pollingTime);
};

BasePoint.prototype.calculate = function (value) {
    console.log(this.thresholds);
    var status;
    if ((this.thresholds.ERROR) && (value >= this.thresholds.ERROR)) {
        status = 'ERROR';
    }
    else if ((this.thresholds.WARNING) && (value >= this.thresholds.WARNING)) {
        status = 'WARNING';
    }
    else {
        status = 'NORMAL';
    }
    console.log(Date.parse(new Date())/1000 + ' Value:' + value + ', Status:' + status);
};

module.exports = BasePoint;