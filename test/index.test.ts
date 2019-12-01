/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { connectDb, createApp, startServer } from './../src/app';

describe('Main index file', () => {
    it('should not run app if database fails to connect', async () => {
        // @ts-ignore
        connectDb = jest.fn(() => false);
        // @ts-ignore
        createApp = jest.fn();

        await startServer();
        expect(createApp).toBeCalledTimes(0);
    });

    it('should run app if database succeded to connect', async () => {
        // @ts-ignore
        connectDb = jest.fn(() => true);
        // @ts-ignore
        createApp = jest.fn();

        await startServer();
        expect(createApp).toBeCalledTimes(1);
    });
});
