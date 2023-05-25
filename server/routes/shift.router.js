const express = require('express');
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', rejectUnauthenticated, async (req, res) => {
    try {
        const initialResponse = await pool.query(`SELECT * FROM shifts WHERE location_id=${req.user.location_id} AND date=CURRENT_DATE-1`)
        const shift = initialResponse.rows[0];
        console.log(shift);

        if (shift) {
            res.send(shift);
        } else {
            console.log('ELSE');
            const response = await pool.query(`INSERT INTO SHIFTS (date, location_id) VALUES (CURRENT_DATE - 1, ${req.user.location_id}) RETURNING id`);
            const new_shift = response.rows[0];
            res.send({todays_shift_id: new_shift.id});
        }
    } catch (error) {
        console.log('The Shifts GET request to DB failed', error);
        res.sendStatus(500);
    }
})

router.get('/user-history', rejectUnauthenticated, (req, res) => {
    const user_id = req.user.id;
    console.log(user_id);
    const sqlQuery = `SELECT shifts.date, shifts.hourly, shift_tips.hours_worked 
    FROM shift_tips JOIN shifts ON shift_tips.shift_id=shifts.id
    WHERE shift_tips.employee_id=${user_id}`;

    pool.query(sqlQuery)
    .then(results => {
        res.send(results.rows);
    })
    .catch(err => {
        console.log('USER SHIFT HISTORY GET REQUEST TO DB FAILED', error);
    })

})

router.put('/update-1/:id', rejectUnauthenticated, (req, res) => {

    const totalCash = req.body.totalCash;
    const barbackCheck = req.body.barbackCheck;
    const runner_id = req.body.runner_id;
    const shift_id = req.params.id;

    sqlQuery = `UPDATE shifts SET total_cash=$1, barback_check=$2, runner_id=$3 where shifts.id=$4`;
    sqlValues = [totalCash, barbackCheck, runner_id, shift_id]

    pool.query(sqlQuery, sqlValues)
    .then(() => res.sendStatus(200))
    .catch(err => {
        console.log('Cash and Barback Check PUT request to DB failed', err)
    })
})

router.put('/update-2/:id', rejectUnauthenticated, (req, res) => {
    const totalHours = req.body.totalHours;
    const shift_id = req.params.id;

    sqlQuery = `UPDATE shifts SET total_hours=$1 WHERE shifts.id=$2`;
    sqlValues = [totalHours, shift_id];

    pool.query(sqlQuery, sqlValues)
    .then(() => res.sendStatus(200))
    .catch(err => {
        console.log('Total Hours PUT request to DB failed', err);
    })
})

router.put('/update-3/:id', rejectUnauthenticated, (req, res) => {
    const hourly = req.body.hourly;
    const shift_id = req.params.id;

    sqlQuery = `UPDATE shifts SET hourly=$1 WHERE shifts.id=$2`;
    sqlValues = [hourly, shift_id];

    pool.query(sqlQuery, sqlValues)
    .then(() => res.sendStatus(200))
    .catch(err => {
        console.log('Hourly PUT request to DB failed', err);
    })
})

module.exports = router;