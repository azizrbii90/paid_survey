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
        type: String
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
        type: String
    },
    nbrEmployees :  {
        type : Number
    },
    isVerified: {
        type: Boolean,
        default: false
    },

    // participant *******************/
    firstName : {
        type: String
    },  
    lastName : {
        type: String
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