'use strict';

// import express and initialise router
const express = require('express');
const router = express.Router();

// import controllers
const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const aircraft = require('./controllers/aircraft.js');
const accounts = require ('./controllers/accounts.js');

// connect routes to controllers

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/aircraft/:id', aircraft.index);

router.get('/aircraft/:id/deleteAircraft/:aircraftid', aircraft.deleteAircraft);
router.post('/aircraft/:id/addAircraft', aircraft.addAircraft);

router.get('/dashboard/deleteAircraftList/:id', dashboard.deleteAircraftList);
router.post('/dashboard/addAircraftList', dashboard.addAircraftList);

router.post('/aircraft/:id/updateAircraft/:aircraftid', aircraft.updateAircraft);

/*router.post('/aircraft/:id/updateaircraft/:aircraftid', aircraft.updateaircraft);
*/

// export router module
module.exports = router;

