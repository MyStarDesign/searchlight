var express = require('express');
var router = express.Router();

var addressOne = '1 Current Crescent';
var addressTwo = '2 New Street';
var addressThree = '7 Post Street';
var addressFour = 'Gateshead, Tyne and Wear NE1 1HH';

var content = require('./content.js').content;
var Interest = require('./interest.js');
var defaults = require('./defaults.js').defaults;
var flip = require('./defaults.js').flip;
var setState = require('./defaults.js').setState;
var changeSex = require('./defaults.js').changeSex;
var personalDetailsFunctions = require('../functions/personalDetailsFunctions.js');
var bsFunctions = require('../functions/bsFunctions.js');
var generalFunctions = require('../functions/general.js');
var addressFunctions = require('../functions/address.js');
var contactFunctions = require('../functions/contact.js');



///////////////
// July 2019 //
///////////////
var guardianRole = false;

var getCitizen = function(nino, cis) {
  console.log(cis[nino].nameOne.first);
  return cis[nino]
}

router.get('/cis-handler/', function (req, res) {
  req.session.data.guardianRole = guardianRole;
  req.session.data.citizen = getCitizen(req.query.nino, req.session.data.cis);
  res.redirect('account3/account')
})

// given a nino in a href
// get nino from href
// find person in database
// use this persons data in account 3


//************
// Bereavement 
//************

router.get(/bereavement-handler/, function (req, res) {
  req.session.data.bsNino = req.query.bsnino.toUpperCase();
  req.session.data.bsPerson = req.session.data.bsCustomers[req.session.data.bsNino];
  if( bsFunctions.getPerson(req.session.data.bsNino, req.session.data.bsCustomers) ) {
    res.redirect('/bereavement/account-v2')
  } else {
    res.redirect('/search-v8')
  }
})



//***********
// INTERESTS 
//***********

var interests = [];
var pip = Interest.createInterest();
var jsa = Interest.createInterest();
var esa = Interest.createInterest();

function addInterest(interest) {
  interests.unshift(interest);
}

var resetInterests = function () {
  interests.length = 0;
  //reset PIP
  pip.live = true;
  pip.title = 'Personal Independence Payment';
  pip.startDate = '1 Jun 2017';
  pip.system = 'sys';
  
  jsa.live = false;
  jsa.title = 'Job Seekers Allowance';
  jsa.startDate = '1 Jun 2017';
  jsa.system = 'crl';
  
  esa.live = true;
  esa.title = 'Employment and Support Allowance';
  esa.startDate = '1 Mar 2018';
  esa.system = 'clerical';
  
  addInterest(pip);
  addInterest(jsa);
  addInterest(esa);
}


function resetTempInterest(interest) {
  tempInterest = Interest.createInterest();
  interest = tempInterest;
}

function resetToDefaults() {
  tempInterest = Interest.createInterest();
}

function printInterests() {
  for (var x in interests) {
  }
}

var removeInterest = function (interest) {
  interest.live = false;
};



//*******************
// MANAGEMENT CHECKS
//*******************


//******•
// DATES 
//******•

var Dates = require('./dates.js');
var dates = Dates.dates;
dates.logToday();

// var example = dates.convertDayToString('21/6/1979')

var createJourney = null;
var ninoVersion = null;


var person = {
  reset : function () {
    //address
    this.previous_address = null;
    this.previous_address_count = 0;
    this.correspondence_address = null;
    //names
    this.previous_name = null;
    this.previous_name_count = 0;
    this.alternative_name = null;
    this.rfa_name = null;
    //other
    this.ethnic_origin = null;
    this.immigration = null;
    this.preferred_language = null;
    this.spoken_language = null;
    this.disability = null;
    this.special_needs = null;
  }
};
person.reset();

var trace = false;
var underSixteen = false;

var resetAll = function () {
  residentialAddress.reset();
  correspondenceAddress.reset();
  previousAddress.reset();
  person.reset();
  createJourney = null;
  ninoVersion = null;
};

var residentialAddress = {
  reset : function () {
    this.status = 'live',
    this.line = addressOne,
    this.startDate = '01 Jan 1990',
    this.endDate = null,
    this.cherish = false,
    this.show = true,
    this.updated = false
  }
};
residentialAddress.reset();

// dateTwo : '30 Dec 2000',

var correspondenceAddress = {
  reset : function () {
    this.line = addressThree;
    this.startDate = null;
    this.endDate = null;
    this.cherish = false;
    this.show = false;
  }
};
correspondenceAddress.reset();

var previousAddress = {
  reset : function () {
    this.status = 'live';
    this.line = addressOne;
    this.startDate = null;
    this.endDate = null;
    this.cherish = false;
    this.show = false;
    this.correct = true;
  }
};
previousAddress.reset();

var updater = function (updatetype) {
  if (updatetype === 'correctDate') {
    residentialAddress.updated = true;
    residentialAddress.startDate = '30 Nov 1990';
    previousAddress.line = addressOne;
    previousAddress.show = true;
    previousAddress.correct = false;
    // update the dates
  } 
  if (updatetype === 'correctDateNotified') {
    residentialAddress.updated = true;
    previousAddress.line = addressOne;
    previousAddress.show = true;
    previousAddress.correct = false;
    // update the dates
  } 
}
  
var dataState = {
  correctionType: 'toNew',
  currentStatus : 'live',//dlo, pwa, nfa
  newStatus : 'live',//dlo, pwa, nfa
  correspondenceAdded: false,
  correspondenceRemoved: false,
  updatedToNewAddress : false,
  cherished : false,
  cherishedLineCorrected : false,
  statusUpdated : false,
  dateIsUpdated : false,
  interestAdded : false,
  interestRemoved : false,
  typeTwoAdded : false,
  interestTransfered : false,
  addressCorrected : false,
  statusCorrected : false
};

var main = require('./main/routes');

// search page
router.get('/search', function (req, res) {
  res.render('pages/search.njk', {
    ninoversion : ninoVersion
  })
})

// simple search page for interests
router.get('/search-v2', function (req, res) {
  res.render('pages/search-v2.njk', {
    ninoversion : ninoVersion
  })
})

// simple search page for interests
router.get('/search-v3', function (req, res) {
  res.render('pages/search-v3.njk', {
    ninoversion : ninoVersion
  })
})

router.get('/search-v4', function (req, res) {
  res.render('pages/search-v4.njk', {
    ninoversion : ninoVersion
  })
})

router.get('/search-v5', function (req, res) {
  res.render('pages/search-v5.njk', {
    ninoversion : ninoVersion
  })
})

router.get('/search-v6', function (req, res) {
  res.render('pages/search-v6.njk', {
    ninoversion : ninoVersion
  })
})

router.get('/search-v7', function (req, res) {
  res.render('pages/search-v7.njk', {
    ninoversion : ninoVersion
  })
})

router.get('/search-v8', function (req, res) {
  res.render('pages/search-v8.njk', {
    ninoversion : ninoVersion
  })
})

router.get('/search-v9', function (req, res) {
  res.render('pages/search-v9.njk', {
    ninoversion : ninoVersion
  })
})

var tempInterest;

router.use('/', main);
  // Route index page
  router.get('/', function (req, res) { 
    
  req.session.data.mcheck = false;
    
  //set a nino for account version 3
  req.session.data.cis = require('./data/cis.js').cis;
  req.session.data.citizen = getCitizen("SX170202", req.session.data.cis);

              
  for (var key in defaults) {
    if (defaults.hasOwnProperty(key)) {
      req.session.data[key] = defaults[key];
    }
  }
  
  req.session.data.selectstatus = 'unprocessed';
    
  //data
  req.session.data.alertData = require('./data/alerts.js').alerts;
  req.session.data.notificationsData = require('./data/notifications.js').notifications;
  req.session.data.details = require('./data/details.js').details;
  req.session.data.miscData = require('./data/miscData.js').miscData;
  req.session.data.personalDetails = require('./data/personalDetails.js').personalDetails;
  req.session.data.bsCustomers = require('./data/bsCustomers.js').bsCustomers;
  req.session.data.addresses = require('./data/addresses.js').addresses;
  req.session.data.contactTypes = require('./data/contactTypes.js').contactTypes;
  req.session.data.authority = require('./defaults.js').authority;


//  for (var item in contactTypes) {
//    if (contactTypes.hasOwnProperty(item)) {
//      req.session.data[item] = contactTypes[item];
//    }
//  }
    
  // set the message for startup items such as PV
  if(req.session.data.personalDetails.pv.state == 'start') {
    req.session.data.toaster = 'This person is potentially violent';
  } else if (req.session.data.personalDetails.disability.state == 'start') {
    req.session.data.toaster = 'This person is disabled';
  } else if (req.session.data.personalDetails.dateOfDeath.state == 'start') {
    req.session.data.toaster = 'This person is deceased';
  } else if (req.session.data.personalDetails.nifu.state == 'start') {
    req.session.data.toaster = 'Account is monitored by Identity Fraud Intelligence';
  };
          
  resetTempInterest(req.session.data.tempInterest);
  resetInterests();
  req.session.data.interests = interests;    
  req.session.data.updateOne = '20 May 1990';
  req.session.data.startOne = '20 May 1990';
  req.session.data.updateTwo = '5 Jun 2010';
  req.session.data.startTwo = '4 Jun 2010';
  req.session.data.updateThree = '30 Jan 2018';
  req.session.data.startThree = '29 Jan 2018';
  req.session.data.updateFour = '2 Feb 2018';
  req.session.data.startFour = '1 Feb 2018';
  req.session.data.dod = '20 Jan 2018';
  req.session.data.age = '78';
  req.session.data.creation = '11 Jan 1980';
    
  req.session.data.createJourney = null;
  req.session.data.prepopulatedDate = dates.todayAsFigure('/');    
  req.session.data.prepopulatedString = ( dates.convertDayToString( req.session.data.prepopulatedDate ) );    
  req.session.data.tests = 'foo';    
    
  resetAll();
  req.session.data.updateType = null;
  trace = false;
  underSixteen = false;
  dataState.updating = false;
  dataState.correcting = false;
  dataState.updatedToNewAddress = false;
  dataState.cherished = false;
  dataState.correspondenceAdded = false;
  dataState.correspondenceRemoved = false,
  dataState.statusUpdated = false;
  dataState.addressCorrected = false;
  dataState.dateIsUpdated = false;
  dataState.interestAdded = false;
  dataState.interestRemoved = false;
  dataState.interestTransfered = false;
  dataState.currentStatus = 'live';
  dataState.newStatus = 'live';
  //corrections
  dataState.cherishedLineCorrected = false;
  dataState.statusCorrected = false;

  pageTitle = 'Update residential address';
  res.render('index')
})

router.get('/kitchen-sink', function (req, res) {
  res.render('kitchen-sink.njk')
})

router.get('/search-v1', function (req, res) {
  res.render('pages/search-v1.njk')
})

router.get('/managementcheck', function (req, res) {
  req.session.data.mcheck = managementCheck(req.session.data.mcheck);
  res.redirect(req.get('referer'));
})

function managementCheck(check) {
  if(check == true) {
    check = false;
  } else {
    check = true;
  }
  return check;
}


/************/
/** UPDATE **/
/************/

/***************/
/** AUTHORITY **/
/***************/

//add
router.get(/interest-change-handler/, function (req, res) {
  req.session.data.tempInterest = req.query.interest;
  req.session.data.interestState = req.query.state;
  if (req.query.state == 'ending' && req.query.interest != 'both') {
    res.redirect('/update/auth-interests/check')
  } else {
    res.redirect('/update/auth-interests/interest-detail')
  }
})

//check
router.get(/authority-handler/, function (req, res) {
  for (var y in req.session.data.authority) {
    if ( req.session.data.authority[y].state == 'added') {
      req.session.data.authority[y].state = 'existing';
    }
    if ( req.session.data.authority[y].state == 'ended') {
      req.session.data.authority[y].state = 'old';
    }
  }
  //adding
  if(req.session.data.interestState == 'adding') {
    if (req.session.data.ctr == 'true') {
      req.session.data.authority.councilTaxReduction.state = 'added';
      req.session.data.authority.councilTaxReduction.show = true;
    }
    if (req.session.data.hb == 'true') {
      req.session.data.authority.housingBenefit.state = 'added';
      req.session.data.authority.housingBenefit.show = true;
    }
  //updating
  } else if (req.session.data.interestState == 'updating') {
    req.session.data.authority[req.session.data.tempInterest].state = 'added';
    req.session.data.authority[req.session.data.tempInterest].show = true;
  //ending
  } else { //ending
    if (req.session.data.ctr == 'true') {
      req.session.data.authority.councilTaxReduction.state = 'ended';
      req.session.data.authority.councilTaxReduction.show = false;
    }
    if (req.session.data.hb == 'true') {
      req.session.data.authority.housingBenefit.state = 'ended';
      req.session.data.authority.housingBenefit.show = false;
    }
    if (req.session.data.tempInterest != 'both') {
      req.session.data.authority[req.session.data.tempInterest].state = 'ended';
      req.session.data.authority[req.session.data.tempInterest].show = false;
    }
  }
  req.session.data.ctr = null;
  req.session.data.hb = null;
  res.redirect('authority-account')
})


/*************/
/** CONTACT **/
/*************/

router.get(/contact-change-handler/, function (req, res) {
  req.session.data.toaster = null;
  res.redirect('/update/contact/update-type')
})

router.get(/update-contact-handler/, function (req, res) {
  var next = 'contact-details';
  if (req.query.updateType == 5) {
    next = 'end';
  } else if (req.query.updateType == 7) {
    next = 'check';
  }
  res.redirect(next);
})

router.get(/pref-handler/, function (req, res) {
  if (req.query.pref != 'true') {
    req.session.data.pref = false;
  }
  res.redirect('check')
})

//check-contact-handler
router.get(/check-contact-handler/, function (req, res) {  
  var chosenContact = req.session.data.contactType;
  var contactObject = req.session.data.contactTypes[chosenContact];
  var contactTypes = req.session.data.contactTypes;
  var updateType = req.session.data.updateType;
  var contactDisplay;
  
  // SET STATE  
  req.session.data.contactTypes[chosenContact].state = updateType;
  
  // SET DISPLAY  
  req.session.data.contactTypes[chosenContact].show = (updateType == 5 ? false : true);

  // SET PREFERENCE
  if (req.session.data.pref == 'true' || req.session.data.updateType == 7) {
    req.session.data.contactTypes = contactFunctions.setPreferedContact(contactTypes, chosenContact);
  }

  // SET EX DIRECTORY
  req.session.data.contactTypes.homeTelephone.exD = (req.session.data.exdirectory == 'true' ? true : false);
  
  // SET MESSAGE
  if (updateType == 7) {
    contactDisplay = 'Preferred method of contact';
  } else if (chosenContact == 'otherContact') {
    contactDisplay = 'Contact method';
  } else {
    contactDisplay = req.session.data.contactTypes[chosenContact].display;
  }
  req.session.data.toaster = generalFunctions.setToasterMessage (contactDisplay, contactObject.type, updateType);

  //reset
  req.session.data.pref = false;
  req.session.data.exdirectory = false;
  chosenContact, contactObject, updateType, contactDisplay = null;

  //redirect
  res.redirect('/account2/account')
})


/////////////////////// NEW!
var personDetailObject;

//PERSON
router.get(/add-person-handler/, function (req, res) {
  
  personDetailObject = req.session.data.personalDetails[req.session.data.personalDetail];
  personDetailObject.key = req.session.data.personalDetail;
  req.session.data.updateType = 1;
  if (req.session.data.personalDetail == 'nifu') {
    req.session.data.personalDetailValue = 'Yes';
    res.redirect('/update/person/check');
  } else if (req.session.data.personalDetail == 'gender') {
    res.redirect('/update/person/gender/add');
  } else if (req.session.data.personalDetail == 'assetFreeze' || req.session.data.personalDetail == 'idAtRisk') {
    req.session.data.personalDetailValue = true;
    res.redirect('/update/person/dates');
  } else if (req.session.data.personalDetail == 'INDIndicator') {
    req.session.data.personalDetailValue = 'INDIndicator';
    req.session.data.personalDetailValue = true;
    res.redirect('/update/person/check');
  } else {
    res.redirect('/update/person/update');
  }
})

router.get(/adding-detail-handler/, function (req, res) {
  req.session.data.personalDetail = req.query.personalDetail;
  req.session.data.toaster = null;
  req.session.data.updateType = 1;
  res.redirect('/update/person/update')
})

router.get(/person-change-handler/, function (req, res) {
  req.session.data.toaster = null;
  req.session.data.personalDetail = req.query.personalDetail;
  if (req.session.data.personalDetail == 'sex') {
    req.session.data.updateType = 3;
    req.session.data.personalDetailValue = personalDetailsFunctions.flipValue(req.session.data.personalDetails.sex);
    res.redirect('/update/person/check')
  } else if (req.session.data.personalDetail == 'dateOfDeath') {
    req.session.data.updateType = 3;
    res.redirect('/update/person/dod-options')
  } else if (req.session.data.personalDetail == 'dateOfBirth') {
    req.session.data.updateType = 3;
    res.redirect('/update/person/update')
  } else if (req.session.data.personalDetail == 'recordLevel') {
    req.session.data.updateType = 2;
    res.redirect('/update/person/update')
  } else if (req.session.data.personalDetail == 'INDIndicator') {
    req.session.data.updateType = 2;
    req.session.data.personalDetailValue = 'null';
    res.redirect('/update/person/check')
  } else if (req.session.data.personalDetail == 'assetFreeze' || req.session.data.personalDetail == 'idAtRisk') {
    if (req.session.data.personalDetails[req.session.data.personalDetail].state == 1) {
      req.session.data.updateType = 5;
    } else {
      req.session.data.updateType = 1;
    }
    res.redirect('/update/person/dates')
  } else if (req.session.data.personalDetail == 'nifu') {
    req.session.data.updateType = 2;
    req.session.data.personalDetailValue = 'null';
    res.redirect('/update/person/check')
  } else {
    res.redirect('/update/person/type')
  }
})

router.get(/change-person-type-handler/, function (req, res) {
  if (req.session.data.personalDetail == 'nino' || req.session.data.updateType == 4) {
    req.session.data.updateType == 2;
    req.session.data.personalDetail = 'ninoVerificationLevel';
    res.redirect('/update/person/update')
  }
  if (req.session.data.personalDetail == 'specialNeeds' && req.session.data.updateType == 3) {
    if (req.session.data.personalDetails.specialNeeds.value.length > 1) {
      res.redirect('/update/person/correct-needs/select-need')
    } else {
      req.session.data.personalDetailValue = req.session.data.personalDetails.specialNeeds.value[0] ;
      res.redirect('/update/person/correct-needs/all-needs')
    }
  } else if (req.session.data.personalDetail == 'preferredLanguage') {
    if (req.session.data.updateType == 2) {
      if (req.session.data.personalDetailValue == 'English') {
        req.session.data.personalDetailValue = 'Welsh';
      } else {
        req.session.data.personalDetailValue = 'English';
      }
      res.redirect('/update/person/check')
    } else {
      res.redirect('/update/person/update')
    }
  } else {
    res.redirect('/update/person/update')
  }
})

router.get(/dod-handler/, function (req, res) {
  if (req.session.data.updateType == 4) {
    res.redirect('/update/person/check')
  } else {
    res.redirect('/update/person/update')
  }
})

router.get(/personal-detail-handler/, function (req, res) {
  if (req.query.data == 'stateless') {
    req.session.data.personalDetailValue = 'stateless';
  } else if (req.query.data == 'unknown') {
    req.session.data.personalDetailValue = 'unknown';
  } else if (req.query.data == 'null') {
    req.session.data.personalDetailValue = 'null';
  }
  res.redirect('/update/person/check')
})

router.get(/change_pd/, function (req, res) {
  personDetailObject = req.session.data.personalDetails[req.query.personalDetail];
  personDetailObject.key = req.query.personalDetail;
  if(personDetailObject.key == 'dateOfBirth') {
    req.session.data.updateType = 3;
    res.redirect('/update/person/update')
  } else if (personDetailObject.key == 'recordLevel') {
    req.session.data.updateType = 2;
    res.redirect('/update/person/update')
  } else if (personDetailObject.key == 'dateOfDeath') {
    res.redirect('/update/person/dod-options')
  } else if (personDetailObject.key == 'sex') {
    req.session.data.personalDetailValue = personalDetailsFunctions.flipValue(req.session.data.personalDetailValue);
    req.session.data.updateType = 3;
    res.redirect('/update/person/check')
  } else if (personDetailObject.key == 'INDIndicator') {
    req.session.data.personalDetailValue = null;
    req.session.data.updateType = 2;
    res.redirect('/update/person/check')
  } else if (personDetailObject.key == 'assetFreeze'|| personDetailObject.key == 'idAtRisk') {
    if (personDetailObject.state == 1) {
      req.session.data.updateType = 5;
      req.session.data.personalDetailValue = false;
    } else {
      req.session.data.updateType = 1;
      req.session.data.personalDetailValue = true;
    }
    res.redirect('/update/person/dates')
  } else {
    res.redirect('/update/person/type')
  }
})

//check-person-handler
router.get(/check-person-handler/, function (req, res) {
  if(personDetailObject.key == 'disability' ||
     personDetailObject.key == 'dateOfBirth' ||
     personDetailObject.key == 'dateOfDeath' ||
     personDetailObject.key == 'recordLevel' ||
     personDetailObject.key == 'preferredLanguage' ||
     personDetailObject.key == 'nifu' ||
     personDetailObject.key == 'immigration' ||
     personDetailObject.key == 'INDIndicator' ||
     personDetailObject.key == 'maritalStatus' ||
     personDetailObject.key == 'nationality' ||
     personDetailObject.key == 'spokenLanguage' ||
     personDetailObject.key == 'assetFreeze' ||
     personDetailObject.key == 'idAtRisk' ||
     personDetailObject.key == 'sex') {
    var personalDetailValue = req.session.data.personalDetailValue;
    var verificationlevel = req.session.data.verificationlevel;
    personDetailObject = personalDetailsFunctions.setPDValue(personDetailObject, personalDetailValue);
    personDetailObject = personalDetailsFunctions.setVerificationLevel(personDetailObject, verificationlevel);
    
//    if (personDetailObject.key == 'assetFreeze' || personDetailObject.key == 'idAtRisk') {
//      var endDate = personDetailObject.key + 'End';
//      var startDate = personDetailObject.key + 'Start';
//      personDetailObject = personalDetailsFunctions.setDates(personDetailObject, req.session.data[startDate], req.session.data[endDate]);
//    }

    personDetailObject = personalDetailsFunctions.setPDView(personDetailObject);
    personDetailObject.state = req.session.data.updateType;
    req.session.data.personalDetails[personDetailObject.key] = personDetailObject;
    req.session.data.toaster = generalFunctions.setToasterMessage(personDetailObject.display, null, personDetailObject.state);

  } else {
  
  var chosenDetail = req.session.data.personalDetail;
  var detailObject = req.session.data.personalDetails[req.session.data.personalDetail];
  var chosenValue = req.session.data.personalDetailValue;
  var tempValue = req.session.data.tempValue;
  var updateType = req.session.data.updateType;
  var verificationlevel = req.session.data.verificationlevel;
  // SET VALUES  
  if(req.session.data.updateType == 4 || req.session.data.updateType == 5) {
    req.session.data.personalDetails[req.session.data.personalDetail].value = null;   
  } else { 
    req.session.data.personalDetails[req.session.data.personalDetail] = personalDetailsFunctions.setValue(chosenDetail, detailObject, chosenValue, tempValue, updateType);
  }
  // SET VERIFICATION LEVEL  
  if (req.session.data.verificationlevel != null) {
    req.session.data.personalDetails[req.session.data.personalDetail].level = verificationlevel;  
  }
  // SET DATES FOR ASSET FREEZE AND ID AT RISK
  if (chosenDetail == 'assetFreeze' || chosenDetail == 'idAtRisk') {
    var endDate = chosenDetail + 'End';
    var startDate = chosenDetail + 'Start';
    req.session.data.personalDetails[chosenDetail] = personalDetailsFunctions.setDates(detailObject, req.session.data[startDate], req.session.data[endDate]);
  }
  // SET STATE
  req.session.data.personalDetails[req.session.data.personalDetail].state = updateType;
  // SET DISPLAY
  if (req.session.data.personalDetail != 'sex' && req.session.data.personalDetail != 'dob' ) {   
    req.session.data.personalDetails[req.session.data.personalDetail] = personalDetailsFunctions.setDisplay(chosenDetail, detailObject);
  }
  // SET MESSAGE
  req.session.data.toaster = generalFunctions.setToasterMessage(detailObject.display, null, detailObject.state);
  
  //ASSET FREEZE
  if (chosenDetail == 'assetFreeze' || chosenDetail == 'idAtRisk') {
    if (req.session.data.assetFreezeEnd != '') {
      req.session.data.personalDetails.assetFreeze.state = 5;
    }
  }
  
    
    
}
  //RESET
  req.session.data.personalDetailValue = null;
  // NEXT
  res.redirect('/account2/account')

})

//DISABILITY
router.get(/disability-type-handler/, function (req, res) {
  req.session.data.disability.state = req.query.data;
  if (req.session.data.disability.state === 'updating' || req.session.data.disability.state === 'correcting') {
    req.session.data.personalDetails.disability.value = flip(req.session.data.personalDetails.disability.value);
  }
  res.redirect('/update/person/check')
})

//NATIONALITY
router.get(/nationality-type-handler/, function (req, res) {
  req.session.data.nationality.state = req.query.data;
  res.redirect('/update/person/nationality/update')
})

//MARITAL
router.get(/marital-type-handler/, function (req, res) {
  req.session.data.maritalState = req.query.data;
  res.redirect('/update/person/marital/update')
})

//Special customer record level
router.get(/recordLevel-type-handler/, function (req, res) {
  req.session.data.recordLevel.state = req.query.data;
  if(req.session.data.recordLevel.state == 'removing') {
    res.redirect('/update/person/check')
  } else {
    res.redirect('/update/person/recordLevel/update')
  }
})

//nifu
router.get(/nifu-type-handler/, function (req, res) {
  req.session.data.personalDetails.nifu.state = req.query.data;
  req.session.data.personalDetails.nifu.value = flip(req.session.data.personalDetails.nifu.value);
  res.redirect('/update/person/check')
})

//NEEDS
router.get(/sneeds-handler/, function (req, res) {
  res.redirect('/update/person/needs/update')
})

//NEEDS
router.get(/sneeds-type-handler/, function (req, res) {
  if (req.query.data === 'update') {
    req.session.data.specialNeeds.state = 'updating'
    res.redirect('/update/person/needs/update')
  } else {
    req.session.data.specialNeeds.state = 'correcting'
    res.redirect('/update/person/needs/update')
  }
})

//GENDER
function updateGender(show, hide) {
  show = true;
  hide = false;
}

router.get(/add-gender-handler/, function (req, res) {
  if (req.session.data.personalDetails.gender.gra == false && req.session.data.personalDetails.gender.preGra == false) {
    req.session.data.personalDetails.sex.value = changeSex(req.session.data.personalDetails.sex.value);
  }
  req.session.data.editState = 'adding';
  if (req.query.data == 'gra') {
    req.session.data.personalDetail = 'gra';
    if (req.session.data.personalDetails.gender.preGra == true) {
      res.redirect('/update/person/gender/update')
    } else {
      res.redirect('/update/person/gender/sex')
    }
  } else {
    req.session.data.personalDetail = 'preGra';
    if (req.session.data.personalDetails.gender.gra == true) {
      res.redirect('/update/person/gender/update')
    } else {
      res.redirect('/update/person/gender/sex')
    }
  }
})

router.get(/gender-type-handler/, function (req, res) {
  if (req.session.data.personalDetails.gra.state === 'updating') {
    req.session.data.personalDetails.gra.state = req.query.data;
  } else {
    req.session.data.personalDetails.preGra.state = req.query.data;
  }
  res.redirect('/update/person/gender/update')
})

router.get(/updating-handler/, function (req, res) {
  var feature = req.query.feature;
//  var featureState = feature+'State';
  req.session.data[feature].state = req.query.state;
  if(req.query.feature === 'preGra' || req.query.feature === 'gra') {
    if (req.query.state == 'adding') {
      res.redirect('/update/person/gender/update')
    } else {
      res.redirect('/update/person/gender/type')
    }
  } else if (req.query.feature == 'disability' || req.query.feature == 'needs' || req.query.feature == 'nifu') {
    res.redirect('/update/person/' + feature + '/type')
  } else {
    // var toPage = '/update/person/' + req.query.feature + '/update';
    res.redirect('/update/person/' + feature + '/update')
  }
})

router.get(/newupdate-handler/, function (req, res) {
  var feature = req.query.feature;
  var featureState = feature+'State';
  req.session.data[feature].state = req.query.state;
  if(req.query.feature === 'preGra' || req.query.feature === 'gra') {
    if (req.query.state == 'adding') {
      res.redirect('/update/person/gender/update')
    } else {
      res.redirect('/update/person/gender/type')
    }
  } else if (req.query.feature == 'disability' || req.query.feature == 'needs' || req.query.feature == 'nifu' || req.query.feature == 'recordLevel') {
    res.redirect('/update/person/' + feature + '/type')
  } else if (req.query.feature == 'sex') {
    req.session.data.personalDetails.sex = changeSex(req.session.data.personalDetails.sex.value);
    res.redirect('/update/person/check')
  } else {
    // var toPage = '/update/person/' + req.query.feature + '/update';
    res.redirect('/update/person/' + feature + '/update')
  }
})

router.get(/updatecontact-handler/, function (req, res) {
  var feature = req.query.feature;
  var state = req.query.state;
  req.session.data[feature].state = state;
  res.redirect('/update/person/contact/' + feature)
})

router.get(/check-gender-handler/, function (req, res) {
  if (req.session.data.personalDetail == 'gra') {
    req.session.data.personalDetails.gender.gra = true;
  } else {    
    req.session.data.personalDetails.gender.preGra = true;
  }
  req.session.data.personalDetails.gender.show = true;
  req.session.data.toaster = generalFunctions.setToasterMessage('Gender recognition details', null, 'added');
  if (req.session.data.sexValue == 'Male') {
    req.session.data.personalDetails.sex.value = true;
  } else if (req.session.data.sexValue == 'Female'){
    req.session.data.personalDetails.sex.value = false;
  }
  req.session.data.sexValue = null;
  res.redirect('/account2/account')
})


/*********/
/** SEX **/
/*********/

router.get(/update-sex-handler/, function (req, res) {
  if (req.query.data === 'gra') {
    req.session.data.updateType = 'addGra';
  } else {
    req.session.data.updateType = 'addPreGra';
  }
  res.redirect('/update/gender/update-gender')
})

router.get(/sex-adv-handler/, function (req, res) {
  req.session.data.updateType = 'updateGender';
  res.redirect('/update/sex/update-sex')
})

router.get(/sex-simple-handler/, function (req, res) {
  req.session.data.updateType = 'correctSex';
  res.redirect('/update/sex/check')
})

router.get('/sex/update', function (req, res) {
  req.session.data.updateType = 'updateGender';
  res.render('update/sex/update')
})

router.get(/check-sex-handler/, function (req, res) {
  if(req.session.data.updateType === 'correctSex') {
    req.session.data.sexChanged = true;
  } else {
    req.session.data.personalDetails.genderUpdated = true;
  }
  req.session.data.sex = 'Female';
  res.redirect('/account2/account')
})


/**********/
/** NAME **/
/**********/

router.get(/add-handler/, function (req, res) {
  req.session.data.updateType = 'add';
  if(req.session.data.details.nameTwo.show == true) {
    req.session.data.nameType = 'requestedName';
    res.redirect('../../update/name/update-name')
  } else if(req.session.data.details.requestedName.show == true) {
    req.session.data.nameType = 'nameTwo';
    res.redirect('../../update/name/update-name')
  } else {
    res.redirect('../../update/name/add')
  }
})

router.get(/name-change-handler/, function (req, res) {
  req.session.data.toaster = null;
  req.session.data.updateType = 'change';
  res.redirect('/update/name/update')
})

//change name
router.get(/change-name-type-handler/, function (req, res) {
  if(req.session.data.updateType == 'end') {
    res.redirect('remove')
  } else {
    res.redirect('update-name')
  }
})

//check name
router.get(/check-name-handler/, function (req, res) {
  req.session.data.toaster = null;  
  if (req.session.data.nameType == 'name' || req.session.data.nameType == 'nameTwo') {
    if (req.session.data.updateType != 'end') {
      req.session.data.details[req.session.data.nameType].title = req.session.data.title;
      req.session.data.details[req.session.data.nameType].first = req.session.data.firstname;
      req.session.data.details[req.session.data.nameType].last = req.session.data.lastname;
      req.session.data.details[req.session.data.nameType].suffix = req.session.data.suffix;
      req.session.data.details[req.session.data.nameType].show = true;
    } else { 
      req.session.data.details.nameTwo.show = false;
    }
  }
  if (req.session.data.nameType == 'requestedName') {
    if (req.session.data.updateType != 'end') {
      req.session.data.details.requestedName.value = req.session.data.requestedName;
      req.session.data.details[req.session.data.nameType].show = true;
    } else { 
      req.session.data.details.requestedName.show = false;
    }
  }
  req.session.data.details[req.session.data.nameType].state = setState(req.session.data.updateType);
  req.session.data.toaster = generalFunctions.setToasterMessage(req.session.data.details[req.session.data.nameType].display, null, req.session.data.details[req.session.data.nameType].state);
  res.redirect('../../account2/account')
})



/*************/
/** ADDRESS **/
/*************/

//master-account
router.get('/master-account/account', function (req, res) {
  res.render('master-account/account.html', {
    dataState : dataState,
    today : dates.todayAsString(),
    residentialaddress : residentialAddress,
    correspondenceaddress : correspondenceAddress,
    previousaddress : previousAddress,
    startdate : residentialAddress.startDate,
    updated : dataState.updatedToNewAddress,
    cherished : dataState.cherished,
    editDate : content.editDate,
    correspondence : dataState.correspondenceAdded,
    statusupdated : dataState.statusUpdated,
    addresscorrected : dataState.addressCorrected,
    correspondenceremoved : dataState.correspondenceRemoved,
    dateisupdated : dataState.dateIsUpdated,
    interestAdded : dataState.interestAdded,
    interestRemoved : dataState.interestRemoved,
    interestTransfered : dataState.interestTransfered,
    typeTwoAdded : dataState.typeTwoAdded,
    cherishedlinecorrected : dataState.cherishedLineCorrected,
    currentstatus : dataState.currentStatus,
    statuscorrected : dataState.statusCorrected,
    interests : interests
  })
})

//account2
router.get('/account2/account', function (req, res) {
  res.render('account2/account.html', {
    dataState : dataState,
    today : dates.todayAsString(),
    residentialaddress : residentialAddress,
    correspondenceaddress : correspondenceAddress,
    previousaddress : previousAddress,
    startdate : residentialAddress.startDate,
    updated : dataState.updatedToNewAddress,
    cherished : dataState.cherished,
    editDate : content.editDate,
    correspondence : dataState.correspondenceAdded,
    statusupdated : dataState.statusUpdated,
    addresscorrected : dataState.addressCorrected,
    correspondenceremoved : dataState.correspondenceRemoved,
    dateisupdated : dataState.dateIsUpdated,
    interestAdded : dataState.interestAdded,
    interestRemoved : dataState.interestRemoved,
    interestTransfered : dataState.interestTransfered,
    typeTwoAdded : dataState.typeTwoAdded,
    cherishedlinecorrected : dataState.cherishedLineCorrected,
    currentstatus : dataState.currentStatus,
    statuscorrected : dataState.statusCorrected,
    interests : interests
  })
})

//account
router.get('/update/account', function (req, res) {
  res.render('update/account.html', {
    residentialaddress : residentialAddress,
    correspondenceaddress : correspondenceAddress,
    previousaddress : previousAddress,
    startdate : residentialAddress.startDate,
    updated : dataState.updatedToNewAddress,
    cherished : dataState.cherished,
    editDate : content.editDate,
    correspondence : dataState.correspondenceAdded,
    statusupdated : dataState.statusUpdated,
    addresscorrected : dataState.addressCorrected,
    correspondenceremoved : dataState.correspondenceRemoved,
    dateisupdated : dataState.dateIsUpdated,
    interestAdded : dataState.interestAdded,
    interestRemoved : dataState.interestRemoved,
    typeTwoAdded : dataState.typeTwoAdded,
    interestTransfered : dataState.interestTransfered,
    cherishedlinecorrected : dataState.cherishedLineCorrected,
    currentstatus : dataState.currentStatus,
    statuscorrected : dataState.statusCorrected,
    interests : interests
  })
})

//ADDRESSES
router.get(/update-address-handler/, function (req, res) {
  if (req.session.data.updateType == 1) {
    res.redirect('/update/address-search')
  } else { 
    res.redirect('/update/type')
  }
})

router.get(/address-type-handler/, function (req, res) {
  var addressType = req.session.data.addressType;
  var chosenAddress = req.session.data.addresses[addressType];
  
  if (req.session.data.tempValue == 5) {
    if (req.session.data.updateType == 3) {
      res.redirect('/update/check')
    } else {
      res.redirect('/update/dates')
    }
  } else if (req.session.data.tempValue == 'status') {
    if (req.session.data.addresses.correspondence.show == true) {
      res.redirect('/update/status')
    } else {
      req.session.data.tempStatus = addressFunctions.flipStatus(chosenAddress);
      res.redirect('/update/check')
    }
  } else if (req.session.data.tempValue == 'cherish') {
    res.redirect('/update/cherish-line')
  } else if (req.session.data.tempValue == 'dates') {
    res.redirect('/update/dates')
  } else {
    res.redirect('/update/address-search')
  }
})

router.get('/update/search-results-handler', function (req, res) {
  if (req.session.data.updateType == 3) {
    res.redirect('/update/check')
  } else {
    res.redirect('/update/dates')
  }
})

router.get(/cherish-handler/, function (req, res) {
  if (req.session.data.updateType == 2) {
    res.redirect('dates')
  }
  if (req.session.data.updateType == 3) {
    res.redirect('check')
  }
})

router.get(/check-address-handler/, function (req, res) {
  var addressType = req.session.data.addressType;
  var chosenAddress = req.session.data.addresses[addressType];
  var updateType = req.session.data.updateType;
  var tempValue = req.session.data.tempValue;
  var cherishStatus = req.session.data.cherishStatus;

  // SET STATE
  req.session.data.addresses[req.session.data.addressType].state = updateType;
  
  // SET VALUES
  if (tempValue == 'status') {
    req.session.data.addresses[req.session.data.addressType].status = req.session.data.tempStatus;
  }
    
  if (tempValue == 'cherish') {
    if (req.session.data.cherishStatus == 4 ) {
      req.session.data.addresses[req.session.data.addressType].cherish = false;
    } else {
      req.session.data.addresses[req.session.data.addressType].cherish = true;
    }
  }
    
  // SET DISPLAY
  req.session.data.addresses[req.session.data.addressType] = addressFunctions.setShow(chosenAddress, updateType, tempValue);
  
  // SET MESSAGE
  req.session.data.toaster = generalFunctions.setToasterMessage (chosenAddress.display, null, updateType);
 
  // RESET
  req.session.data.tempStatus = null;
  addressType, chosenAddress, updateType, tempValue, cherishStatus = null;
  req.session.data.addressType, req.session.data.updateType, req.session.data.tempValue, req.session.data.cherishStatus = null;
  
  // REDIRECT
  res.redirect('/account2/account')
})



router.get('/choice-handler', function (req, res) {
  res.render('address-search')
})

router.get('/update/update-v2', function (req, res) {
  res.render('update/update-v2', {
    cherish : residentialAddress.cherish,
    correspondence : dataState.correspondenceAdded,
    pagetitle : content.pageTitle,
    statusupdated : dataState.statusUpdated,
    status : dataState.currentStatus
  })
})

router.get('/update/status', function (req, res) {
  res.render('update/status', {
    pagetitle : content.pageTitle,
    status : dataState.currentStatus
  })
})

router.get(/status-handler/, function (req, res) {
  if (req.session.data.updateType == 2) {
    res.redirect('dates')
  } else {
    res.redirect('check')
  }
})

router.get('/update/cherish-line', function (req, res) {
  res.render('update/cherish-line', {
    pagetitle : content.pageTitle
  })
})

router.get('/update/print-sar', function (req, res) {
  res.render('update/print-sar', {
    sar : true
  })
})

router.get(/change-link-handler/, function (req, res) {
  req.session.data.updateType = 4;
  req.session.data.personalDetail = "bereavementBenefit";
  res.redirect('/update/benefits/check')
})

router.get(/check-benefit-handler/, function (req, res) {
  req.session.data.personalDetails.bereavementBenefit.value = false;
  req.session.data.personalDetails.bereavementBenefit.show = false;
  req.session.data.personalDetails.bereavementBenefit.state = 5;
  req.session.data.toaster = generalFunctions.setToasterMessage(req.session.data.personalDetails.bereavementBenefit.display, null, req.session.data.personalDetails.bereavementBenefit.state);
  res.redirect('/account2/account')
})


//maintain account
router.get(/maintain-account-handler/, function (req, res) {
  if (req.session.data.updateType == 3) {
    res.redirect('verification')
  } else if (req.session.data.updateType == 1)  {
    res.redirect('recover')
  } else if (req.session.data.updateType == 0) {
    req.session.data.tempAccountStatus = 'Open'
    res.redirect('check')
  } else {
    res.redirect('status')
  }
})

router.get(/nino-level-handler/, function (req, res) {
  if (req.session.data.tempAccountStatus == 'Superseded' ) {
    res.redirect('supersede')
  } else {
    res.redirect('check')
  }
})

router.get(/check-nino-handler/, function (req, res) {
  if (req.session.data.updateType == 3) {
//  var tempmessage;
    req.session.data.personalDetails.ninoVerificationLevel.value = req.session.data.verificationLevel;
    req.session.data.toaster = generalFunctions.setToasterMessage('National Insurance number verification type', null, 2);
  } else if (req.session.data.updateType == 1) {
//    if (req.session.data.tempawards == 'true' && req.session.data.temprelationships == 'true') {
//      tempmessage = 'Awards and relationship data recovered';
//    } else if (req.session.data.tempawards == 'true') {
//      tempmessage = 'Awards data recovered';
//    } else if (req.session.data.temprelationships == 'true') {
//      tempmessage = 'Relationship data recovered';
//    }
    req.session.data.toaster = generalFunctions.setToasterMessage('Any available data has been recovered', null, ' ');
  } else {
    req.session.data.personalDetails.accountStatus.value = req.session.data.tempAccountStatus;
    req.session.data.toaster = generalFunctions.setToasterMessage('Account status', null, 2);
  }
  req.session.data.tempawards = null;
  req.session.data.temprelationships = null;
//  tempmessage = null;
  res.redirect('/account2/account')
})

// Available data has been recovered


//relationships
router.get(/cancel-handler/, function (req, res) {
  req.session.data.toaster = null;
  res.redirect('/account2/account')
})

router.get(/add-relationships-handler/, function (req, res) {
  req.session.data.updateType = 1;
  res.redirect('check')
})

router.get(/relationship-handler/, function (req, res) {
  req.session.data.miscData.relationships.state = req.session.data.updateType;
  req.session.data.toaster = generalFunctions.setToasterMessage("Relationship", null, req.session.data.updateType);
  req.session.updateType = null;
  res.redirect('/account2/account')
})

router.get(/change_relationship/, function (req, res) {
  if(req.session.data.updateType == 1) {
    res.redirect('/update/relationships/add')
  } else {
    res.redirect('/update/relationships/check')
  }
})

router.get(/recover-relationships-handler/, function (req, res) {
  req.session.data.updateType = 9;
  res.redirect('/update/relationships/check')
})


//*********
//Version 1
//*********

var previousAddresses = false;

router.get(/check-handler-v1/, function (req, res) {
  if(req.session.data.updateType === 'add') {
    correspondence = true;
  }
  if (req.session.data.updateType === 'address') {
    previousAddresses = true;    
    isUpdated = true;
  }
  res.redirect('account')
})

router.get('/update/v1/account', function (req, res) {
  res.render('update/v1/account', {
    updated : dataState.updatedToNewAddress,
    editDate : content.editDate,
    previous_addresses : previousAddresses,
    correspondence : dataState.correspondenceAdded
  })
})

router.get('/update/v1/update', function (req, res) {
  res.render('update/v1/update', {
    correspondence : dataState.correspondenceAdded,
    pagetitle : content.pageTitle
  })
})

router.get('/update/v1/check', function (req, res) {
  res.render('update/v1/check', {
    pagetitle : content.pageTitle
  })
})

router.get(/update-handler-v1/, function (req, res) {
  if(req.query.data === 'status') {
    req.session.data.updateType = 'status';
    res.render('update/v1/status')
  } else if (req.query.data === 'cherish') {
    req.session.data.updateType = 'cherish';
    res.render('update/v1/cherish-line')
  } else if (req.query.data === 'dlo') {
    req.session.data.updateType = 'dlo';
    res.render('update/v1/dates')
  } else if (req.query.data === 'dlo') {
    req.session.data.updateType = 'dlo';
    res.render('update/dates')
    res.render('update/v1/dates')
  } else {
    req.session.data.updateType = 'address';
    res.redirect('address-search')
  }
})

router.get(/change-handler-v1/, function (req, res) {
  if (req.query.tochange == 'add') {
    req.session.data.updateType = 'new';
    res.render('update/address-search')
  } else if (req.query.tochange == 'correct'){
    res.redirect('correct')
  } else {
    res.redirect('update')
  }
})

router.get(/correction-type-handler/, function (req, res) {
  var next = 'update/dates';
  if(req.query.data === 'new') {
  dataState.correctionType = 'toNew';
    next = 'update/address-search'
  } else if(req.query.data === 'status') {
   dataState.correctionType = 'status';
    next = 'update/status'
  } else if(req.query.data === 'date') {
   dataState.correctionType = 'date';
  } else if(req.query.data === 'cherish') {
    next = 'update/cherish'
   dataState.correctionType = 'cherish';
  } else if (req.query.data == 'correct'){
    res.render('update/correct')
    res.redirect('address-search')
  } 
  res.render(next);
})


//***********
// INTERESTS 
//***********

router.get(/add-int-handler/, function (req, res) {
  res.redirect('/update/interests/add-interest');
})

var counter;

router.get(/add-interest-handler/, function (req, res) {
  req.session.data.updateType = 'addInterest';
  resetToDefaults();
  tempInterest.live = true;
  tempInterest.title = req.query.interest;
  tempInterest.startDate = dates.convertDayToString(req.query.startdate);
  if(tempInterest.title === 'Carers Credit') {
    tempInterest.system = 'sys';
    res.redirect('add-party');
  } else if (tempInterest.title === 'Bereavement Support Payment') {
    tempInterest.system = 'sys';
    res.redirect('add-party');
  } else if (tempInterest.title === 'Winter Fuel Payment') {
    tempInterest.system = 'sys';
    res.redirect('add-party');
  } else {
    res.redirect('add-system');
  }
})

router.get(/interest-check-handler/, function (req, res) {
  if (req.session.data.updateType == 'addInterest') {
    addInterest(tempInterest);
    dataState.interestAdded = true;   
  }
  resetTempInterest(req.session.data.tempInterest);
//  if (req.session.data.updateType === 'transferInterest') {
//    dataState.interestTransfered = true;
//  }
  res.redirect('/account2/account');
})

router.get(/change-interest-handler/, function (req, res) {
  var y = parseInt(req.query.tempPos);
  tempInterest = interests[y];
  res.redirect('/update/interests/update-interest');
})

router.get(/update-interest-handler/, function (req, res) {
  if (req.query.data === 'end-parties') {
    req.session.data.updateType = 'endfParties'
    res.redirect('end-party');
  } else if (req.query.data === 'transfer') {
    req.session.data.updateType = 'transferInterest'
    res.redirect('transfer-interest');
  } else  {
    req.session.data.updateType = 'endInterest'
    res.redirect('end-interest');
  }
})

router.get(/end-interest-handler/, function (req, res) {
  tempInterest.live = false;
  dataState.interestRemoved = true;
  res.redirect('../account');
})

router.get('/add-system', function (req, res) {
  res.render('add-party', {
    tempInterest : tempInterest
  });
})

router.get(/add-system-handler/, function (req, res) {
  tempInterest.system = req.query.system;
  res.redirect('add-party');
})

router.get('/update/interests/add-system', function (req, res) {
  res.render('update/interests/add-system', {
    tempInterest : tempInterest
  })
})

router.get(/party-handler/, function (req, res) {
  if (req.query.own == 'true') {
    tempInterest.owning = true;
  } else {
    tempInterest.owning = false;
  }
  if (req.query.broadcasting == 'true') {
    tempInterest.broadcasting = true;
  } else {
    tempInterest.broadcasting = false;
  }
  if (req.query.maint == 'true') {
    tempInterest.maintained = true;
  } else {
    tempInterest.maintained = false;
  }
  res.redirect('check');
})

router.get('/update/interests/interests', function (req, res) {
  res.render('update/interests/interests', {
    interests : interests
  })
})

router.get('/update/interests/update-interest', function (req, res) {
  res.render('update/interests/update-interest', {
    interests : interests,
    tempInterest : tempInterest
  })
})

router.get('/update/interests/transfer-interest', function (req, res) {
  res.render('update/interests/transfer-interest', {
    interests : interests,
    tempInterest : tempInterest
  })
})

router.get('/update/interests/check', function (req, res) {
  res.render('update/interests/check', {
    tempInterest : tempInterest
  })
})

router.get('/update/interests/add-party', function (req, res) {
  res.render('update/interests/add-party', {
    tempInterest : tempInterest,
    counter : counter
  })
})


//*****************
// ACCOUNT CREATION 
//*****************


//************
//All versions
//************


//special-needs
router.get(/check-handler/, function (req, res) {
  if(trace === true) {
    res.redirect('trace')
  } else {
    res.redirect('done')
  }
})

//other-name-handler
router.get(/other-name-handler/, function (req, res) {
  var next = 'dob';
  if (req.query.requested[0] === 'true') {
    person.rfa_name = true;
    next = 'name-requested';
  }
  if (req.query.previous[0] === 'true') {
    person.previous_name = true;
    next = 'name-previous';
  }
  if (req.query.alternative[0] === 'true') {
    person.alternative_name = true;
    next = 'name-alternative';
  }
  res.redirect(next)
})

//alternative-name-handler
router.get(/alternative-name-handler/, function (req, res) {
  var next = 'dob';
  if (person.rfa_name === true) {
    next = 'name-requested';
  }
  if (person.previous_name === true) {
    next = 'name-previous';
  }
  res.redirect(next)
})

//previous-question-handler
router.get(/previous-question-handler/, function (req, res) {
  if (req.query.data === 'yes') {
    person.previous_name_count++;
    res.redirect('name-previous')
  } else if (person.rfa_name === true) {
    res.redirect('name-requested')
  } else {
    res.redirect('dob')
  }
})

//correspondence-address-handler
router.get(/correspondence-address-handler/, function (req, res) {
  if (req.query.data === 'yes') {
    res.redirect('search-correspondence')
  } else {
    person.correspondence_address = false;
    res.redirect('address-question')
  }
})

//manual-address-handler
router.get(/manual-handler/, function (req, res) {
  if (person.previous_address != null) {
    res.redirect('contact-question')
  } else {
    res.redirect('address-question')
  }
})


//correspondence-address-handler
router.get(/correspondence-results-handler/, function (req, res) {
  if(person.previous_address === null) {
    res.redirect('address-question')
  } else {
    res.redirect('contact-question')
  }
})

//search-results-handler
router.get(/address-stat-handler/, function (req, res) {
  if (req.query.data === 'live' || req.query.data === 'dlo') {
    res.redirect('address-search')
  } else {
    res.redirect('search-correspondence')
  }  
})

//search-handler
router.get(/add-man-handler/, function (req, res) {
  if (req.query.uk === 'no') {
    res.redirect('dates')
  } else {
    res.redirect('search-results')
  }
})

//search-handler
router.get(/search-handler/, function (req, res) {
  if (req.query.uk === 'no') {
    res.redirect('correspondence-question')
  } else {
    res.redirect('search-results')
  }
})

//search-handler
router.get(/mauual-previous-handler/, function (req, res) {
  person.previous_address_count++;
  res.redirect('address-question')
})

//search-previous-handler
router.get(/s-previous-handler/, function (req, res) {
  if (req.query.uk === 'no') {
    res.redirect('contact-question')
  } else {
    res.redirect('previous-results')
  }
})

//search-previous-handler
router.get(/s-correspondence-handler/, function (req, res) {
  person.correspondence_address = true;
  if (req.query.uk === 'no') {
    if (person.previous_address === null) {
      res.redirect('address-question')
    } else {
      res.redirect('contact-question')
    }
  } else {
    res.redirect('correspondence-results')
  }
})

//previous-address-handler
router.get(/previous-address-handler/, function (req, res) {
  var next;
  if (person.previous_address_count === 0) {
    if (req.query.data === 'yes') {
      person.previous_address = true;
    } else {
      person.previous_address = false;
    }
    person.previous_address_count++;
  }
  if (req.query.data === 'yes') {
    next = 'search-previous';
  } else if (person.correspondence_address === null) {
    next = 'correspondence-question';
  } else {
    next = 'contact-question';
  }
  res.redirect(next)
})

//contact-handler
router.get(/contact-handler/, function (req, res) {
  if (req.query.data === 'telephone') {
    res.redirect('telephone')
  } else if (req.query.data === 'email') {
    res.redirect('email')
  } else {
    res.redirect('mobile')
  }
})

//requested-name-handler
router.get(/requested-name-handler/, function (req, res) {
  if (req.query.data === 'yes') {
    person.requested_name = true;
    res.redirect('name-requested')
  } else {
    person.requested_name = false;
    res.redirect('previous-name')
  }
})

//ethnic-handler
router.get(/ethnic-origin-handler/, function (req, res) {
  person.ethnic_origin = true;
  res.redirect('task-list')
})

//immigration-handler
router.get(/immigration-handler/, function (req, res) {
  person.immigration = true;
  res.redirect('task-list')
})

//preferred-language-handler
router.get(/preferred-language-handler/, function (req, res) {
  person.preferred_language = true;
  res.redirect('task-list')
})

//spoken-language-handler
router.get(/spoken-language-handler/, function (req, res) {
  person.spoken_language = true;
  res.redirect('task-list')
})

//disability-handler
router.get(/disability-handler/, function (req, res) {
  person.disability = true;
  res.redirect('task-list')
})

//special-needs-handler
router.get(/special-needs-handler/, function (req, res) {
  person.special_needs = true;
  res.redirect('task-list')
})

var setCreateJourney = function(x) {
  if (x == 'create' ) {
    return true;
  } else {
    return false;
  }
}

var setTrace = function(y) {
  if(y == 'true') {
    return true;
  }
}

//type-handler
router.get(/v1-type-handler/, function (req, res) {
  ninoVersion = 1;
  req.session.data.createJourney = setCreateJourney(req.query.data);
  res.redirect('../../search')
})

router.get(/v2-type-handler/, function (req, res) {
  ninoVersion = 2;
  trace = setTrace(req.query.trace[0]);
  req.session.data.createJourney = setCreateJourney(req.query.data);
  res.redirect('../../search')
})

router.get(/v3-type-handler/, function (req, res) {
  ninoVersion = 3;
  trace = setTrace(req.query.trace[0]);
  req.session.data.createJourney = setCreateJourney(req.query.data);
  res.redirect('../../search')
})

router.get(/v4-type-handler/, function (req, res) {
  ninoVersion = 4;
  trace = setTrace(req.query.trace[0]);
  req.session.data.createJourney = setCreateJourney(req.query.data);
  res.redirect('../../search')
})

router.get(/v5-type-handler/, function (req, res) {
  ninoVersion = 5;
  trace = setTrace(req.query.trace[0]);
  req.session.data.createJourney = setCreateJourney(req.query.data);
  res.redirect('../../search')
})

router.get(/v6-type-handler/, function (req, res) {
  ninoVersion = 6;
  trace = setTrace(req.query.trace[0]);
  req.session.data.createJourney = setCreateJourney(req.query.data);
  res.redirect('../../search')
})

//contact-handler
router.get(/contact-question-handler/, function (req, res) {
  if(req.query.data === 'yes') {
    res.redirect('add-contact')
  } else {
    res.redirect('nationality')
  }
})

//non-mandatory-handler
router.get(/v2-non-mandatory-handler/, function (req, res) {
  if (req.query.data === 'yes') {
    res.redirect('task-list')
  } else {
    res.redirect('check')
  }
})



//*********
//Version 4
//*********

//nino-contacts-handler
router.get(/nino-contacts-handler/, function (req, res) {
  req.session.data.contactTypes[req.session.data.contactType].show = true;
  req.session.data.contactTypes[req.session.data.contactType].state = 'added';
  res.redirect('another-contact')
})


//contact-group-handler
router.get(/contact-group-handler/, function (req, res) {
  req.session.data.toaster = null;
  req.session.data.preferredContactState = null;
  req.session.data.updateType = 1;
  if (req.query.contactType == 'telephone' || req.query.contactType == 'email' || req.query.contactType == 'fax') {
    res.redirect('contact-type')
  } else {
    res.redirect('contact-details')
  }
})

//current-name
router.get('/nino/6/name-current/', function (req, res) {
  res.render('nino/6/name-current', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//address-alternative
router.get('/nino/6/name-alternative/', function (req, res) {
  res.render('nino/6/name-alternative', {
    person : person
  })
})

//name-previous
router.get('/nino/6/name-previous/', function (req, res) {
  res.render('nino/6/name-previous', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//address-search
router.get('/nino/6/address-search/', function (req, res) {
  res.render('nino/6/address-search', {
    person : person
  })
})

//search-results
router.get('/nino/6/search-results/', function (req, res) {
  res.render('nino/6/search-results', {
    person : person
  })
})

//search-previous
router.get('/nino/6/search-previous/', function (req, res) {
  res.render('nino/6/search-previous', {
    previous_name : person.previous_name
  })
})

//previous-results
router.get('/nino/6/previous-results/', function (req, res) {
  res.render('nino/6/previous-results', {
    person : person
  })
})

//search-correspondence
router.get('/nino/6/search-correspondence/', function (req, res) {
  res.render('nino/6/search-correspondence', {
    person : person
  })
})

//correspondence-results
router.get('/nino/6/correspondence-results/', function (req, res) {
  res.render('nino/6/correspondence-results', {
    person : person
  })
})

//current-name
router.get('/nino/6/search-previous/', function (req, res) {
  res.render('nino/6/search-previous', {
    previous_name : person.previous_name,
  })
})

//requested-name
router.get('/nino/6/name-requested/', function (req, res) {
  res.render('nino/6/name-requested', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//previous-name
router.get('/nino/6/requested-name/', function (req, res) {
  res.render('nino/6/requested-name', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//requested-name
router.get('/nino/6/requested-name/', function (req, res) {
  res.render('nino/6/requested-name', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//previous-name
router.get('/nino/6/previous-name/', function (req, res) {
  res.render('nino/6/previous-name', {
    person : person
  })
})

//manual-correspondence
router.get('/nino/6/manual-correspondence/', function (req, res) {
  res.render('nino/6/manual-correspondence', {
    person : person
  })
})

//manual-correspondence
router.get('/nino/6/manual-previous/', function (req, res) {
  res.render('nino/6/manual-previous', {
    person : person
  })
})


//address-search
router.get('/nino/6/previous-names/', function (req, res) {
  res.render('nino/6/previous-names', {
    person : person
  })
})

//address-question
router.get('/nino/6/address-question/', function (req, res) {
  res.render('nino/6/address-question', {
    person : person
  })
})

//check
router.get('/nino/6/check/', function (req, res) {
  res.render('nino/6/check', {
    today : dates.todayAsString(),
    underSixteen : underSixteen
  })
})

//check
router.get('/nino/6/check-v2/', function (req, res) {
  res.render('nino/6/check-v2', {
    today : dates.todayAsString()
  })
})

//task-list
router.get('/nino/6/task-list/', function (req, res) {
  res.render('nino/6/task-list', {
    person : person
  })
})



//*********
//Version 3
//*********
 
//nino
router.get(/another-handler/, function (req, res) {
  if (req.query.data == 'yes'){
    res.redirect('add-contact')
  } else {
    res.redirect('nationality')
  }
})

//current-name
router.get('/nino/5/name-current/', function (req, res) {
  res.render('nino/5/name-current', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//address-alternative
router.get('/nino/5/name-alternative/', function (req, res) {
  res.render('nino/5/name-alternative', {
    person : person
  })
})

//name-previous
router.get('/nino/5/name-previous/', function (req, res) {
  res.render('nino/5/name-previous', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//address-search
router.get('/nino/5/address-search/', function (req, res) {
  res.render('nino/5/address-search', {
    person : person
  })
})

//search-results
router.get('/nino/5/search-results/', function (req, res) {
  res.render('nino/5/search-results', {
    person : person
  })
})

//search-previous
router.get('/nino/5/search-previous/', function (req, res) {
  res.render('nino/5/search-previous', {
    previous_name : person.previous_name
  })
})

//previous-results
router.get('/nino/5/previous-results/', function (req, res) {
  res.render('nino/5/previous-results', {
    person : person
  })
})

//search-correspondence
router.get('/nino/5/search-correspondence/', function (req, res) {
  res.render('nino/5/search-correspondence', {
    person : person
  })
})

//correspondence-results
router.get('/nino/5/correspondence-results/', function (req, res) {
  res.render('nino/5/correspondence-results', {
    person : person
  })
})

//current-name
router.get('/nino/5/search-previous/', function (req, res) {
  res.render('nino/5/search-previous', {
    previous_name : person.previous_name,
  })
})

//requested-name
router.get('/nino/5/name-requested/', function (req, res) {
  res.render('nino/5/name-requested', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//previous-name
router.get('/nino/5/requested-name/', function (req, res) {
  res.render('nino/5/requested-name', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//requested-name
router.get('/nino/5/requested-name/', function (req, res) {
  res.render('nino/5/requested-name', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//previous-name
router.get('/nino/5/previous-name/', function (req, res) {
  res.render('nino/5/previous-name', {
    person : person
  })
})

//manual-correspondence
router.get('/nino/5/manual-correspondence/', function (req, res) {
  res.render('nino/5/manual-correspondence', {
    person : person
  })
})

//manual-correspondence
router.get('/nino/5/manual-previous/', function (req, res) {
  res.render('nino/5/manual-previous', {
    person : person
  })
})


//address-search
router.get('/nino/5/previous-names/', function (req, res) {
  res.render('nino/5/previous-names', {
    person : person
  })
})

//address-question
router.get('/nino/5/address-question/', function (req, res) {
  res.render('nino/5/address-question', {
    person : person
  })
})

//nationality
router.get(/v3-nationality-handler/, function (req, res) {
  if(underSixteen === true) {
    res.redirect('check')
  } else {
    res.redirect('marital')
  }
})


//check
router.get('/nino/5/check/', function (req, res) {
  res.render('nino/5/check', {
    today : dates.todayAsString(),
    underSixteen : underSixteen
  })
})

//check
router.get('/nino/5/check-v2/', function (req, res) {
  res.render('nino/5/check-v2', {
    today : dates.todayAsString()
  })
})

//task-list
router.get('/nino/5/task-list/', function (req, res) {
  res.render('nino/5/task-list', {
    person : person
  })
})


//*********
//Version 2
//*********
 
//nino
router.get(/another-handler/, function (req, res) {
  if (req.query.data == 'yes'){
    res.redirect('add-contact')
  } else {
    res.redirect('nationality')
  }
})


//current-name
router.get('/nino/4/name-current/', function (req, res) {
  res.render('nino/4/name-current', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//address-alternative
router.get('/nino/4/name-alternative/', function (req, res) {
  res.render('nino/4/name-alternative', {
    person : person
  })
})

//name-previous
router.get('/nino/4/name-previous/', function (req, res) {
  res.render('nino/4/name-previous', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//address-search
router.get('/nino/4/address-search/', function (req, res) {
  res.render('nino/4/address-search', {
    person : person
  })
})

//search-results
router.get('/nino/4/search-results/', function (req, res) {
  res.render('nino/4/search-results', {
    person : person
  })
})

//search-previous
router.get('/nino/4/search-previous/', function (req, res) {
  res.render('nino/4/search-previous', {
    previous_name : person.previous_name
  })
})

//previous-results
router.get('/nino/4/previous-results/', function (req, res) {
  res.render('nino/4/previous-results', {
    person : person
  })
})

//search-correspondence
router.get('/nino/4/search-correspondence/', function (req, res) {
  res.render('nino/4/search-correspondence', {
    person : person
  })
})

//correspondence-results
router.get('/nino/4/correspondence-results/', function (req, res) {
  res.render('nino/4/correspondence-results', {
    person : person
  })
})

//current-name
router.get('/nino/4/search-previous/', function (req, res) {
  res.render('nino/4/search-previous', {
    previous_name : person.previous_name,
  })
})

//requested-name
router.get('/nino/4/name-requested/', function (req, res) {
  res.render('nino/4/name-requested', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//previous-name
router.get('/nino/4/requested-name/', function (req, res) {
  res.render('nino/4/requested-name', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//requested-name
router.get('/nino/4/requested-name/', function (req, res) {
  res.render('nino/4/requested-name', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//previous-name
router.get('/nino/4/previous-name/', function (req, res) {
  res.render('nino/4/previous-name', {
    person : person
  })
})

//manual-correspondence
router.get('/nino/4/manual-correspondence/', function (req, res) {
  res.render('nino/4/manual-correspondence', {
    person : person
  })
})

//manual-correspondence
router.get('/nino/4/manual-previous/', function (req, res) {
  res.render('nino/4/manual-previous', {
    person : person
  })
})

//address-question
router.get('/nino/4/address-question/', function (req, res) {
  res.render('nino/4/address-question', {
    person : person
  })
})

//check
router.get('/nino/4/check/', function (req, res) {
  res.render('nino/4/check', {
    today : dates.todayAsString()
  })
})

//check
router.get('/nino/4/check-v2/', function (req, res) {
  res.render('nino/4/check-v2', {
    today : dates.todayAsString()
  })
})

//task-list
router.get('/nino/4/task-list/', function (req, res) {
  res.render('nino/4/task-list', {
    person : person
  })
})

//check-handler
router.get(/check-handler/, function (req, res) {
  if(trace === true) {
    res.redirect('trace')
  } else {
    res.redirect('done')
  }
})


//*********
//Version 1
//*********

//task-list
router.get('/nino/2/task-list/', function (req, res) {
  res.render('nino/2/task-list', {
    person : person
  })
})


/************/
/** ALERTS **/
/************/

router.get('/alerts/page-one', function (req, res) {
  res.render('alerts/page-one.njk')
})

router.get('/alerts/alert-search', function (req, res) {
  res.render('alerts/alert-search.njk')
})

router.get('/alerts/v2/page-one', function (req, res) {
  res.render('alerts/v2/page-one.njk')
})


/*******************/
/** notifications **/
/*******************/

router.get('/notifications/page-one', function (req, res) {
  res.render('notifications/page-one.njk')
})

router.get('/notifications/v2/page-one', function (req, res) {
  res.render('notifications/v2/page-one.njk')
})

router.get('/notifications/v3/page-one', function (req, res) {
  res.render('notifications/v3/page-one.njk')
})

router.get('/notifications/search', function (req, res) {
  res.render('notifications/search.njk')
})




module.exports = router



