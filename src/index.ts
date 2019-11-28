import express from 'express';
import { router as parkingSpotRouter, routeName as parkingSpotRouteName } from './routes/parkingSpot';

export const app = express();

app.use(parkingSpotRouteName, parkingSpotRouter);

app.get('/', (request, response) => {
    response.send('Hello world!');
});
