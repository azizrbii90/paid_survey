var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const complainSchema = new Schema({

    subject : {
        type: String
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },

}, { timestamps:true })


const Complain = mongoose.model('Complain', complainSchema);

module.exports = Complain;