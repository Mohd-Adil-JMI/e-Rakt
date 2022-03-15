const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

var pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    debug: false
});

module.exports = pool;