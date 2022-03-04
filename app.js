const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const { promisify } = require('util');

dotenv.config({ path: './.env'});

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.connect(function (err) {
    if (err) console.log(err);
    console.log("MySql connected...");
});


//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(3000, function(){
    console.log('Server has started at port 3000');
});


// express body-parser mysql2 ejs request dotenv cookie-parser jsonwebtoken bcryptjs

// problems to solve
// 1) Now we have to redirect to the pages through buttons not google search bar
// 2) select appropriate database and a table and its attribute
// 3) use ejs to refractor the code