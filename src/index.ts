import express from 'express';

export const app = express();

app.get('/', (request, response) => {
    response.send('Hello world!');
});
