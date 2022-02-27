const mongoose = require('mongoose');
let env = JSON.parse(JSON.stringify(require('../.env.json')));


const connectDB = async () => {
    try {
        await mongoose.connect(env.DATABASE_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        })
        console.log("Successfully connected to the database")
    } catch (error) {
        console.log('Could not connect to the database. Exiting now...', error);
        console.log(error.reason);
        process.exit();
    }
}

module.exports = connectDB;