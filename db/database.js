const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

var pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    debug: false
});

const userSchema = 'create table if not exists users (user_id int primary key auto_increment,First_Name varchar(20),Last_Name varchar(20),email varchar(50),PhoneNo varchar(15),Password varchar(100),DOB date,AadharNo varchar(12) unique,Address varchar(150),BloodGrp varchar(5),Gender varchar(1));'

const adminSchema = 'create table if not exists admin (admin_id int primary key auto_increment,admin_username varchar(20),admin_password varchar(100));'

const logsSchema = "create table if not exists logs (LogID int primary key auto_increment, CustomerID int, Transaction_type varchar(15), TransactionDate date, BankID int, BloodGrp varchar(3), units int, Bill float, foreign key(CustomerID) references users(user_id) on delete set NULL)";

pool.query(userSchema,(error,result)=>{
    if (error) {
        console.log(error)
    }
});

pool.query(adminSchema,(error,result)=>{
    if (error) {
        console.log(error)
    }
})

pool.query(logsSchema, function(err, result){
    if(err) console.log(err);
});
module.exports = pool;