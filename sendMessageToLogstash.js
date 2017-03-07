/* globals require:true, console:true, process:true */

// This script will send a message to a [logstash](http://logstash.net/)
// server using the [TCP input](http://logstash.net/docs/1.1.13/inputs/tcp)
// and then quit. If there is no listener, it will just quit.

'use strict';

var net = require('net');

var logHost = 'logstash_ip'
  , logPort = 20000
  , sender = require('os').hostname();



console.log('...');

var schedule = require('node-schedule');
 
var j = schedule.scheduleJob('*/5 * * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
  var conn = net.createConnection({host: logHost, port: logPort}, function() {
    var message = {
      '@tags': ['nodejs', 'test']
    , '@message': 'tcp test ' + Math.floor(Math.random() * 10000)
    , '@fields': {'sender': sender}
    }
    conn.write(JSON.stringify(message));
    conn.end();
  })
  .on('error', function(err) {
    console.error(err);
    process.exit(1);
  });
});
