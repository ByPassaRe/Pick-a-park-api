import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';

import { router as parkingSpotRouter, routeName as parkingSpotRouteName } from './routes/parkingSpot';

const waitRetry = (ms: number): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};

const connectDb = async (): Promise<boolean> => {
    const maxRetries = 10;
    let retries = 0;

    while (retries < maxRetries) {
        try {
            await createConnection();
            console.log('Succesfully connected to database');
            return true;
        } catch (error) {
            console.log('Waiting for database.....');

            await waitRetry(5000);
            retries++;
        }
    }

    return false;
};

const startServer = async (): Promise<void> => {
    const port = process.env.PORT;

    if (await connectDb()) {
        const app = express();

        app.use(bodyParser.json());
        app.use(parkingSpotRouteName, parkingSpotRouter);

        app.listen(port);

        console.log('App listening on port ' + port);
    } else {
        console.log("Couldn't connect to database");
    }
};

startServer();
