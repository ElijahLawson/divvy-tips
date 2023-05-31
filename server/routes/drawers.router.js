const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

router.get("/", rejectUnauthenticated, (req, res) => {
  pool
    .query(`SELECT * FROM "drawers" WHERE location_id=${req.user.location_id}`)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((err) => {
      console.log("Failure to send ");
    });
});

router.get("/shift-drawers/:id", rejectUnauthenticated, (req, res) => {
  const id = req.params.id;

  sqlQuery = `SELECT drawers.id as drawer_id, drawers.name as drawer_name, 
                      shift_tips.total_tips as charged_tips, shift_tips.shift_id as shift_id, shift_tips.id as shift_tips_id
                      from Drawers JOIN shift_tips ON shift_tips.drawer_id=drawers.id
   WHERE shift_id=${id};`;

  pool.query(sqlQuery)
  .then(results => {
    res.send(results.rows);
  })
  .catch(err => {
    console.log("Failure to GET shift drawers from db", err);
  });
});

// router.get("/shift-drawers/:id", rejectUnauthenticated, (req, res) => {
//   const id = req.params.id;

//   sqlQuery = `SELECT drawers.id as drawer_id, drawers.name as drawer_name, 
//                       shift_tips.total_tips as charged_tips, shift_tips.shift_id as shift_id, shift_tips.id as shift_tips_id
//                       from Drawers JOIN shift_tips ON shift_tips.drawer_id=drawers.id
//    WHERE drawers.location_id=${req.user.location_id};`;

//   pool.query(sqlQuery)
//   .then(results => {
//     console.log(results.rows);
//     res.send(results.rows);
//   })
//   .catch(err => {
//     console.log("Failure to GET shift drawers from db", err);
//   });
// });

router.post("/add-drawers", (req, res) => {
  const names = req.body[0];
  const id = req.body[1];

  const sqlQuery = `INSERT INTO drawers (name, location_id) VALUES (UNNEST($1::text[]), $2);`;
  const sqlValues = names;

  pool
    .query(sqlQuery, [sqlValues, id])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("Failor to post drawers to /add_drawers", err);
    });
});

module.exports = router;
