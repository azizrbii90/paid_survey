var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const questionSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    choices : {
        type: [],   
        required: true
    }
})

const responseSchema = mongoose.Schema({
    responses: {
        type: []
    }
},{ timestamps:true })

const surveySchema = new Schema({

    title : {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    domains: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Domain",
    },
    countries: [],
    questions: [questionSchema],
    responses: [responseSchema],
    participants: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    minResponses : {
        type: Number, 
        default: 3    
    },
    closed: {
        type: Boolean,
        default: false, 
    },  
    uploadedRequest : {
        type: Boolean,  
        default: false
    },
    isVerified : {
        type: Boolean, 
        default: false
    },
    price : {
        type: Number,   
        required: true
    },
    responsePrice  : {
        type: Number,
        default: 1,
        required: true  
    },


}, { timestamps:true })


const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;