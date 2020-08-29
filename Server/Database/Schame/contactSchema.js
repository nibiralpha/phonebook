'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
})

let contactModel = mongoose.model('contact', contactSchema);
module.exports = contactModel;
