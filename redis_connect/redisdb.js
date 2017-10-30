var redis = require('redis');

var port = "6379";
var host = "localhost" || "127.0.0.1";
var client = redis.createClient(port, host);
var redisConnection = function redisConnection() {
client.on('connect', function(error) {
    if (error) {
        console.log('Connection has not been established successfully with RedisDB.', error);
    } else {
        console.log('Connection has been established successfully with RedisDB.');
    }
});

}

module.exports = redisConnection;