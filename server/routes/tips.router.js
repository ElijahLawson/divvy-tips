const express = require('express');
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const router = express.Router();

//GET route to retrieve all of the USERS shift_tips data
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

//GET route to retrieve specific data for a shift - used in the edit hours table component
//TODO:: CONVERT STRING INTERPOLATION TO $1,$2 METHOD FOR SQLQUERY
router.get('/shift-tips/:id', rejectUnauthenticated, (req, res) => {
    const shift_id = req.params.id;
    const location_id = req.user.location_id;

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

//GET route to retrieve just the shift_tips total_tips amount from the shift_tips table
router.get('/shift-tips/tip-out/:id', rejectUnauthenticated, (req, res) => {
    const shift_id = req.params.id;
    const location_id = req.user.location_id;

    sqlQuery = `SELECT shift_tips.total_tips FROM shift_tips join shifts on shift_tips.shift_id=shifts.id where shift_tips.shift_id=${shift_id} and shifts.location_id=${location_id}`

    pool.query(sqlQuery)
    .then(results => {
        console.log(results.rows);
        res.send(results.rows)
    }).catch(err => {
        console.log('Error on shift tips tipout get query to DB', err);
    })
})

//POST route to shift_tips table to add a row -> pinged from Add Tips component
router.post('/add-tip', rejectUnauthenticated, (req, res) => {

    const timeIn = req.body.timeIn;
    const timeOut = req.body.timeOut;
    const breakTime = req.body.breakTime;
    const totalHours = req.body.totalHours;
    const totalTips = req.body.total_tips;
    const drawer_id = req.body.drawer_id;
    const employee_id = req.user.id;
    const shift_id = req.body.shift_id;

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

//POST request with larger array of objects from the edit hours table component
//The array of objects is converted to arrays of column data 
//and then uses UNNEST to parallel insert into the table
router.post('/shift-tips/add-shift-tips/:id', rejectUnauthenticated, (req, res) => {

    let times_in = req.body.map(shift => shift.time_in);
    let times_out = req.body.map(shift => shift.time_out);
    let breakTimes = req.body.map(shift => shift.break_time);
    let hourTotals = req.body.map(shift => shift.hours_worked);
    let employee_ids = req.body.map(shift => shift.employee_id);
    let shift_ids = req.body.map(shift => shift.shift_id);

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

    let times_in = req.body.map(shift => shift.time_in);
    let times_out = req.body.map(shift => shift.time_out);
    let breakTimes = req.body.map(shift => shift.break_time);
    let hourTotals = req.body.map(shift => shift.hours_worked);
    let employee_ids = req.body.map(shift => shift.employee_id);
    let shift_ids = req.body.map(shift => shift.shift_id);
    let shift_tips_ids = req.body.map(shift => shift.shift_tips_id);

    `UPDATE fish
        SET month
        WHERE `

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

    pool.query(sqlQuery,sqlValues)
    .then(() => res.sendStatus(200))
    .catch(err => {
        console.log('Failure to update shift tips to db', err)
    })
})

//PUT request to update rows using the same UNNEST principle -> used by the edit tips table component
router.put('/shift-tip/edit-shift-tips-drawer/', rejectUnauthenticated, (req, res) => {
    const drawers = req.body;
    const drawer_ids = drawers.map(drawer => drawer.id);
    const total_tips = drawers.map(drawer => drawer.charged_tips);
    const shift_id = drawers[0].shift_id;
    
    const sqlQuery = `UPDATE shift_tips
                        SET total_tips = temp.total_tips
                        FROM (SELECT UNNEST($1::money[]) as total_tips,
                                    UNNEST($2::integer[]) as drawer_id
                        ) temp
                        WHERE (shift_tips.drawer_id=temp.drawer_id AND shift_id=$3);`

    sqlValues = [total_tips, drawer_ids, shift_id]
    
    pool.query(sqlQuery, sqlValues)
    .then(() => res.sendStatus(200))
    .catch(err => {
        console.log('Failure to update shift tips drawers to db', err);
    })
})

//POST request to update rows using the same UNNEST principle -> used by the edit tips table component
router.post('/shift-tip/add-shift-tips-drawer-only/', rejectUnauthenticated, (req, res) => {
    const drawers = req.body;
    const drawer_ids = drawers.map(drawer => drawer.id);
    const total_tips = drawers.map(drawer => drawer.charged_tips);
    const shift_id = drawers[0].shift_id;

    const sqlQuery = `INSERT INTO shift_tips
                        (total_tips, drawer_id, shift_id)
                        VALUES
                        (
                            UNNEST($1::money[]),
                            UNNEST($2::integer[]),
                            $3
                        );`
    
    const sqlValues = [total_tips, drawer_ids, shift_id];

    console.log(sqlValues);

    pool.query(sqlQuery, sqlValues)
    .then(() => res.sendStatus(200))
    .catch(err => {
        console.log('Error posting drawer only shift tips to db', err);
    })
})

//Delete Request for rows on the shift_tips table -> used by Edit Hours Table Component
router.delete('/shift-tip/delete-shift-tips', rejectUnauthenticated, (req, res) => {

    let shift_tips_ids = req.body.map(shift => shift.shift_tips_id);

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