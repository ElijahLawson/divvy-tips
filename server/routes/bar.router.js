const express = require('express');
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query('SELECT * FROM location;')
    .then((results) => {
        res.send(results.rows)
    })
    .catch((err) => {
        console.log('error', err);
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