import express from 'express';
import { getRepository } from 'typeorm';
import { ParkingSpot } from '../entity/ParkingSpot';

import ParkingSpotController from './../controller/ParkingSpotController';

export const router = express.Router();

const controller = new ParkingSpotController();

export const routeName = controller.path;

router.get('/', controller.getAllParkingSpots);

router.get('/presence', async (req, res) => {
    const parkingSpotsAvailable = await getRepository(ParkingSpot).find({
        where: { status: true },
    });
    return res.send(parkingSpotsAvailable);
});

router.get('/:id', async (req, res) => {
    const results = await getRepository(ParkingSpot).findOne(req.params.id);
    if (results === undefined) return res.sendStatus(404);
    else return res.send(results);
});

router.post('/', async (req, res) => {
    //Check if the parking spot already exists
    const alreadyExistsParkingSpot = await getRepository(ParkingSpot).findOne({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
    });
    if (alreadyExistsParkingSpot === undefined) {
        //Save the parking spot
        const parkingSpot = await getRepository(ParkingSpot).create(req.body);
        const results = await getRepository(ParkingSpot).save(parkingSpot);
        return res.send(results);
    } else {
        //Already exists a parking spot in this position (lat & lot is already in the parking)
        return res.sendStatus(409);
    }
});

router.get('/:id/presence', async (req, res) => {
    const results = await getRepository(ParkingSpot).findOne(req.params.id);
    if (results === undefined) return res.sendStatus(404);
    else if (results.status) return res.send({ status: true });
    else return res.send({ status: false });
});

router.put('/:id/presence', async (req, res) => {
    const parkingSpotToUpdate = await getRepository(ParkingSpot).findOne(req.params.id);
    if (parkingSpotToUpdate === undefined) return res.sendStatus(404);
    else {
        parkingSpotToUpdate.status = !parkingSpotToUpdate.status;
        getRepository(ParkingSpot).save(parkingSpotToUpdate);
        res.send(parkingSpotToUpdate);
    }
});
