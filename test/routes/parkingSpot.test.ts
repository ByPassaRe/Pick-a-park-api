import request from 'supertest';

import { app } from '../../src/app';
import { routeName } from './../../src/routes/parkingSpot';

const resourcePath = routeName + '/';

describe('Parking spot route /', () => {
    it('should return not implemented on GET', async done => {
        const response = await request(app).get(resourcePath);
        expect(response.status).toBe(501);
        done();
    });

    it('should return not implemented on GET on a specific id', async done => {
        const response = await request(app).get(resourcePath + '/1/');
        expect(response.status).toBe(501);
        done();
    });

    it('should return not implemented on POST', async done => {
        const response = await request(app).post(resourcePath);
        expect(response.status).toBe(501);
        done();
    });

    describe("and it's sensors /presence route", () => {
        it('should return not implemented on GET', async done => {
            const response = await request(app).get(resourcePath + 'presence/');
            expect(response.status).toBe(501);
            done();
        });

        it('should return not implemented on GET on a specific /id', async done => {
            const response = await request(app).get(resourcePath + '1/presence');
            expect(response.status).toBe(501);
            done();
        });

        it('should return not implemented on PUT on a specific /id', async done => {
            const response = await request(app).put(resourcePath + '1/presence');
            expect(response.status).toBe(501);
            done();
        });
    });
});
