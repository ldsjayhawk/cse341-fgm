const express = require('express');
const router = express.Router();
const draftPlayersRouter = require('./draftPlayers');
const gmsRouter = require('./gms');
// const teamsRouter = require('./teams');
const swaggerRouter = require('./swagger');
const passport = require('passport')




// router.use('/');
router.use('/', swaggerRouter);
router.use('/draftPlayers', draftPlayersRouter);
router.use('/gms', gmsRouter);
// router.use('/teams', teamsRouter);



router.get('/', (req, res) => { 
    let userName = '';
    if(req.user === undefined) {
        userName = 'World'
    } else {
        userName = req.user._json.name || req.user._json.login
    }
    console.log(userName)
    // const userName = req.user
    //#swagger.tags=['Hello World']
    res.send(`Hello ${userName}`);
});

router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if(err) {return next(err); }
        res.redirect('/');
    });
});

module.exports = router;