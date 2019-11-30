import { Request, Response } from 'express';

import { getRepository } from 'typeorm';
import { ParkingSpot } from '../entity/ParkingSpot';

export default class ParkingSpotController {
    public path = '/parkingSpot';

    getAllParkingSpots = async (req: Request, res: Response): Promise<Response> =>
        res.send(await getRepository(ParkingSpot).find());

    getParkingSpot = async (req: Request, res: Response): Promise<Response> => {
        const results = await getRepository(ParkingSpot).findOne(req.params.id);
        if (results === undefined) return res.sendStatus(404);
        else return res.send(results);
    };

    getAllParkingSpotsPresence = async (req: Request, res: Response): Promise<Response> => {
        const parkingSpotsAvailable = await getRepository(ParkingSpot).find({
            where: { status: true },
        });
        return res.send(parkingSpotsAvailable);
    };

    getParkingSpotPresence = async (req: Request, res: Response): Promise<Response | undefined> => {
        const parkingSpotToUpdate = await getRepository(ParkingSpot).findOne(req.params.id);
        if (parkingSpotToUpdate === undefined) return res.sendStatus(404);
        else {
            parkingSpotToUpdate.status = !parkingSpotToUpdate.status;
            getRepository(ParkingSpot).save(parkingSpotToUpdate);
            res.send(parkingSpotToUpdate);
        }
    };
}
