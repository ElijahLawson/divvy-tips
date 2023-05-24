const express = require('express');
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/user-bar', (req, res) => {
    user_id = req.user.id
    pool.query(`SELECT location.id, 
        location.name, 
        location.city, 
        location.state,
        location.barback_cut
         FROM location JOIN "user" ON location.id="user".location_id WHERE "user".id=${user_id};`)
    .then((results) => {
        res.send(results.rows)
    })
    .catch((err) => {
        console.log('error', err);
        res.sendStatus(500)
    })
})

router.get('/all-bars', (req, res) => {
    pool.query('SELECT * FROM location')
    .then((results) => {
        res.send(results.rows)
    })
    .catch(err => {
        console.log('Error')
        res.sendStatus(500)
    })
})

router.post('/register', (req, res, next) => {
    const barName = req.body.barName;
    const city = req.body.city;
    const state = req.body.stateCode;
    const barBackCut = req.body.barBackCut;

    const queryText = `INSERT INTO "location" (name, city, state, barback_cut)
        VALUES ($1, $2, $3, $4)`

    const sqlValues = [barName, city, state, barBackCut];

    pool
        .query(queryText, sqlValues)
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.log('Bar Registration failed', err);
            res.sendStatus(500);
        })
});

module.exports = router;