import request from 'supertest';

import { app } from '../src/app';

describe('Main route /', () => {
    it('should return message hello world', async done => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        done();
    });
});
