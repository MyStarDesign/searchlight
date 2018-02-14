//dates.js
var today = new Date();
var dayOfTheWeek = today.getDay();
var dayOfTheMonth = today.getDate();
var thisMonth = today.getMonth();
var year = today.getFullYear();

var weekdays = new Array(7);
weekdays[0] = "Sunday";
weekdays[1] = "Monday";
weekdays[2] = "Tuesday";
weekdays[3] = "Wednesday";
weekdays[4] = "Thursday";
weekdays[5] = "Friday";
weekdays[6] = "Saturday";
var dayAsString = weekdays[dayOfTheWeek];

var months = new Array(12);
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";

var monthAsString = months[thisMonth];

var dates = {
  todayAsString : function() {
    return dayOfTheMonth + " " + monthAsString + " " + year;
  },
  todayAsFigure : function(separator) {
    if (separator != null) {
      return dayOfTheMonth + separator + (thisMonth+1) + separator + year;
    } else {
      return dayOfTheMonth + " " + (thisMonth+1) + " " + year;
    }
  },
  logToday : function() {
    console.log( this.todayAsString() );
    console.log( this.todayAsFigure() );
  }
};

module.exports.dates = dates; 