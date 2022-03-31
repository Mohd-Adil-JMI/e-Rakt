const moment = require('moment');
const fs = require('fs');
const pool = require('../db/database');

exports.admin = async (req, res) => {
    try {
        const username = req.body.adminName;
        const password = req.body.adminPassword;

        if (!username || !password) {
            res.send("One field is empty");
        }

        pool.query('SELECT * FROM admin WHERE admin_username = ?', [username], async (error, results) => {
            if (!results || password != results[0].admin_password) {
                res.send("Email or Password is incorrect");
            }

            else {
                var userData = [];
                var logsData = [];

                // users record:-
                const users = new Promise((resolve, reject) => {
                    pool.query('SELECT * FROM users', (err, res) => {
                        if (err) reject(err);
                        resolve(res);
                    })
                })
                userData = await users;
                // logs record
                const logs = new Promise((resolve, reject) => {
                    pool.query('SELECT * FROM logs', (err, res) => {
                        if (err) reject(err);
                        resolve(res);
                    })
                })
                logsData = await logs;

                for (var i = 0; i < logsData.length; i++) {
                    logsData[i].TransactionDate = moment.utc(logsData[i].TransactionDate).format("MMM Do, YYYY");
                }
                for (var i = 0; i < userData.length; i++) {
                    userData[i].DOB = moment.utc(userData[i].DOB).format("MMM Do, YYYY");
                }
                // console.log(logsData[0].TransactionDate);

                var Apidata = [];
                const dataBuffer = fs.readFileSync('api.json');
                const JSONdata = dataBuffer.toString();
                const data = JSON.parse(JSONdata).data;

                res.render('admin_Profile', { customer: userData, logs: logsData, banks : data });
            }
        });
    } catch (error) {
        console.log(error);
    }
}