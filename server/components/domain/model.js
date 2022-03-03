var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const domainSchema = new Schema({

    title : {
        type: String
    }

}, { timestamps:true })


const Domain = mongoose.model('Domain', domainSchema);

module.exports = Domain;