const express = require('express');
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/user-tips/:id', rejectUnauthenticated, (req, res) => {
    const user_id = req.params.id;

    pool.query(`SELECT * FROM shift_tips WHERE "user_id"=${user_id}`)
    .then(results => {
        res.send(results.rows);
    })
    .catch(err => {
        console.log('Error on DB get query to /api/shift-tips', err);
    })
})

router.get('/shift-tips/:id', rejectUnauthenticated, (req, res) => {
    const shift_id = req.params.id;
})

router.post('/add-tip', rejectUnauthenticated, (req, res) => {

    const timeIn = req.body.timeIn;
    const timeOut = req.body.timeOut;
    const totalHours = req.body.totalHours;
    const totalTips = req.body.total_tips;
    const drawer_id = req.body.drawer_id;
    const employee_id = req.user.id;
    const shift_id = req.body.shift_id;

    console.log(drawer_id);
    console.log(shift_id);

    sqlText = `INSERT INTO shift_tips 
                (time_in, time_out, hours_worked, total_tips, drawer_id, employee_id, shift_id)
                VALUES
                ($1, $2, $3, $4, $5, $6, $7);`

    sqlValues = [timeIn, timeOut, totalHours, totalTips, drawer_id, employee_id, shift_id];

    pool.query(sqlText, sqlValues)
    .then(() => res.sendStatus(201))
    .catch(err => {
        console.log('Shift_tips Post to Database failed', err);
        res.sendStatus(500);
    })
});

module.exports = router;