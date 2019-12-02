import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { boolean } from 'boolean';

import { ParkingSpot } from '../entity/ParkingSpot';

export default class ParkingSpotController {
    public path = '/parkingSpots';

    getParkingSpots = async (req: Request, res: Response): Promise<Response> => {
        let query = {};

        if (req.query.presence) {
            query = { where: { status: boolean(req.query.presence) } };
        }

        const parkingSpots = await getRepository(ParkingSpot).find(query);
        return res.send(parkingSpots);
    };

    getParkingSpotById = async (req: Request, res: Response): Promise<Response> => {
        const parkingSpot = await getRepository(ParkingSpot).findOne(req.params.id);
        return parkingSpot === undefined ? res.sendStatus(404) : res.send(parkingSpot);
    };

    getParkingSpotPresence = async (req: Request, res: Response): Promise<Response> => {
        const results = await getRepository(ParkingSpot).findOne(req.params.id);

        return results === undefined ? res.sendStatus(404) : res.send({ status: results.status });
    };

    createParkingSpot = async (req: Request, res: Response): Promise<Response> => {
        //Check if the parking spot already exists
        const parkingSpot = await getRepository(ParkingSpot).findOne({
            latitude: req.body.latitude,
            longitude: req.body.longitude,
        });
        if (parkingSpot === undefined) {
            //Save the parking spot
            const newParkingSpot = await getRepository(ParkingSpot).create(req.body);
            const result = await getRepository(ParkingSpot).save(newParkingSpot);
            return res.send(result);
        } else {
            //Already exists a parking spot in this position (lat & lot is already in the parking)
            return res.sendStatus(409);
        }
    };

    updateParkingSpotPresence = async (req: Request, res: Response): Promise<Response> => {
        const parkingSpotToUpdate = await getRepository(ParkingSpot).findOne(req.params.id);
        if (parkingSpotToUpdate === undefined) return res.sendStatus(404);

        parkingSpotToUpdate.status = !parkingSpotToUpdate.status;
        getRepository(ParkingSpot).save(parkingSpotToUpdate);
        return res.send(parkingSpotToUpdate);
    };

    deleteParkingSpot = async (req: Request, res: Response): Promise<Response> => {
        const parkingSpotToDelete = await getRepository(ParkingSpot).findOne(req.params.id);
        if (parkingSpotToDelete === undefined) return res.sendStatus(404);

        getRepository(ParkingSpot).remove(parkingSpotToDelete);
        return res.send(parkingSpotToDelete);
    };
}
