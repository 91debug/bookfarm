const mongoose = require('mongoose');

const db = mongoose.connection;

module.exports = function(app) {
    db.on('error', console.error);
    db.once('open', function(){
        console.log("Connected to mongod server");
    });
    mongoose.set('debug', true);
    mongoose.connect('mongodb://localhost/bookfarm');
};