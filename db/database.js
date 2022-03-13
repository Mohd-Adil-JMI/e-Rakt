const mysql = require('mysql2');

var pool = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : 'Soban@123',
    database : 'e_rakt',
    debug    :  false
});

module.exports = pool;