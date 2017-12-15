var express = require('express')
var router = express.Router()

// new routes

var main = require('./main/routes');

router.use('/', main);

// Route index page
router.get('/', function (req, res) {
  updated = false;
  previousAddresses = false;
  correspondence = false;
  res.render('index')
})

router.get('/kitchen-sink', function (req, res) {
  res.render('kitchen-sink.njk')
})

// add your routes here

var editStep = 0;
var updated = false;
var editDate = "14 Dec 2017";
var updateType = "update";
var previousAddresses =  false;
var pageTitle = "Update residential address";
var correspondence = false;

//update
router.get('/choice-handler', function (req, res) {
  res.render('address-search')
})

router.get('/update/account', function (req, res) {
  res.render('account', {
    updated : updated,
    editDate : editDate,
    previous_addresses : previousAddresses,
    correspondence : correspondence
  })
})

router.get('/update/update', function (req, res) {
  res.render('update/update', {
    correspondence : correspondence  
  })
})

router.get('/update/dates', function (req, res) {
  res.render('update/dates', {
    updatetype : updateType
  })
})

router.get('/update/check', function (req, res) {
  res.render('update/check', {
    updatetype : updateType
  })
})

router.get(/check-answers-handler/, function (req, res) {
  updated = true;
  if(updateType === "new") {
    correspondence = true;
  }
  if (updateType === "address") {
    previousAddresses = true;    
  }
  res.redirect('account')
})

router.get(/update-type-handler/, function (req, res) {
  console.log(req.query);
  if(req.query.data === 'status') {
    updateType = "status";
    res.render('update/status')
  } else if (req.query.data === 'cherish') {
    updateType = "cherish";
    res.render('update/cherish-line')
  } else if (req.query.data === 'dlo') {
    updateType = "dlo";
    res.render('update/dates')
  } else {
    updateType = "address";
    res.render('update/address-search')
  }
})

//add new address
router.get('/update/change-handler', function (req, res) {
  console.log(req.query);
  if (req.query.data == "new") {
    updateType = "new";
    res.render('update/address-search')
  } else if (req.query.data == "correct"){
    res.render('update/correct')
  } else {
    res.redirect('update')
  }
})

module.exports = router