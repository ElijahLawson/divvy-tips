const express = require('express');
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query('SELECT * FROM "drawers"')
    .then(results => {
      res.send(results.rows)
    })
    .catch(err => {
      console.log('Failure to send ')
    })
})

router.post('/add-drawers', rejectUnauthenticated, (req,res) => {

  const names = req.body[0]
  const id = req.body[1]
  console.log(req.body)
  // const names = req.body
  console.log(names)
  const sqlQuery = `INSERT INTO drawers (name, location_id) VALUES (UNNEST($1::text[]), $2);`
  const sqlValues = names;

  pool.query(sqlQuery, [sqlValues, id])
  .then(() => res.sendStatus(201))
  .catch(err => {
    console.log('Failor to post drawers to /add_drawers', err)
  })
})

module.exports = router;