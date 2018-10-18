/////////////////////
// value functions //
/////////////////////

function setPV(pv, chosenValue) {
  pv.partner = false;
  pv.value = false;
  pv.member = false;
  for (var x in chosenValue) {
    if (chosenValue[x] == 'The person\'s partner') {
      pv.partner = true;
    } else if (chosenValue[x] == 'Someone else in the household') {
      pv.member = true;
    } else if (chosenValue[x] == 'The person') {
      pv.value = true;
    }
  }
  return pv;
};

function setNeeds(needsObject, chosenValue) {
  needsObject.value = chosenValue;
  return needsObject;
};

function flipValue(value) {
    value = (value != true ? true : false); 
  return value;
};

function setValue(chosenDetail, detailObject, chosenValue, tempValue, updateType) {
  if(chosenValue == "null") {
    chosenValue = null;
  }
  if(tempValue == "null") {
    tempValue = null;
  }
  if (chosenDetail == 'sex' || chosenDetail == 'disability') {
    detailObject.value = flipValue(detailObject.value);
   return detailObject;
  } else if (chosenDetail == 'pv') {
    return setPV(detailObject, chosenValue);
  } else if (chosenDetail == 'specialNeeds') {
    if (updateType == 3) {
      return correctSpecialNeeds(detailObject, chosenValue, tempValue);
    } else {
      return setNeeds(detailObject, chosenValue);
    }
  } else {
    detailObject.value = chosenValue;
    return detailObject;
  }
};

function correctSpecialNeeds (detailObject, chosenValue, tempValue) {
  if (typeof detailObject.value == 'string') {
    detailObject.value = tempValue;
  } else {
//    tempValue = JSON.stringify(tempValue);
    if(tempValue != 'null' && tempValue != null){
      detailObject.value.push(tempValue);
    }
    for (var item in detailObject.value) {
      if (detailObject.value[item] == chosenValue) {
        remove(detailObject.value,item);
      }
    }
  }
  return detailObject;
};

function remove(arr, index){
  arr.splice(index,1);
  return arr;
};

///////////////////////
// display functions //
///////////////////////


function setDisplay(chosenDetail, detailObject) {
  if (chosenDetail == 'pv') {
    if (detailObject.value != true && detailObject.memeber != true && detailObject.partner != true) {
      detailObject.show = false;
    } else {
      detailObject.show = true;
    }
  } else {
    detailObject.show = false;
    if(detailObject.value != null && detailObject.value != false) {
      detailObject.show = true;
    }  
  }
  return detailObject;
};


module.exports.setNeeds = setNeeds;
module.exports.correctSpecialNeeds = correctSpecialNeeds;
module.exports.flipValue = flipValue;
module.exports.setDisplay = setDisplay;
module.exports.setPV = setPV;
module.exports.setValue = setValue;