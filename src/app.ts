import express from 'express';
import bodyParser from 'body-parser';

import { router as parkingSpotRouter, routeName as parkingSpotRouteName } from './routes/parkingSpot';

export const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(parkingSpotRouteName, parkingSpotRouter);

app.get('/', (request, response) => {
    response.send('Hello world!');
});
