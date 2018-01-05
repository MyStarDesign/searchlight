var express = require('express')
var router = express.Router()
  
var dataState = {
  updateType : null,
  /*
  correspondence
  updateNew 
  updateStatus
  updateStatusDLO
  updateCherished
  
  correctNew 
  correctStatus 
  correctStatusDLO
  correctStart 
  correctCherished
  */
  incorrectAddress : false,
  correctionType: 'toNew', //status, date, cherish
  status : "live",//dlo, pwa, nfa
  
  previousAddresses : false,
  //now
  correspondenceAdded: false,
  wasUpdated : false,
  cherished : false,

};

var content = {
  editDate : "19 Dec 2017",
  pageTitle : "Update residential address",
  setPageTitle : function() {
    if (dataState.updateType == "updateStatus" || dataState.updateType == "updateStatusDLO") {
      this.pageTitle = "Update an address status"
    } else if (dataState.updateType == "updateCherished") {
      this.pageTitle = "Add a cherished line"
    } else if (dataState.updateType == "correspondence") {
      this.pageTitle = "Add a correspondence address"
    } else if (dataState.updateType == "correctStatus" || dataState.updateType == "correctStatusDLO") {
      this.pageTitle = "Correct an address status"
    } else if (dataState.updateType == "correctCherished") {
      this.pageTitle = "Add a cherished line"
    } else {
      this.pageTitle = "Update residential address"
    }
  console.log(this.pageTitle);
  }
};

var main = require('./main/routes');

router.use('/', main);
// Route index page
  router.get('/', function (req, res) {
  dataState.incorrectAddress = false;
  dataState.updating = false;
  dataState.correcting = false;
  dataState.updateType = null;
  dataState.wasUpdated = false;
  dataState.cherished = false;
  dataState.previousAddresses = false;
  dataState.correspondenceAdded = false;
  pageTitle = "Update residential address";
  res.render('index')
})

router.get('/kitchen-sink', function (req, res) {
  res.render('kitchen-sink.njk')
})

router.get('/search-v1', function (req, res) {
  res.render('pages/search-v1.njk')
})

//update
router.get('/choice-handler', function (req, res) {
  res.render('address-search')
})

router.get('/update/account', function (req, res) {
  res.render('account', {
    updated : dataState.wasUpdated,
    cherished : dataState.cherished,
    editDate : content.editDate,
    previous_addresses : dataState.previousAddresses,
    correspondence : dataState.correspondenceAdded,
    incorrectaddress : dataState.incorrectAddress
  })
})

router.get('/update/update', function (req, res) {
  res.render('update/update', {
    correspondence : dataState.correspondenceAdded,
    pagetitle : content.pageTitle
  })
})
router.get('/update/update-v2', function (req, res) {
  res.render('update/update-v2', {
    correspondence : dataState.correspondenceAdded,
    pagetitle : content.pageTitle
  })
})

router.get('/update/dates', function (req, res) {
  res.render('update/dates', {
    updatetype : dataState.updateType,
    pagetitle : content.pageTitle
  })
})

router.get('/update/check', function (req, res) {
  res.render('update/check', {
    correctiontype :dataState.correctionType,
    incorrectaddress : dataState.incorrectAddress,
    updatetype : dataState.updateType,
    correcting : dataState.correcting,
    pagetitle : content.pageTitle
  })
})

router.get('/update/cherish-line', function (req, res) {
  res.render('update/cherish-line', {
    updatetype : dataState.updateType,
    pagetitle : content.pageTitle
  })
})

router.get('/update/address-search', function (req, res) {
  res.render('update/address-search', {
    updatetype : dataState.updateType,
    pagetitle : content.pageTitle
  })
})

router.get('/update/search-results', function (req, res) {
  res.render('update/search-results', {
    updatetype : dataState.updateType,
    pagetitle : content.pageTitle,
    incorrectaddress : dataState.incorrectAddress
  })
})

router.get(/update-type-handler/, function (req, res) {
  console.log("data " + req.query.data);  
  if(req.query.data === 'update_status') {
    dataState.updateType = "updateStatus";
    content.setPageTitle();
    res.render('update/status');
  } else if (req.query.data === 'update_cherished') {
    dataState.updateType = "updateCherished";
    dataState.cherished = true;
    content.setPageTitle();
    res.redirect('cherish-line');
  } else if (req.query.data == 'add_correspondence') {
    dataState.updateType = "correspondence";
    content.setPageTitle();
    res.redirect('address-search');
  } else if (req.query.data === 'update_status_dlo') {
    dataState.updateType = "updateStatusDLO";
    content.setPageTitle();
    res.redirect('dates');
  } else {
    dataState.updateType = "updateNew";
    content.setPageTitle();
    res.redirect('address-search')
  }
})

router.get(/correction-type-handler/, function (req, res) {
  console.log(req.query);
  var next = "update/dates";
  if(req.query.data === 'new') {
  dataState.correctionType = "toNew";
    next = "update/address-search"
  } else if(req.query.data === 'status') {
   dataState.correctionType = "status";
    next = "update/status"
  } else if(req.query.data === 'date') {
   dataState.correctionType = "date";
  } else if(req.query.data === 'cherish') {
    next = "update/cherish"
   dataState.correctionType = "cherish";
  } else if (req.query.data == "correct"){
    res.render('update/correct')
    res.redirect('address-search')
  } 
  console.log(dataState.correctionType);
  res.render(next);
})

router.get('/update/correct-handler', function (req, res) {
  res.render('update/correct')
})

router.get('/update/search-results-handler', function (req, res) {
  if (!dataState.correcting) {
    res.render('update/dates')
  } else {
    res.redirect('check')
  }
})

router.get(/check-answers-handler/, function (req, res) {
  if(dataState.updateType === "correspondence") {
    dataState.correspondenceAdded = true;
  }
  if (dataState.updateType === "address") {
    dataState.previousAddresses = true;    
    dataState.wasUpdated = true;
  }
//  if (updateType === "dlo") {
//    dataState.wasUpdated = true;
//  }
  res.redirect('account')
})


//*********
//Version 1
//*********

router.get(/check-handler-v1/, function (req, res) {
  if(dataState.updateType === "add") {
    correspondence = true;
  }
  if (dataState.updateType === "address") {
    previousAddresses = true;    
    isUpdated = true;
  }
  res.redirect('account')
})

router.get('/update/v1/account', function (req, res) {
  res.render('update/v1/account', {
    updated : dataState.wasUpdated,
    editDate : content.editDate,
    previous_addresses : dataState.previousAddresses,
    correspondence : dataState.correspondenceAdded
  })
})

router.get('/update/v1/update', function (req, res) {
  res.render('update/v1/update', {
    correspondence : dataState.correspondenceAdded,
    pagetitle : content.pageTitle
  })
})

router.get('/update/v1/dates', function (req, res) {
  res.render('update/v1/dates', {
    updatetype :  dataState.updateType
  })
})

router.get('/update/v1/check', function (req, res) {
  res.render('update/v1/check', {
    updatetype : dataState.updateType,
    pagetitle : content.pageTitle
  })
})

router.get('/update/v1/search-results', function (req, res) {
  res.render('update/v1/search-results', {
    updatetype : dataState.updateType,
    incorrectaddress : dataState.incorrectAddress
  })
})

router.get(/update-handler-v1/, function (req, res) {
  if(req.query.data === 'status') {
    dataState.updateType = "status";
    console.log(dataState.updateType);
    res.render('update/v1/status')
  } else if (req.query.data === 'cherish') {
    dataState.updateType = "cherish";
    console.log(dataState.updateType);
    res.render('update/v1/cherish-line')
  } else if (req.query.data === 'dlo') {
    dataState.updateType = "dlo";
    console.log(dataState.updateType);
    res.render('update/v1/dates')
  } else if (req.query.data === 'dlo') {
    dataState.updateType = "dlo";
    console.log(dataState.updateType);
    res.render('update/dates')
    res.render('update/v1/dates')
  } else {
    dataState.updateType = "address";
    console.log(dataState.updateType);
    res.redirect('address-search')
  }
  
})

router.get(/change-handler-v1/, function (req, res) {
  if (req.query.tochange == "add") {
    dataState.updateType = "new";
    res.render('update/address-search')
  } else if (req.query.tochange == "correct"){
    res.redirect('correct')
  } else {
    res.redirect('update')
  }
})

module.exports = router