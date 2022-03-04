const express = require('express');
const request = require('request');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/', (req, res)=>{
  res.render('index');
});

// change the above code with this :-
// router.get('/', authController.isLoggedIn, (req, res) => {
//   res.render('index', {user: req.user});
// });

router.get('/search', (req, res)=>{
  var data = [];
  res.render('search', {results:data});
});

router.post('/search', (req, res) => {
  const url = "https://livingatlas.esri.in/server1/rest/services/Health/IN_BloodBankDirectory_2017/MapServer/0/query?outFields=*&where=1%3D1&f=geojson"
  request({ url: url, json: true }, function (error, response) {
    const data = response.body.features.filter((feature) => { return (feature.properties.city == req.body.city && feature.properties.state == req.body.state) });
    res.render('search', {results:data});
  });
});




router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/profile', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('profile', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }
  
})

module.exports = router;