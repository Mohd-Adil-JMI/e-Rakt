const express = require('express');
const request = require('request');
const authController = require('../controllers/auth');
const authController2 = require('../controllers/auth2');

const router = express.Router();

// To also test if user is logged in or not
router.get('/', (req, res) => {
  var user_Exist = "No";
  if (typeof req.user != "undefined") {
    user_Exist = "Yes";
  }
  res.render('index', { userExist: user_Exist });
});

// always check if a person is logged in or not using this code in every post/get request :-
// router.get('/', authController.isLoggedIn, (req, res) => {
//   var user_Exist = "No";
//   if (typeof req.user != "undefined") {
//      user_Exist = "Yes";
//   }
// res.render('index', { userExist: user_Exist });
// });

router.get('/search', (req, res) => {
  var data = [];
  res.render('search', { results: data, userExist: "Yes" });
});

var Apidata = [];

router.post('/search', (req, res) => {
  const url = "https://livingatlas.esri.in/server1/rest/services/Health/IN_BloodBankDirectory_2017/MapServer/0/query?outFields=*&where=1%3D1&f=geojson"
  request({ url: url, json: true }, function (error, response) {
    Apidata = response.body.features.filter((feature) => { return (feature.properties.city == req.body.city && feature.properties.state == req.body.state) });
    res.render('search', { results: Apidata, userExist: "Yes" });
  });
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/Donate_Buy', (req, res) => {
  var results = req.body.SearchedName;
  // console.log(Apidata[results]);
  res.render('Donate_Buy', {arr:Apidata[results], userExist: "Yes"});
});

router.get('/LearnMore', (req, res) => {
  var data = [];
  res.render('LearnMore', {userExist: "Yes" });
});

router.get('/admin', (req, res) => {
  res.render('admin');
});

router.get('/profile', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.render('profile', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

})

module.exports = router;