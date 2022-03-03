var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const giftSchema = new Schema({

    name : {
        type: String,
        required: true
    },
    description : {
        type: String
    },
    stock : {
        type: Number,   
        required: true
    },
    photo :{
        name: String,
        mimetype: String,
        size: String
    }

    

}, { timestamps:true })


const Gift = mongoose.model('Gift', giftSchema);

module.exports = Gift;