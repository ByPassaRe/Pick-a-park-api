import express from 'express';
import { createConnection, getRepository } from 'typeorm';
import { ParkingSpot } from '../entity/ParkingSpot';

export const router = express.Router();
export const routeName = '/parkingSpot';

// create typeorm connection
createConnection()
    .then(async () => {
        const parkingSpotRepository = getRepository(ParkingSpot);

        router.get('/', async (req, res) => {
            return res.send(await parkingSpotRepository.find());
        });

        router.get('/presence', async (req, res) => {
            const parkingSpotsAvailable = await parkingSpotRepository.find({
                where: { status: true },
            });
            return res.send(parkingSpotsAvailable);
        });

        router.get('/:id', async (req, res) => {
            const results = await parkingSpotRepository.findOne(req.params.id);
            if (results === undefined) return res.sendStatus(404);
            else return res.send(results);
        });

        router.post('/', async (req, res) => {
            //Check if the parking spot already exists
            const alreadyExistsParkingSpot = await parkingSpotRepository.findOne({
                latitude: req.body.latitude,
                longitude: req.body.longitude,
            });
            if (alreadyExistsParkingSpot === undefined) {
                //Save the parking spot
                const parkingSpot = await parkingSpotRepository.create(req.body);
                const results = await parkingSpotRepository.save(parkingSpot);
                return res.send(results);
            } else {
                //Already exists a parking spot in this position (lat & lot is already in the parking)
                return res.sendStatus(409);
            }
        });

        router.get('/:id/presence', async (req, res) => {
            const results = await parkingSpotRepository.findOne(req.params.id);
            if (results === undefined) return res.sendStatus(404);
            else if (results.status) return res.send({ status: true });
            else return res.send({ status: false });
        });

        router.put('/:id/presence', async (req, res) => {
            const parkingSpotToUpdate = await parkingSpotRepository.findOne(req.params.id);
            if (parkingSpotToUpdate === undefined) return res.sendStatus(404);
            else {
                parkingSpotToUpdate.status = !parkingSpotToUpdate.status;
                parkingSpotRepository.save(parkingSpotToUpdate);
                res.send(parkingSpotToUpdate);
            }
        });
    })
    .catch(error => console.log(error));
