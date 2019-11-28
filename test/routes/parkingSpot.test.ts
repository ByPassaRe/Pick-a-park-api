import request from 'supertest';

import { app } from './../../src/index';
import { routeName } from './../../src/routes/parkingSpot';

const resourcePath = routeName + '/';

describe('Parking spot route /', () => {
    it('should return not implemented on GET', async done => {
        const response = await request(app).get(resourcePath);
        expect(response.status).toBe(501);
        done();
    });

    it('should return not implemented on POST', async done => {
        const response = await request(app).post(resourcePath);
        expect(response.status).toBe(501);
        done();
    });
});
