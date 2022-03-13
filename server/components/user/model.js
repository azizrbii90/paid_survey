'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({

    // common properties **********/
    username : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    country : {
        type: String,
        default: ''
    }, 
    password : {
        type: String,
        required: true
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,  
        default: false
    },
    type: {
        type: String,
        default: 'participant'
    },

    // companies ***************/
    businessArea : {
        type: String,
        default: ''
    },
    nbrEmployees :  {
        type : Number,
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    },

    // participant *******************/
    firstName : {
        type: String,
        default: ''
    },  
    lastName : {
        type: String,
        default: ''
    },
    wallet : {
        type: Number,   
        default: 0
    }

}, { timestamps:true })

userSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.password;
    delete obj.__v;
    return obj;
}

const User = mongoose.model('User', userSchema);

module.exports = User;