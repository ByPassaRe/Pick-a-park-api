import express from 'express';

export const router = express.Router();
export const routeName = '/parkingSpot';

router.get('/', (req, res) => {
    return res.sendStatus(501);
});

router.get('/:id', (req, res) => {
    return res.sendStatus(501);
});

router.post('/', (req, res) => {
    return res.sendStatus(501);
});

router.get('/presence', (req, res) => {
    return res.sendStatus(501);
});

router.get('/:id/presence', (req, res) => {
    return res.sendStatus(501);
});

router.put('/:id/presence', (req, res) => {
    return res.sendStatus(501);
});
