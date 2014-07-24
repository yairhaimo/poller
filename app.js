/*require('child_process').exec('wmic /node:localhost cpu get name', function(err, resp) 
{ console.log(resp); }); */

var Poller = require('./infrastructure/poller');
new Poller().beginPollingCycle();