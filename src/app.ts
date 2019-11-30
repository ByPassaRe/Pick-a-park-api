import express from 'express';
import { router as parkingSpotRouter, routeName as parkingSpotRouteName } from './routes/parkingSpot';
import bodyParser from 'body-parser';

export const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(parkingSpotRouteName, parkingSpotRouter);

app.get('/', (request, response) => {
    response.send('Hello world!');
});
