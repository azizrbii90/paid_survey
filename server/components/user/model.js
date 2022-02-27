'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 255
    },
    isVerified: {
        type: Boolean,
        default: false
    },
}, { timestamp:true })

userSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.password;
    delete obj.__v;
    return obj;
}

const User = mongoose.model('User', userSchema);

module.exports = User;