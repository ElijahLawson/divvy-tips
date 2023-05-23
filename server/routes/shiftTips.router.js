const express = require('express');
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/:id', rejectUnauthenticated, (req, res) => {
    const shift_id = req.params.id;

    pool.query(`SELECT * FROM shift_tips WHERE "shift_id"=${shift_id}`)
    .then(results => {
        res.send(results.rows);
    })
    .catch(err => {
        console.log('Error on DB get query to /api/shift-tips', err);
    })
})

router.post('/add-tip', rejectUnauthenticated, (req, res) => {

    const shift_tips = req.body;
    const timeIn = req.body.timeIn;
    const timeOut = req.body.timeOut;
    const totalHours = req.body.totalHours;
    const totalTips = req.body.total_tips;
    const employee_id = req.user.id;
    const shift_id = req.body.shift_id;

    console.log(shift_id);

    // sqlText = `UPDATE shift_tips
    // SET time_in=$1, time_out=$2, hours_worked=$3, total_tips=$4, employee_id=$5, shift_id=$6
    // WHERE id`

    sqlText = `INSERT INTO shift_tips 
                (time_in, time_out, hours_worked, total_tips, employee_id, shift_id)
                VALUES
                ($1, $2, $3, $4, $5, $6);`

    sqlValues = [timeIn, timeOut, totalHours, totalTips, employee_id, shift_id];

    pool.query(sqlText, sqlValues)
    .then(() => res.sendStatus(201))
    .catch(err => {
        console.log('Shift_tips Post to Database failed', err);
        res.sendStatus(500);
    })
});

module.exports = router;