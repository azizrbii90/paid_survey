const bodyParser = require('body-parser');
const cookieParser = require ("cookie-parser");
const fileUpload = require ("express-fileupload");

const express = require('express');

const app = express();

app.use(fileUpload());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('uploads'));


app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("X-Frame-Options", "ALLOW-FROM https://www.google.com https://www.youtube.com"); // restrict it to the required domain
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Authorization,X-Frame-Options');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.use('/api', require('./components/user'));
app.use('/api', require('./components/survey'));
app.use('/api', require('./components/domain'));
app.use('/api', require('./components/complaint'));
app.use('/api', require('./components/gift'));
app.use('/api', require('./components/order'));

module.exports = app;
