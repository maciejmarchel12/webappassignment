'use strict';

// import all required modules
const logger = require('../utils/logger');
const uuid = require('uuid');

const aircraftStore = require('../models/aircraft-store.js');
const accounts = require ('./accounts.js');

// create dashboard object
const dashboard = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    
    // display confirmation message in log
    logger.info('dashboard rendering');
    
    //For logged in users
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
        // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'Aircraft App Dashboard',
      aircraftList: aircraftStore.getUserAircraftList(loggedInUser.id),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      Image: loggedInUser.Image
    };
    // render the dashboard view and pass through the data
    logger.info('about to render', viewData.aircraftList);
    response.render('dashboard', viewData);
    }
    else response.redirect('/');
  },
    
  deleteAircraftList(request, response) {
    const aircraftListId = request.params.id;
    logger.debug(`Deleting AircraftList ${aircraftListId}`);
    aircraftStore.removeAircraftList(aircraftListId);
    response.redirect('/dashboard');
  },
  
  addAircraftList(request, response) {
    const date = new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newAircraftList = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      Image: request.files.Image,
      date: date, 
      aircraft: []
    };
    logger.debug('Creating a new aircraft listing' + newAircraftList);
    aircraftStore.addAircraftList(newAircraftList, function() {
      response.redirect("/dashboard");
    });
  },
};

// export the dashboard module
module.exports = dashboard;