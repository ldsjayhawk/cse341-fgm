const express = require('express');
const router = express.Router();
const playersRouter = require('./players');

// router.use('/');
router.use('players', playersRouter);

// router.use('/', require('./swagger'));

router.get('/', (req, res) => { 
    //#swagger.tags=['Hello World']
    res.send('Hello World');
});

router.use('/players', require('./players'));

module.exports = router;