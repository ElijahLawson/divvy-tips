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

        if (shift) {
            res.send({todays_shift_id: shift.id});
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

module.exports = router;