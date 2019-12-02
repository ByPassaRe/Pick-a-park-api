import * as app from './../src/app';
import sinon from 'sinon';
import { expect } from 'chai';

const connectDbStub = sinon.stub(app, 'connectDb');
const createAppStub = sinon.stub(app, 'createApp');

describe('app index file', () => {
    beforeEach(() => {
        sinon.reset();
    });

    it('should not run app if database fails to connect', async () => {
        connectDbStub.callsFake(async () => false);
        await app.startServer();
        expect(createAppStub.callCount).to.equal(0);
    });

    it('should run app if database succeded to connect', async () => {
        connectDbStub.callsFake(async () => true);
        await app.startServer();
        expect(createAppStub.callCount).to.equal(1);
    });
});
