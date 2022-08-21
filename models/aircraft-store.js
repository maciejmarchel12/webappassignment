'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const cloudinary = require('cloudinary');
const logger = require('../utils/logger');

try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const aircraftStore = {

  store: new JsonStore('./models/aircraft-store.json', { aircraftCollection: [] }),
  collection: 'aircraftCollection',

  getAllAircraftLists() {
    return this.store.findAll(this.collection);
  },

  getAircraftList(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  getUserAircraftList(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

  addAircraftList(aircraftList, response) {
    aircraftList.Image.mv('tempimage', err => {
      if (!err) {
        cloudinary.uploader.upload('tempimage', result => {
          console.log(result);
          aircraftList.Image = result.url;
          response();
        })
      }
    })
    this.store.add(this.collection, aircraftList);
  },

  removeAircraftList(id) {
    const aircraftList = this.getAircraftList(id);
    this.store.remove(this.collection, aircraftList);
  },

  removeAllAircraftList() {
    this.store.removeAll(this.collection);
  },

  addAircraft(id, aircraft) {
    const aircraftList = this.getAircraftList(id);
    aircraftList.aircraft.push(aircraft);
  },

  removeAircraft(id, aircraftId) {
    const aircraftList = this.getAircraftList(id);
    const aircraft = aircraftList.aircraft;
    _.remove(aircraft, { id: aircraftId});
  },
  editAircraft(id, aircraftId, updatedAircraft) {
    const aircraftList = this.getAircraftList(id);
    const aircrafts = aircraftList.aircraft;
    const index = aircrafts.findIndex(aircraft => aircraft.id === aircraftId);
    aircrafts[index].title = updatedAircraft.title;
    aircrafts[index].brand = updatedAircraft.brand;
    aircrafts[index].type = updatedAircraft.type;
    aircrafts[index].price$ = updatedAircraft.price$;
  }
};

module.exports = aircraftStore;