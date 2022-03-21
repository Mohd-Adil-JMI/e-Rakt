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
      if (!results || !(await bcrypt.compare(password, results[0].Password))) {
        // res.status(401).render('Login', {message: 'Email or Password is incorrect'});
        res.redirect('/Login')
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

        res.cookie('jwt', token, cookieOptions);
        res.status(200).redirect("/");
      }

    })

  } catch (error) {
    console.log(error);
  }
}

exports.SignUp = (req, res) => {
  // console.log(req.body);

  const { fname, lname, email, phoneNo, password, Cpassword, dob, aadharNo, add, bloodgrp, gender } = req.body;

  pool.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      return res.render('SignUp', { message: 'That email is already in use' });
    } else if (password !== Cpassword) {
      return res.render('SignUp', { message: 'Passwords do not match' });
    }

    let hashedPassword = await bcrypt.hash(password, 8);
    // console.log(hashedPassword);

    var insertObject = {
      First_Name: fname,
      Last_Name: lname,
      email: email,
      PhoneNo: phoneNo,
      Password: hashedPassword,
      DOB: dob,
      AadharNo: aadharNo,
      Address: add,
      BloodGrp: bloodgrp,
      Gender: gender
    }

    pool.query('INSERT INTO users SET ?', insertObject, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        // console.log(results);
        return res.status(200).redirect('/');
      }
    });
  });
}

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(req.cookies.jwt,
        process.env.JWT_SECRET
      );

      pool.query('SELECT * FROM users WHERE user_id = ?', [decoded.id], (error, result) => {
        if (!result) {
          return next();
        }

        req.user = result[0];
        return next();

      });
    } catch (error) {
      return next();
    }
  } else {
    next();
  }
}

exports.Logout = async (req, res) => {
  res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true
  });

  res.status(200).redirect('/');
}

exports.edit = async (req, res) => {
  const { email, phone, aadhar, address, userID } = req.body;

  pool.query("UPDATE users SET email = ?, PhoneNo = ?, AadharNo = ?, Address = ? WHERE user_id = ?", [email, phone, aadhar
    , address, userID], (err, result) => {
      if (err) console.log(err);
      else {
        console.log("done");
        res.redirect('/U_profile');
      }
    });
}

exports.changePassword = async (req, res) => {
  const { oldP, newP, confirmP, userID } = req.body;

  pool.query('SELECT Password FROM users WHERE user_id = ?', [userID], async (error, result) => {
    if (!(await bcrypt.compare(oldP, result[0].Password))) {
      console.log("Password is incorrect!");
    }
    else if (oldP === newP) {
      console.log("New Password cannot be same as old one");
    }
    else if (newP != confirmP) {
      console.log("new passwords do not march");
    }
    else {
      let hashedNew = await bcrypt.hash(newP, 8);
      pool.query('UPDATE users SET PASSWORD = ? WHERE user_id = ?', [hashedNew, userID], (err, results) => {
        if (err) console.log(err);
        else {
          console.log("updated");
          res.redirect('/U_profile');
        }
      });
    }
  });
}
exports.removeUser = async (req, res) => {
  const user_id = req.user.user_id
  console.log(user_id)
  pool.query('delete FROM users WHERE user_id = ?', [user_id], (error, result) => {
    if (error) {
      return res.status(401).send(error);
    }
    res.redirect('/')
  });
  pool
}