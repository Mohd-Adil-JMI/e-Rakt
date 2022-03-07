const mysql = require("mysql2");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.admin = (req, res) => {
    try {
        console.log(req.body);
        const username = req.body.adminName;
        const password = req.body.adminPassword;

        if (!username || !password) {
            // return res.status(400).render('login', {message: 'Please provide an email and password'});
            res.send("One field is empty");
        }

        db.query('SELECT * FROM admin WHERE username = ?', [username], (error, results) => {
            console.log(results);
            if (!results || password != results[0].Password) {
                //   res.status(401).render('admin', {message: 'Email or Password is incorrect'});
                res.send("Email or Password is incorrect");
            } else {
                res.send("Logged in!!");
            }
        });
    } catch (error) {
        console.log(error);
    }
}