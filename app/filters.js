module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {}

  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.
    

  ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  
  filters.lastTelephoneCheck = function(contact_types) {
    var counter = 0;
    var returnItem;
    for (var y in contact_types) {
      if (contact_types[y].type === "phone") {
        if (contact_types[y].show === false) {
          counter++;
          returnItem = y;
        }
      }
    }
    return (counter === 1 ? returnItem : 'none')
  }
  
  //should be able to pass type "all" into this function and replace the one below ±
  //have all telephone numbers been added?
  filters.allPhonesAdded = function(contact_types) {
    var counter = 0;
    for (var y in contact_types) {
      if (contact_types[y].type === "phone") {
        if (contact_types[y].state == null) {
          counter++;
        }
      }
    }
    return (counter != 0 ? false : true)
  }
  
  //have ANY contact details been added?
  filters.checkForContacts = function(items) {
    var y = false;
    for (var item in items ) {
      if (items[item].show == true) {
        y = true
      }
    }
    return y;
  }

  //have ALL contact details been added?
  filters.allContactsAdded = function(items) {
    var counter;
    for (var item in items ) {
      if (items[item].state == null || items[item].state == "removed")  {
        counter++
      }
    } if (counter == 0 || counter === items.length ) {
      return true;
    } else {
      return false;
    }
  }

  //show the correct noun
  filters.contactIs = function(contact) {
    if (contact == "phone" || contact == "other-phone"  || contact == "fax" ) {
      return "number";
    } else if (contact == "email") {
      return "address";
    } else {
      return "";
    }
  }

  //check for item
  filters.checkForItem = function(list, thing) {
    var toReturn = false
    for (var item in list) {
      if (item == thing) {
        toReturn = true;
        break;
      }
      return toReturn;
    }
  }

  return filters
}


// if no contacts set to show - show no contacts
// if any contact set to not show - hide the link