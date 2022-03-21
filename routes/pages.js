const express = require('express');
const authController = require('../controllers/auth');
const fs = require('fs');
const res = require('express/lib/response');

const router = express.Router();

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
const dataBuffer = fs.readFileSync('APIDATA.json');
const JSONdata = dataBuffer.toString();
const features = JSON.parse(JSONdata).features;

router.get('/search',  authController.isLoggedIn, (req, res) => {
  var user_Exist = isLoggedInOrNot(req.user);
  res.render('search', { SearchedYet : 0, results: Apidata, userExist: user_Exist });
});


router.post('/search', (req, res) => {

  var user_Exist = isLoggedInOrNot(req.user);

  Apidata = features.filter((feature) => { return (feature.attributes.city == req.body.city && feature.attributes.state == req.body.state) });
  res.render('search', { SearchedYet : 1, results: Apidata, userExist: user_Exist });
});

router.get('/story',  authController.isLoggedIn, (req, res) => {
  var user_Exist = isLoggedInOrNot(req.user);
  res.render('story', { userExist: user_Exist });
});

router.get('/SignUp', (req, res) => {
  res.render('SignUp', {message:""});
});

router.get('/Login', (req, res) => {
  res.render('Login', {message:""});
});

router.get('/U_profile', authController.isLoggedIn, (req, res) => {
  if (typeof req.user != "undefined") {
    // console.log(req.user);
    res.render('U_profile', {userExist: "Yes", user : req.user});
  } else{
    // res.render('Login', {message:""});
    res.redirect('/Login');
  }
});

router.post('/Donate_Buy', (req, res) => {
  var user_Exist = isLoggedInOrNot(req.user);
  var results = req.body.SearchedName;
  res.render('Donate_Buy', {arr:Apidata[results], userExist: user_Exist});
});

router.get('/LearnMore', (req, res) => {
  var user_Exist = isLoggedInOrNot(req.user);
  res.render('LearnMore', {userExist: "Yes" });
});

router.get('/admin', (req, res) => {
  res.render('admin');
});

router.get('/admin_Profile', (req, res) => {
  res.render('admin');
});

router.delete('/U_profile/users/me',authController.isLoggedIn, authController.removeUser)

module.exports = router;