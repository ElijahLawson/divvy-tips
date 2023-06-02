const express = require('express');
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/user-bar', (req, res) => {
    user_id = req.user.id

    const sqlQuery = `SELECT location.id, 
                            location.name, 
                            location.city, 
                            location.state,
                            location.barback_cut
                    FROM location JOIN "user" ON location.id="user".location_id 
                    WHERE "user".id=${user_id};`

    pool.query(sqlQuery)
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

router.get('/bartenders/', rejectUnauthenticated, (req, res) => {
    const location_id = req.user.location_id;
    const sqlQuery = `SELECT "user".id, "user".first_name, "user".last_name 
                    FROM "user" JOIN location on "user".location_id=location.id
                    WHERE location.id=${location_id}`
    pool.query(sqlQuery)
    .then(results => {
        res.send(results.rows);
    })
    .catch(err => {
        console.log('Error retrieving location bartenders from database', err)
        res.sendStatus(500);
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