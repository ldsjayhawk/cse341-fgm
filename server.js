const express = require('express');
// const dotenv = require('dotenv').config();
const mongo = require('./db/connect');
const bodyParser = require('body-parser');
const swaggerRouter = require('./routes/swagger');
const passport = require('passport');
const session = require('express-session')
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;
const errorHandler = require('./utilities/errorHandler');

//----------------
// Middleware
//----------------

app.use(bodyParser.json())

app.use(session({
    secret: 'secret', //random number in production
    resave: false,
    saveUninitialized: true,
}));

// Basic express session initialization
app.use(passport.initialize());
app.use(passport.session());
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With', 'Content-Type', 'Accept', 'Z-Key'
//     );
//     res.setHeader(
//         'Access-Control-Allow-Methods',
//         'GET, POST, PUT, DELETE, OPTIONS, PATCH');
//         next();
//     })
//     app.use(cors({ methods: ['GET, POST, PUT, DELETE, OPTIONS, PATCH'] }));
//     app.use(cors({ origin: '*' }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With', 'Content-Type', 'Accept', 'Z-Key'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS, PATCH');
        next();
    })
    app.use(cors({ methods: ['GET, POST, PUT, DELETE, OPTIONS, PATCH'] }));
    app.use(cors({ origin: '*' }));

//------------------
// PASSPORT 
//------------------

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ githubId: profile.id }, function (err,user) {
    console.log(null,profile)
        return done(null, profile);
        //});  mongodb user db call for user object
    }
));

passport.serializeUser((user, done) => {
    done(null, user);    
});
passport.deserializeUser((user, done) => {
    done(null, user);    
});
    
//------------------
// ROUTES 
//------------------

// app.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
app.get('/github', (req, res) => { res.send(req.session.user != undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});


app.get('/github/callback', 
    passport.authenticate('github', {failureRedirect: '/api-docs'}), //, session: false}
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);


app.use('/', require('./routes'));
app.use(errorHandler);
app.use('/api-docs', swaggerRouter);

mongo.initDb((err) => {
    if(err) {
        console.log(err);
    } 
    else {
        app.listen(port, () => {console.log(`Database is listening and node running on port: ${port}`)})
    }
})