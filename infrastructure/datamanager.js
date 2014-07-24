//var mongoose = require('mongoose');

var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var q = require('q');
var Points = require('../points/points');


var DataManager = function () {
    this.getPointsToPoll = function () {
        var deferred = q.defer();
        MongoClient.connect('mongodb://yairhaimo:Cvmkjv123@ds055709.mongolab.com:55709/umbigo', function (err, _db) {
            if (!err) {
                console.log('Connected to DB');
                db = _db;
                var collection = db.collection('points');
                collection.find().toArray(function (err, items) {
                    var points = [];
                    for (var j = 0; j < items.length; j++) {
                        var pointData = items[j];
                        var point = new Points[pointData.type](pointData);
                        points.push(point);
                    }
                    deferred.resolve(points);
                });

            }
        });

        return deferred.promise;
    };
};


module.exports = DataManager;