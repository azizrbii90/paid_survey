var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const complainSchema = new Schema({

    subject : {
        type: String
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "User",
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "User",
    }
}, { timestamps:true })


const Complain = mongoose.model('Complain', complainSchema);

module.exports = Complain;