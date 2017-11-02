var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var options = {
    useMongoClient: true,
    autoIndex: false, 
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, 
    bufferMaxEntries: 0
  };

  var uri = 'mongodb://127.0.0.1/crewlink';
var mongoConnection = function mongoConnection() {
    mongoose.connect(uri,options,function (error) {
        if (error) {
            console.log('Connection has not been established successfully with MongoDB.', error);
        } else {
            console.log('Connection has been established successfully with MongoDB.');
        }
    });

}


module.exports = mongoConnection;