const mysql = require("mysql2");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const pool = require('../db/database');

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    pool.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
      // console.log(results);
      if( !results || !(await bcrypt.compare(password, results[0].Password)) ) {
        res.status(401).render('login', {message: 'Email or Password is incorrect'});
      } else {
        const id = results[0].user_id;

        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        });

        // console.log("The token is: " + token);

        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true
        }

        res.cookie('jwt', token, cookieOptions );
        res.status(200).redirect("/");
      }

    })

  } catch (error) {
    console.log(error);
  }
}

exports.SignUp = (req, res) => {
  // console.log(req.body);

  const { fname, lname, email, phoneNo, password, Cpassword, dob, aadharNo, add, bloodgrp, gender} = req.body;

  pool.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
    if(error) {
      console.log(error);
    }

    if( results.length > 0 ) {
      return res.render('SignUp', {message: 'That email is already in use'});
    } else if( password !== Cpassword ) {
      return res.render('SignUp', {message: 'Passwords do not match'});
    }

    let hashedPassword = await bcrypt.hash(password, 5);
    // console.log(hashedPassword);

    var insertObject = {
      First_Name:fname,
      Last_Name:lname,
      email:email,
      PhoneNo:phoneNo,
      Password:hashedPassword,
      DOB:dob,
      AadharNo:aadharNo,
      Address:add,
      BloodGrp:bloodgrp,
      Gender:gender
    }

    pool.query('INSERT INTO users SET ?', insertObject, (error, results) => {
      if(error) {
        console.log(error);
      } else {
        // console.log(results);
        return res.status(200).redirect('/');
      }
    });
  });
}

exports.isLoggedIn = async (req, res, next) => {
  // console.log(req.cookies);
  if( req.cookies.jwt) {
    try {
      //1) verify the token
      const decoded = await promisify(jwt.verify)(req.cookies.jwt,
      process.env.JWT_SECRET
      );

      console.log(decoded);

      //2) Check if the user still exists
     pool.query('SELECT * FROM users WHERE user_id = ?', [decoded.id], (error, result) => {
        // console.log(result);

        if(!result) {
          return next();
        }

        req.user = result[0];
        // console.log("user is");
        // console.log(req.user);
        return next();

      });
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    next();
  }
}

exports.Logout = async (req, res) => {
  res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 2*1000),
    httpOnly: true
  });

  res.status(200).redirect('/');
}