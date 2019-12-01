import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';

import { router as parkingSpotRouter, routeName as parkingSpotRouteName } from './routes/parkingSpot';

const startServer = async (): Promise<void> => {
    try {
        await createConnection();
    } catch (error) {
        console.log(error);
    } finally {
        const app = express();

        app.use(bodyParser.json());
        app.use(parkingSpotRouteName, parkingSpotRouter);

        app.listen(3000);
    }
};

startServer();
