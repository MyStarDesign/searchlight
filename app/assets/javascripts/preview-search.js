// //bereavement support preview

// if (document.getElementById("maincontent") ) {
//   var bsCustomers = {
//   "SX170201" : { title : "",
//                 firstName : "Alex",
//                 lastName : "Campbell",
//                 dob : "14 May 1963",
//                 prevAddress : true,
//                 addressLineOne : "25 Lambton St",
//                 addressLineTwo : "Chester le Street",
//                 postCode : "DH3 3NH",
//                 mobile : "07761 111 111",
//                 home : "0191 111 111",
//                 email : "email@address.com",
//                 ucInt : false,
//                 esaInt : false,
//                 ucAward : true,
//                 esaAward : false
//                 },

//   "SX170202" : { title : "",
//                 firstName : "Sam",
//                 lastName : "Driscoll",
//                 dob : "08 Aug 1956",
//                 prevAddress : false,
//                 addressLineOne : "98 Hammerfield Ave",
//                 addressLineTwo : "Aberdeen",
//                 postCode : "AB10 7FE",
//                 mobile : "07761 111 111",
//                 home : "0191 111 111",
//                 email : "email@address.com",
//                 ucInt : false,
//                 esaInt : false,
//                 ucAward : false,
//                 esaAward : true
//   },	

//   "SX170203" : { title : "",
//                 firstName : "Chris",
//                 lastName : "Ballard",
//                 dob : "10 Dec 1998",
//                 prevAddress : true,
//                 addressLineOne : "3 Rosebery St",
//                 addressLineTwo : "Pudsey",
//                 postCode : "LS28 7JZ",
//                 mobile : "07700 900229",
//                 home : "0113 395 5250",
//                 email : "frankie98@sky.com",
//                 ucInt : false,
//                 esaInt : false,
//                 ucAward : true,
//                 esaAward : false
//   },

//   "SX170204" : { title : "",
//                 firstName : "Lee",
//                 lastName : "Harris",
//                 dob : "15 Jul 1984",
//                 prevAddress : true,
//                 addressLineOne : "81 Wilberforce Rd",
//                 addressLineTwo : "Finsbury Park, London",
//                 postCode : "N4 2SP",
//                 mobile : "07700 900141",
//                 home : "020 7609 8754",
//                 email : "harris@btinternet.com",
//                 ucInt : true,
//                 esaInt : false,
//                 ucAward : false,
//                 esaAward : true
//   },	

//   "SX170205" : { title : "",
//                 firstName : "Robin",
//                 lastName : "Clarke",
//                 dob : "21 Jul 1957",
//                 prevAddress : false,
//                 addressLineOne : "5 Budock Pl",
//                 addressLineTwo : "Falmouth",
//                 postCode : "TR11 3NA",
//                 mobile : "07761 111 111",
//                 home : "0191 111 111",
//                 email : "email@address.com",
//                 ucInt : false,
//                 esaInt : false,
//                 ucAward : false,
//                 esaAward : true
//   },
  
//   "SX170206" : { title : "",
//                 firstName : "Chris",
//                 lastName : "Kingcombe",
//                 dob : "14 Feb 1976",
//                 prevAddress : false,
//                 addressLineOne : "Flat 9, 39 Brewery St",
//                 addressLineTwo : "Pembroke Dock",
//                 postCode : "SA72 6JS",
//                 mobile : "07761 111 111",
//                 home : "0191 111 111",
//                 email : "email@address.com",
//                 ucInt : false,
//                 esaInt : false,
//                 ucAward : true,
//                 esaAward : false

//   },

//   "SX170207" : { title : "Mrs",
//                 firstName : "Mary",
//                 lastName : "Naylor",
//                 dob : "08 Mar 1963",
//                 prevAddress : true,
//                 addressLineOne : "Flat 5, 21 Stanger St",
//                 addressLineTwo : "Keswick",
//                 postCode : "CA12 5JX",
//                 mobile : "07700 900870",
//                 home : "01768 892960",
//                 email : "naylor83@googlemail.com",
//                 ucInt : true,
//                 esaInt : false,
//                 ucAward : false,
//                 esaAward : true
//   },

//   "SX170208" : { title : "Mr",
//                 firstName : "James",
//                 lastName : "Beck",
//                 dob : "13 Nov 1976",
//                 prevAddress : false,
//                 addressLineOne : "Flat 3, 55 Longreins Rd",
//                 addressLineTwo : "Barrow-in-Furness",
//                 postCode : "LA14 5AL",
//                 mobile : "07761 111 111",
//                 home : "0191 111 111",
//                 email : "email@address.com",
//                 ucInt : true,
//                 esaInt : false,
//                 ucAward : false,
//                 esaAward : true
//   },	


//   "SX170209" : { title : "Mrs",
//                 firstName : "Patricia",
//                 lastName : "Benedetti",
//                 dob : "08 Aug 1960",
//                 prevAddress : true,
//                 addressLineOne : "10 Dale Way",
//                 addressLineTwo : "Leyburn",
//                 postCode : "DL8 5LE",
//                 mobile : "07700 900229",
//                 home : "01969 623565",
//                 email : "pat-pat@netscape.com",
//                 ucInt : false,
//                 esaInt : false,
//                 ucAward : true,
//                 esaAward : true
//   },


//   "SX170210" : { title : "Mr",
//                 firstName : "Robert",
//                 lastName : "Chapman",
//                 dob : "16 Jul 1973",
//                 prevAddress : false,
//                 addressLineOne : "13 Constance Ave",
//                 addressLineTwo : "West Bromwich",
//                 postCode : "B70 6ED",
//                 mobile : "07761 111 111",
//                 home : "0191 111 111",
//                 email : "email@address.com",
//                 ucInt : false,
//                 esaInt : false,
//                 ucAward : true,
//                 esaAward : false

//   },
    
//   "SX170211" : { title : "Mr",
//                 firstName : "Michael",
//                 lastName : "Woodgate",
//                 dob : "08 Jul 1967",
//                 prevAddress : false,
//                 addressLineOne : "47 Bamford Rd",
//                 addressLineTwo : "Wolverhampton",
//                 postCode : "WV3 0AT",
//                 mobile : "07761 111 111",
//                 home : "0191 111 111",
//                 email : "email@address.com",
//                 ucInt : false,
//                 esaInt : false,
//                 ucAward : false,
//                 esaAward : false
//   },		

//   "SX170212" : { title : "Mr",
//                 firstName : "William",
//                 lastName : "Henderson",
//                 dob : "08 Nov 1970",
//                 prevAddress : true,
//                 addressLineOne : "Flat 7, 51 Lappmark Rd",
//                 addressLineTwo : "Canvey Island",
//                 postCode : "SS8 7SZ",
//                 mobile : "07700 900618",
//                 home : "0207 562 1234",
//                 email : "henders@virgin.com",
//                 ucInt : false,
//                 esaInt : false,
//                 ucAward : true,
//                 esaAward : true
//   },

//   "SX170213" : { title : "Miss",
//                 firstName : "Linda",
//                 lastName : "Fitzgerald",
//                 dob : "13 Apr 1987",
//                 prevAddress : false,
//                 addressLineOne : "3 Comelypark St",
//                 addressLineTwo : "Glasgow",
//                 postCode : "G31 1TA",
//                 mobile : "07761 111 111",
//                 home : "0191 111 111",
//                 email : "email@address.com",
//                 ucInt : true,
//                 esaInt : false,
//                 ucAward : false,
//                 esaAward : false
//   },			

//   "SX170214" : { title : "Mrs",
//                 firstName : "Elizabeth",
//                 lastName : "Earnshaw",
//                 dob : "18 May 1976",
//                 prevAddress : true,
//                 addressLineOne : "41 Lochiel Rd",
//                 addressLineTwo : "Inverlochy, Fort William",
//                 postCode : "PH33 6NS",
//                 mobile : "07700 900141",
//                 home : "01397 708881",
//                 email : "dizzy-liz@blueyonder.com",
//                 ucInt : false,
//                 esaInt : false,
//                 ucAward : false,
//                 esaAward : true
//   },	

//   "SX170215" : { title : "Mr",
//                 firstName : "Raymond",
//                 lastName : "Cromarty",
//                 dob : "04 Jun 1997",
//                 prevAddress : true,
//                 addressLineOne : "17 King Harald Kloss",
//                 addressLineTwo : "Kirkwall, Orkney",
//                 postCode : "KW15 1FT",
//                 mobile : "07761 111 111",
//                 home : "0191 111 111",
//                 email : "email@address.com",
//                 ucInt : false,
//                 esaInt : false,
//                 ucAward : true,
//                 esaAward : true
//   },

//   "SX170216" : { title : "Miss",
//                 firstName : "Donna",
//                 lastName : "Rustage",
//                 dob : "04 Jun 1993",
//                 prevAddress : false,
//                 addressLineOne : "83 Normanby Rd",
//                 addressLineTwo : "South Bank, Middlesbrough",
//                 postCode : "TS6 6SA",
//                 mobile : "07761 111 111",
//                 home : "0191 111 111",
//                 email : "email@address.com",
//                 ucInt : false,
//                 esaInt : false,
//                 ucAward : true,
//                 esaAward : false
//   },

//   "SX170217" : { title : "",
//                 firstName : "Alex",
//                 lastName : "Driscoll",
//                 dob : "26 Feb 1984",
//                 prevAddress : false,
//                 addressLineOne : "18 Robinson Ave",
//                 addressLineTwo : "Carlisle",
//                 postCode : "CA2 4EU",
//                 mobile : "07761 111 111",
//                 home : "0191 111 111",
//                 email : "email@address.com",
//                 ucInt : false,
//                 esaInt : false,
//                 ucAward : false,
//                 esaAward : true
//   },

//   "SX170218" : { title : "",
//                 firstName : "Jamie",
//                 lastName : "Brasher",
//                 dob : "18 Oct 1971",
//                 prevAddress : false,
//                 addressLineOne : "38 High St",
//                 addressLineTwo : "Llanberis, Caernarfon",
//                 postCode : "LL55 4EU",
//                 mobile : "07761 111 111",
//                 home : "0191 111 111",
//                 email : "email@address.com",
//                 ucInt : true,
//                 esaInt : false,
//                 ucAward : false,
//                 esaAward : true
//   },

//   "SX170219" : { title : "Mr",
//                 firstName : "Noah",
//                 lastName : "Comiskey",
//                 dob : "13 Sep 1962",
//                 prevAddress : true,
//                 addressLineOne : "3 Anderson Dr",
//                 addressLineTwo : "Castle Douglas",
//                 postCode : "DG7 1UQ",
//                 mobile : "07700 900229",
//                 home : "01576 202910",
//                 email : "noah1962@1and1.com",
//                 ucInt : false,
//                 esaInt : false,
//                 ucAward : true,
//                 esaAward : false
//   },

//   "SX170220" : { title : "Mr",
//                 firstName : "Reece",
//                 lastName : "Housden",
//                 dob : "28 Jan 1974",
//                 prevAddress : false,
//                 addressLineOne : "40 Gertrude Rd",
//                 addressLineTwo : "Liverpool",
//                 postCode : "L4 0SU",
//                 mobile : "07761 111 111",
//                 home : "0191 111 111",
//                 email : "email@address.com",
//                 ucInt : false,
//                 esaInt : false,
//                 ucAward : false,
//                 esaAward : true
//   },

//   "SX170221" : { title : "Ms",
//                 firstName : "Sharmila",
//                 lastName : "Kulkarni",
//                 dob : "23 Feb 1968",
//                 prevAddress : true,
//                 addressLineOne : "10 Bangor Rd",
//                 addressLineTwo : "Southampton",
//                 postCode : "SO15 3GD",
//                 mobile : "07700 900300",
//                 home : "023 8033 4545",
//                 ucInt : false,
//                 esaInt : false,
//                 ucAward : true,
//                 esaAward : true
//   },

//   "SX170222" : { title : "Miss",
//                 firstName : "Victoria",
//                 lastName : "Tingley",
//                 dob : "13 Nov 1978",
//                 prevAddress : false,
//                 addressLineOne : "19 Alma Park",
//                 addressLineTwo : "Brodick, Isle of Arran",
//       postCode : "KA27 8AT",
//                 mobile : "07761 111 111",
//                 home : "0191 111 111",
//                 email : "email@address.com",
//                 ucInt : false,
//                 esaInt : false,
//                 ucAward : true,
//                 esaAward : false
//   },

//   "SX170223" : { title : "Ms",
//                 firstName : "Evelyn",
//                 lastName : "Kriewaldt",
//                 dob : "01 May 1973",
//                 prevAddress : false,
//                 addressLineOne : "49 Lyndhurst Rd",
//                 addressLineTwo : "Sheffield",
//       postCode : "S11 9BJ",
//                 mobile : "07761 111 111",
//                 home : "0191 111 111",
//                 email : "email@address.com",
//                 ucInt : false,
//                 esaInt : false,
//                 ucAward : false,
//                 esaAward : true
//   },

//   "SX170224" : { title : "Miss",
//                 firstName : "Yufan",
//                 lastName : "Li",
//                 dob : "18 Jun 1969",
//                 prevAddress : false,
//                 addressLineOne : "6 Smedley Ave",
//                 addressLineTwo : "Bolton",
//                 postCode : "BL3 2DP",
//                 mobile : "07700 900300",
//                 home : "023 8033 4545",
//                 ucInt : false,
//                 esaInt : false,
//                 ucAward : true,
//                 esaAward : true
//   },

//   "SX170225" : { title : "Mr",
//                 firstName : "Francesco",
//                 lastName : "Vickery",
//                 dob : "07 Jul 1997",
//                 prevAddress : false,
//                 addressLineOne : "2 Ainsworth Rd",
//                 addressLineTwo : "London",
//                 postCode : "E9 7LP",
//                 mobile : "07700 900300",
//                 home : "023 8033 4545",
//                 ucInt : false,
//                 esaInt : false,
//                 ucAward : true,
//                 esaAward : false
//   }}

//     var bsInput = document.getElementById("maincontent");
//     var preview = document.getElementById("preview");
//     var counter;
//     var inputvalue;
  
//     bsInput.oninput = function(){
//       counter = bsInput.value.length;
//       console.log(counter);
//       if (counter == 8 || counter == 9) {
//         inputvalue = bsInput.value.toUpperCase();
//         console.log(inputvalue);
//         for (person in bsCustomers) {
//           if (inputvalue == person) {
//            console.log("TEST found");
//             document.getElementById("bsfirstname").innerHTML = bsCustomers[person].firstName.toUpperCase();
//             document.getElementById("bslastname").innerHTML = bsCustomers[person].lastName.toUpperCase();
//             document.getElementById("bspostcode").innerHTML = bsCustomers[person].postCode;
//             if(bsCustomers[person].title != "") {
//               document.getElementById("bstitle").innerHTML = bsCustomers[person].title.toUpperCase() + " ";
//             } else {
//               document.getElementById("bstitle").innerHTML = "";
//             }
//             document.getElementById("bsDob").innerHTML = bsCustomers[person].dob;
//           }
//         }
//         preview.classList.add("visible");
//         // managementCheck.classList.add("visible");
//       } else {
//         preview.classList.remove("visible");
//       }
//     };
//   }



if ( document.getElementById("maincontent") ) {

  $.getJSON("../public/javascripts/cis.json", function(json) {
    var bsCustomers = json;

    var bsInput = document.getElementById("maincontent");
    var preview = document.getElementById("preview");
    var counter;
    var inputvalue;

    //find the person
    //set the persons data to the current citizens data
    //show the current citizens dats

    var citizen;  
    function getPerson() {
      for (person in bsCustomers) {
        console.log("person" + bsCustomers[person].nino);
        if (inputvalue == bsCustomers[person].nino) {
         console.log("TEST found");
          document.getElementById("bsfirstname").innerHTML = bsCustomers[person].nameOneFirst;
          document.getElementById("bslastname").innerHTML = bsCustomers[person].nameOneLast;
          document.getElementById("bspostcode").innerHTML = bsCustomers[person].postCode;
          if(bsCustomers[person].title != "") {
            // document.getElementById("bstitle").innerHTML = bsCustomers[person].title.toUpperCase() + " ";
          } else {
            document.getElementById("bstitle").innerHTML = "";
          }
          document.getElementById("bsDob").innerHTML = bsCustomers[person].dob;
        }
      }
    }

    function setData() {

    }

    bsInput.oninput = function(){
      counter = bsInput.value.length;
      if (counter == 8 || counter == 9) {
              inputvalue = bsInput.value.toUpperCase();
              preview.classList.add("visible");
              // managementCheck.classList.add("visible");
            } else {
              preview.classList.remove("visible");
            }
          };



});


}