'use strict';

// import all required modules
const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const aircraftStore = require('../models/aircraft-store.js');



// create start object
const start = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    
    const loggedInUser = accounts.getCurrentUser(request);
    // display confirmation message in log
    logger.info('start rendering');
    
    if(loggedInUser){
    // create view data object (contains data to be sent to the view e.g. page title)
      
    // app statistics calculations

    const aircrafts = aircraftStore.getAllAircraftLists();
    
    let numAircraftsList = aircrafts.length;
    
    let numAir = 0;
    
    for (let item of aircrafts) {
      numAir += item.aircraft.length;
    }
    
    let average = numAir/numAircraftsList
    
    //Finds Aircraft list with the most aircraft
    let currentLargest = 0;
    let largestAircraftTitle = "";
    
    for (let item of aircrafts) {
      
      if(item.aircraft.length > currentLargest){
        currentLargest = item.aircraft.length;
        largestAircraftTitle = item.title
      }
      
    }
    
    //Finds Aircraft list with the least amount of aircraft
    let currentSmallest = aircrafts[0].aircraft.length;
    let smallestAircraftTitle = aircrafts[0].title;
    
    for (let item of aircrafts) {
      
      if(item.aircraft.length < currentSmallest){
        currentSmallest = item.aircraft.length;
        smallestAircraftTitle = item.title;
      }
    }
      
      const viewData = {
        title: 'Welcome to the Aircraft App!',
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        totalAircraftLists: numAircraftsList,
        totalAircraft: numAir,
        average: average,
        largestAircraftTitle: largestAircraftTitle,
        currentLargest: currentLargest,
        smallestAircraftTitle: smallestAircraftTitle,
        currentSmallest: currentSmallest,
      };
    
      // render the start view and pass through the data
      response.render('start', viewData);
    }
    else response.redirect('/');
},

}
    

// export the start module
module.exports = start;