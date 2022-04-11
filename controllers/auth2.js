const moment = require('moment');
const apiData = require('../api/api');
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

                res.render('admin_Profile', { customer: userData, logs: logsData, banks : apiData });
            }
        });
    } catch (error) {
        console.log(error);
    }
}