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
const userSchema = 'create table if not exists users (user_id int primary key auto_increment,First_Name varchar(20),Last_Name varchar(20),email varchar(50),PhoneNo varchar(15),Password varchar(100),DOB date,AadharNo varchar(12) unique,Address varchar(150),BloodGrp varchar(5),Gender varchar(1));'
const adminSchema = 'create table if not exists admin (admin_id int primary key auto_increment,admin_username varchar(20),admin_password varchar(100));'
pool.query(userSchema,(error,result)=>{
    if (error) {
        console.log(error)
    }
    else{
        console.log(result)
    }
})
pool.query(adminSchema,(error,result)=>{
    if (error) {
        console.log(error)
    }
    else{
        console.log(result)
    }
})
module.exports = pool;