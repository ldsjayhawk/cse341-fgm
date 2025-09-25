const express = require('express');
const router = express.Router();
const draftPlayersRouter = require('./draftPlayers');
// const teamsRouter = require('./teams');
const gmsRouter = require('./gms');
const swaggerRouter = require('./swagger');


// router.use('/');
router.use('/draftPlayers', draftPlayersRouter);
// router.use('/teams', teamsRouter);
router.use('/gms', gmsRouter);
router.use('/', swaggerRouter);

router.get('/', (req, res) => { 
    //#swagger.tags=['Hello World']
    res.send('Hello World');
});

module.exports = router;