'use strict';

const mongoose = require('mongoose');
const config = require('../Config/config');

mongoose.connect(config.DBURL,
    { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.set('debug', false);
const db = mongoose.connection;
mongoose.connection.on('error', function (err) {
    if (err) throw err;
});
mongoose.Promise = global.Promise;

module.exports = {
    mongoose, models: {
        contact: require('./Schame/contactSchema')
    }
}
