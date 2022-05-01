const express = require('express');
const authController = require('../controllers/auth');
const apiData = require('../api/api');
const moment = require('moment');
const res = require('express/lib/response');

const router = express.Router();
const pool = require('../db/database');
const { type } = require('express/lib/response');

function isLoggedInOrNot(x){
  if (typeof x != "undefined") {
    return "Yes";
  }
  return "No"
}

router.get('/', authController.isLoggedIn, (req, res) => {
  var user_Exist = isLoggedInOrNot(req.user);
  res.render('index', { userExist: user_Exist });
});

var Apidata = [];

router.get('/search',  authController.isLoggedIn, (req, res) => {
  var user_Exist = isLoggedInOrNot(req.user);
  res.render('search', { SearchedYet : 0, results: Apidata, userExist: user_Exist });
});


router.post('/search', (req, res) => {
  var user_Exist = isLoggedInOrNot(req.user);

  Apidata = apiData.filter((bank) => { return (bank[2] == req.body.city && bank[1] == req.body.state) });
  res.render('search', { SearchedYet : 1, results: Apidata, userExist: user_Exist });
});

router.get('/story',  authController.isLoggedIn, (req, res) => {
  var user_Exist = isLoggedInOrNot(req.user);
  res.render('story', { userExist: user_Exist });
});

router.get('/LearnMore', authController.isLoggedIn, (req, res) => {
  var user_Exist = isLoggedInOrNot(req.user);
  res.render('LearnMore', {userExist: user_Exist });
});

router.get('/about', authController.isLoggedIn, (req, res) => {
  var user_Exist = isLoggedInOrNot(req.user);
  res.render('aboutUs', {userExist: user_Exist });
});

router.get('/U_profile', authController.isLoggedIn, async (req, res) => {
  
  var ProfileErr = {
    Acc_err:"",
    Pass_err:""
  }
  
  if (typeof req.user != "undefined") {

    var userHistory = [];

    const history = new Promise((resolve, reject) => {
      pool.query('SELECT * FROM logs WHERE CustomerID = ?', [req.user.user_id], (err, res) => {
          if (err) reject(err);
          resolve(res);
      })
    })

    userHistory = await history;
    for(var i=0; i<userHistory.length; i++){
      userHistory[i].TransactionDate = moment.utc(userHistory[i].TransactionDate).format("MMM Do, YYYY");
    }
    res.render('U_profile', {userExist: "Yes", user : req.user, err:ProfileErr, history : userHistory});

  } else{
    res.redirect('/Login');
  }
});



router.get('/admin', (req, res) => {
  res.render('admin');
});

router.get('/admin_Profile', (req, res) => {
  res.render('admin');
});

router.post('/Donate_Buy',  authController.isLoggedIn, (req, res) => {
  var user_Exist = isLoggedInOrNot(req.user);

  if(user_Exist==="Yes"){
    var i = req.body.SearchedName;
    res.render('confirmation', { arr: Apidata[i], userExist: user_Exist, user:req.user });
  }
  else{
    res.redirect('/Login');
  }
  
});

router.post('/appoinment',  authController.isLoggedIn, (req, res) => {
  var user_Exist = isLoggedInOrNot(req.user);

  var AppointmentDetails = {
    CustomerID : req.user.user_id,
    Transaction_type : req.body.type,
    TransactionDate : req.body.Adate,
    BankID : req.body.BankID,
    BloodGrp : req.body.PBldgrp,
    units : req.body.units,
    Bill : req.body.units*2000
  }

  if(typeof(AppointmentDetails.units)=="undefined"){
    AppointmentDetails.units = null;
    AppointmentDetails.Bill = null;
  }

  pool.query('INSERT INTO logs SET ?', AppointmentDetails, (err, result)=>{
    if(err) console.log(err);
  })

  res.render('appoinment', {details:req.body, userExist:user_Exist});
});

router.delete('/U_profile/users/me',authController.isLoggedIn, authController.removeUser)

module.exports = router;