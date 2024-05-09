const pool = require("./db/db");
var router = express.Router();

router.get("/", function (req, res, next) {
  pool.query(
    `
    SELECT
      *;
    `,
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send(result.rows);
    },
  );
});
