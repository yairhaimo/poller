var DataManager = require('./datamanager');

var dataManager = new DataManager();

var Poller = function () {
    this.beginPollingCycle = function () {
        dataManager.getPointsToPoll().then(function (pointsToPoll) {
            for (var i = 0, len = pointsToPoll.length; i < len; i++) {
                pointsToPoll[i].poll();
            }
        });
    }
};


module.exports = Poller;


