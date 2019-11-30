import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';

import { router as parkingSpotRouter, routeName as parkingSpotRouteName } from './routes/parkingSpot';

createConnection()
    .then(() => {
        const app = express();

        app.use(bodyParser.json());
        app.use(parkingSpotRouteName, parkingSpotRouter);

        app.listen(5000);
    })
    .catch(error => console.log(error));
