'use strict';

const logger = require('../utils/logger');
const uuid = require('uuid');
const aircraftStore = require('../models/aircraft-store');
const accounts = require ('./accounts.js');


const aircraftList = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    const aircraftListId = request.params.id;
    logger.debug('AircraftList id = ' + aircraftListId);
    if (loggedInUser) {
    const viewData = {
      title: 'AircraftList',
      aircraftList: aircraftStore.getAircraftList(aircraftListId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    response.render('aircraft', viewData);
    }
    else response.redirect('/')
  },

    deleteAircraft(request, response) {
    const aircraftListId = request.params.id;
    const aircraftId = request.params.aircraftid;
    logger.debug(`Deleting Aircraft ${aircraftId} from AircraftList ${aircraftListId}`);
    aircraftStore.removeAircraft(aircraftListId, aircraftId);
    response.redirect('/aircraft/' + aircraftListId);
  },
    addAircraft(request, response) {
    const aircraftListId = request.params.id;
    const aircraftList = aircraftStore.getAircraftList(aircraftListId);
    const newAircraft = {
      id: uuid(),
      title: request.body.title,
      brand: request.body.brand,
      type: request.body.type,
      price$: request.body.price$
    };
    aircraftStore.addAircraft(aircraftListId, newAircraft);
    response.redirect('/aircraft/' + aircraftListId);
  },
    updateAircraft(request, response) {
    const aircraftListId = request.params.id;
    const aircraftId = request.params.aircraftid;
    logger.debug("updating aircraft " + aircraftId);
    const updatedAircraft = {
      title: request.body.title,
      brand: request.body.brand,
      type: request.body.type,
      price$: request.body.price$
    };
    aircraftStore.editAircraft(aircraftListId, aircraftId, updatedAircraft);
    response.redirect('/aircraft/' + aircraftListId);
  },
};

module.exports = aircraftList;