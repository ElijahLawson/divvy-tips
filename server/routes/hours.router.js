const express = require('express');
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/shift-hours/:id', rejectUnauthenticated, (req, res) => {
    const shift_id = req.params.id;
    const location_id = req.user.location_id;

    sqlText = `SELECT "user".id, first_name, last_name, hours_worked FROM shift_tips 
    JOIN "user" ON shift_tips.employee_id="user".id 
    JOIN location on "user"."location_id" = location.id
    WHERE shift_tips.shift_id=$1 and location.id=$2;`

    sqlValues = [shift_id, location_id];

    pool.query(sqlText, sqlValues)
    .then(results => {
        console.log(results.rows);
        res.send(results.rows);
    })
    .catch(err => {
        console.log('Error on GET request to Database on api/hours/shift-hours/', err)
    })
})

// router.put('/shift-hours/update/:id', rejectUnauthenticated, (req, res) => {
//     const shift_id = req.params.id;
//     // const 

// })

module.exports = router;