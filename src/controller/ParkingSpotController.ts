import { Request, Response } from 'express';

import { getRepository } from 'typeorm';
import { ParkingSpot } from '../entity/ParkingSpot';

export default class ParkingSpotController {
    public path = '/parkingSpot';

    getAllParkingSpots = async (req: Request, res: Response): Promise<Response> =>
        res.send(await getRepository(ParkingSpot).find());
}
