import express from 'express';

import ParkingSpotController from './../controller/ParkingSpotController';

export const router = express.Router();

const controller = new ParkingSpotController();
export const routeName = controller.path;

router.get('/', controller.getAllParkingSpots);
router.get('/presence', controller.getAllParkingSpotsPresence);
router.get('/:id', controller.getParkingSpot);
router.post('/', controller.createParkingSpot);
router.get('/:id/presence', controller.getParkingSpotPresence);
router.put('/:id/presence', controller.putParkingSpotPresence);
