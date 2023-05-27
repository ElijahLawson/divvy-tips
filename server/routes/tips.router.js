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
    const location_id = req.user.location_id;
    console.log(shift_id);
    console.log(location_id);

    sqlText = `SELECT "user".id as employee_id, "user".first_name, "user".last_name, shift_tips.id as shift_tips_id, shift_tips.time_in, shift_tips.time_out, shift_tips.break_time, shift_tips.hours_worked, shift_tips.total_tips,
    shift_tips.drawer_id, drawers.name as drawer_name, drawers.location_id, 
    location.name as location_name, location.city, location.state, location.barback_cut
    FROM shift_tips JOIN drawers ON shift_tips.drawer_id=drawers.id 
    JOIN "user" ON "user".id=shift_tips.employee_id
    JOIN location on drawers.location_id=location.id
    WHERE shift_tips.shift_id=${shift_id} AND location.id=${location_id}`
    
    pool.query(sqlText)
    .then(results => {
        res.send(results.rows);
    }).catch(err => {
        console.log('Error on Shift Tips GET query to DB', err)
    })
})

router.post('/add-tip', rejectUnauthenticated, (req, res) => {

    const timeIn = req.body.timeIn;
    const timeOut = req.body.timeOut;
    const breakTime = req.body.breakTime;
    const totalHours = req.body.totalHours;
    const totalTips = req.body.total_tips;
    const drawer_id = req.body.drawer_id;
    const employee_id = req.user.id;
    const shift_id = req.body.shift_id;

    console.log(drawer_id);
    console.log(shift_id);

    sqlText = `INSERT INTO shift_tips 
                (time_in, time_out, break_time,  hours_worked, total_tips, drawer_id, employee_id, shift_id)
                VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8);`

    sqlValues = [timeIn, timeOut, breakTime, totalHours, totalTips, drawer_id, employee_id, shift_id];
    console.log(sqlValues)

    pool.query(sqlText, sqlValues)
    .then(() => res.sendStatus(201))
    .catch(err => {
        console.log('Shift_tips Post to Database failed', err);
        res.sendStatus(500);
    })
});

router.post('/shift-tips/add-shift-tips/:id', rejectUnauthenticated, (req, res) => {
    const shifts = req.body
    let times_in = shifts.map(shift => shift.timeIn);
    let times_out = shifts.map(shift => shift.timeOut);
    let breakTimes = shifts.map(shift => shift.breakTime);
    let hourTotals = shifts.map(shift => shift.totalHours);
    let employee_ids = shifts.map(shift => shift.employee_id);
    let shift_ids = shifts.map(shift => shift.shift_id);

    sqlQuery = `INSERT INTO shift_tips
                (time_in, time_out, break_time, hours_worked, employee_id, shift_id)
                VALUES
                (
                    UNNEST($1::text[]),
                    UNNEST($2::text[]),
                    UNNEST($3::integer[]),
                    UNNEST($4::decimal[]),
                    UNNEST($5::integer[]),
                    UNNEST($6::integer[])
                );`

    sqlValues = [times_in, times_out, breakTimes, hourTotals, employee_ids, shift_ids];

    pool.query(sqlQuery, sqlValues)
    .then(() => res.sendStatus(201))
    .catch(err => {
        console.log('Failed to post shift tips', err)
    })
})

router.put('/shift-tip/edit-shift-tips/', rejectUnauthenticated, (req, res) => {
    const shifts = req.body;
    let times_in = shifts.map(shift => shift.timeIn);
    let times_out = shifts.map(shift => shift.timeOut);
    let breakTimes = shifts.map(shift => shift.breakTime);
    let hourTotals = shifts.map(shift => shift.totalHours);
    let employee_ids = shifts.map(shift => shift.employeeId);
    let shift_ids = shifts.map(shift => shift.shift_id);
    let shift_tips_ids = shifts.map(shift => shift.shift_tips_id);

    sqlQuery = `UPDATE shift_tips
                    SET time_in = temp.time_in,
                        time_out = temp.time_out,
                        break_time = temp.break_time,
                        hours_worked = temp.hours_worked,
                        employee_id = temp.employee_id,
                        shift_id = temp.shift_id
                FROM (SELECT UNNEST($1::text[]) as time_in,
                            UNNEST($2::text[]) as time_out,
                            UNNEST($3::integer[]) as break_time,
                            UNNEST($4::decimal[]) as hours_worked,
                            UNNEST($5::integer[]) as employee_id,
                            UNNEST($6::integer[]) as shift_id,
                            UNNEST($7::integer[]) as shift_tips_id
                ) temp
                WHERE shift_tips.id = temp.shift_tips_id;`

    sqlValues = [times_in, times_out, breakTimes, hourTotals, employee_ids, shift_ids, shift_tips_ids];
    console.log(sqlValues)

    pool.query(sqlQuery,sqlValues)
    .then(() => res.sendStatus(200))
    .catch(err => {
        console.log('Failure to update shift tips to db', err)
    })
})

router.delete('/shift_tip/delete-shift-tips', rejectUnauthenticated, (req, res) => {
    const shifts = req.body;
    // const shift_tips_ids = shifts.map(shift => shift.shift_tips_id);
    let shift_tips_ids = shifts.map(shift => shift.shift_tips_id);

    sqlQuery = `DELETE FROM shift_tips WHERE (shift_tips.id) IN (
                SELECT * FROM UNNEST($1::integer[]));
    `
    sqlValues = [shift_tips_ids];

    pool.query(sqlQuery, sqlValues)
    .then(() => res.sendStatus(200))
    .catch(err => {
        console.log('Failure to delete shift tips from db', err);
    })
})

module.exports = router;