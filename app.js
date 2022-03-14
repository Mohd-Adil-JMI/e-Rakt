const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

dotenv.config({ path: './.env'});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(3000, function(){
    console.log('Server has started at port 3000');
});


// modules to install
// express body-parser mysql2 ejs request dotenv cookie-parser jsonwebtoken bcryptjs