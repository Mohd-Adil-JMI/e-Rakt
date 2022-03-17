const express = require('express');
const auth = require('../middleware/auth')
const fs = require('fs');

const router = express.Router();
var Apidata = [];
router.get('/search', auth, (req, res) => {
  res.render('search', { results: Apidata, userExist: "Yes" });
});

router.post('/search', auth, (req, res) => {
  const dataBuffer = fs.readFileSync('APIDATA.json');
  const JSONdata = dataBuffer.toString();
  const features = JSON.parse(JSONdata).features;
  Apidata = features.filter((feature) => { return (feature.attributes.city == req.body.city && feature.attributes.state == req.body.state) });
  res.render('search', { results: Apidata, userExist: "Yes" });
});

router.get('/story', auth, (req, res) => {
  res.render('story', { userExist: "No" });
});

router.get('/U_profile', auth , (req, res) => {
  res.render('U_profile', { userExist: "Yes" });
});

router.post('/Donate_Buy', auth, (req, res) => {
  var results = req.body.SearchedName;
  res.render('Donate_Buy', { arr: Apidata[results], userExist: "Yes" });
});

router.get('/LearnMore', (req, res) => {
  res.render('LearnMore', { userExist: "Yes" });
});

router.get('/admin', (req, res) => {
  res.render('admin');
});

router.get('/admin_Profile', (req, res) => {
  res.render('admin');
});

module.exports = router;