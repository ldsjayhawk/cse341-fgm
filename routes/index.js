const express = require('express');
const router = express.Router();
const playersRouter = require('./draftPlayers');
const teamsRouter = require('./teams');
const gmsRouter = require('./gms');


// router.use('/');
router.use('players', playersRouter);
router.use('teams', teamsRouter);
router.use('gms', gmsRouter);


// router.use('/', require('./swagger'));

router.get('/', (req, res) => { 
    //#swagger.tags=['Hello World']
    res.send('Hello World');
});

router.use('/players', require('./draftPlayers'));
router.use('/teams', require('./teams'));
router.use('/gms', require('./gms'));

module.exports = router;