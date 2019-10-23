var express = require('express')
var router = express.Router()

var personalDetailsFunctions = require('../../functions/personalDetailsFunctions.js');
var generalFunctions = require('../../functions/general.js');

//check-person-handler
router.get(/check-person-handler/, function (req, res) {
  let objectKey = req.session.data.personDetailObject.key;
  if(objectKey == 'disability' ||
    objectKey == 'dateOfBirth' ||
    objectKey == 'dateOfDeath' ||
    objectKey == 'recordLevel' ||
    objectKey == 'preferredLanguage' ||
    objectKey == 'nifu' ||
    objectKey == 'immigration' ||
    objectKey == 'indIndicator' ||
    objectKey == 'maritalStatus' ||
    objectKey == 'nationality' ||
    objectKey == 'spokenLanguage' ||
    objectKey == 'assetFreeze' ||
    objectKey == 'idAtRisk' ||
    objectKey == 'sex') {
    var personalDetailValue = req.session.data.personalDetailValue;
    var verificationlevel = req.session.data.verificationlevel;
    req.session.data.personDetailObject = personalDetailsFunctions.setPDValue(req.session.data.personDetailObject, personalDetailValue);
    req.session.data.personDetailObject = personalDetailsFunctions.setVerificationLevel(req.session.data.personDetailObject, verificationlevel);
    
//    if (personDetailObject.key == 'assetFreeze' || personDetailObject.key == 'idAtRisk') {
//      var endDate = personDetailObject.key + 'End';
//      var startDate = personDetailObject.key + 'Start';
//      personDetailObject = personalDetailsFunctions.setDates(personDetailObject, req.session.data[startDate], req.session.data[endDate]);
//    }

    req.session.data.personDetailObject = personalDetailsFunctions.setPDView(req.session.data.personDetailObject);
    req.session.data.personDetailObject.state = req.session.data.updateType;
    req.session.data.personalDetails[req.session.data.personDetailObject.key] = req.session.data.personDetailObject;
    req.session.data.toaster = generalFunctions.setToasterMessage(req.session.data.personDetailObject.display, null, req.session.data.personDetailObject.state);

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


//which verification level should be updated?
//what is the level?
// req.session.[{verification level}] = {level}
function getVerificationType(personalDetail) {
  if (personalDetail == 'dateOfDeath') {
    console.log(`${personalDetail} returning dodLevel`);
    return 'dodLevel';
  }
}

router.get(/add-detail-handler/, function (req, res) {
  let personalDetail = req.session.data.personalDetail;
  let personalDetailValue = req.session.data.personalDetailValue;
  let verificationlevel = req.session.data.verificationlevel;
  if (verificationlevel == 'Level 3') {
    verificationlevel = 3;
  } else if (verificationlevel == 'Level 2') {
    verificationlevel = 2;
  } else if (verificationlevel == 'Level 1') {
    verificationlevel = 1;
  } else if (verificationlevel == 'Level 0') {
    verificationlevel = 0;
  }
  // update verification level
  if (verificationlevel != null) {
    req.session.data.citizen[getVerificationType(personalDetail)] = verificationlevel;
    console.log(` dodLevel : ${req.session.data.citizen.dodLevel} `);
  }
  if (personalDetailValue == 'true') {
    personalDetailValue = true;
  } else if (personalDetailValue == 'false') {
    personalDetailValue = false;
  } else if (personalDetailValue == 'null') {
    personalDetailValue = null;
  }
  console.log(`${personalDetail} : ${personalDetailValue}`);
  if (personalDetail == 'additionalNeeds') {
    req.session.data.citizen.additionalNeeds = [personalDetailValue];
  } else if (personalDetail == 'dateOfDeath') {
    req.session.data.citizen.dodValue = personalDetailValue;
  } else if(personalDetail == 'pv') {
    req.session.data.citizen.pv = null;
    req.session.data.citizen.pvPartner = null;
    req.session.data.citizen.pvMember = null;
    // req.session.data.citizen[personalDetail] = personalDetailValue;
    for (let x in personalDetailValue ) {
      if(personalDetailValue[x] == "The person" ) {
        req.session.data.citizen.pv = true;
      } else if(personalDetailValue[x] == "The person's partner" ) {
        req.session.data.citizen.pvPartner = true;
      } else if(personalDetailValue[x] == "Someone else in the household" ) {
        req.session.data.citizen.pvMember = true;
      } 
    } 
  } else {
    req.session.data.citizen[personalDetail] = personalDetailValue;
  }
  req.session.data.toaster = generalFunctions.setToasterMessage(generalFunctions.convertDetailToString(personalDetail), null, req.session.data.updateType);
  req.session.data.verificationlevel = null;
  res.redirect('/account3/account')
})

router.get(/check-gender-handler/, function (req, res) {
  if (req.session.data.refactor == false) {
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
  } else {
    //refactor
    let personalDetail= req.session.data.personalDetail;
    let personalDetailValue = req.session.data.personalDetailValue;  
    if (personalDetail == 'gra') {
      req.session.data.citizen.genderGra = true;
    } else {    
      req.session.data.citizen.genderPreGra = true;
    }
    req.session.data.toaster = generalFunctions.setToasterMessage('Gender recognition details', null, 'added');
    if (req.session.data.sexValue == 'Male') {
      req.session.data.citizen.sex = 'male';
    } else if (req.session.data.sexValue == 'Female'){
      req.session.data.citizen.sex = 'female';
    }
    req.session.data.sexValue = null;
    res.redirect('/account3/account')
  }
})

module.exports = router