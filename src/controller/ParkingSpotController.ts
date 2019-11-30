import { Request, Response } from 'express';

import { getRepository } from 'typeorm';
import { ParkingSpot } from '../entity/ParkingSpot';

export default class ParkingSpotController {
    public path = '/parkingSpot';

    getAllParkingSpots = async (req: Request, res: Response): Promise<Response> =>
        res.send(await getRepository(ParkingSpot).find());

    getParkingSpot = async (req: Request, res: Response): Promise<Response> => {
        const parkingSpot = await getRepository(ParkingSpot).findOne(req.params.id);
        return parkingSpot === undefined ? res.sendStatus(404) : res.send(parkingSpot);
    };

    getAllParkingSpotsPresence = async (req: Request, res: Response): Promise<Response> => {
        const parkingSpotsAvailable = await getRepository(ParkingSpot).find({
            where: { status: true },
        });
        return res.send(parkingSpotsAvailable);
    };

    getParkingSpotPresence = async (req: Request, res: Response): Promise<Response> => {
        const results = await getRepository(ParkingSpot).findOne(req.params.id);

        return results === undefined ? res.sendStatus(404) : res.send({ status: results.status });
    };

    createParkingSpot = async (req: Request, res: Response): Promise<Response> => {
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
    };

    putParkingSpotPresence = async (req: Request, res: Response): Promise<Response | undefined> => {
        const parkingSpotToUpdate = await getRepository(ParkingSpot).findOne(req.params.id);
        if (parkingSpotToUpdate === undefined) return res.sendStatus(404);
        else {
            parkingSpotToUpdate.status = !parkingSpotToUpdate.status;
            getRepository(ParkingSpot).save(parkingSpotToUpdate);
            res.send(parkingSpotToUpdate);
        }
    };
}
