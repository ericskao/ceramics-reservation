var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const pool = require("./db/db");

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
// var habitsRouter = require("./routes/habits");
// const db = require("./queries");

var app = express();
app.use(cors());
const port = 3000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/reservations", async (req, res) => {
  // TODO
  // return this week and next two week's reservations
  // if reservations of this time span does not exist, then populate them

  try {
    // Execute a simple query to test the database connection
    const result = await pool.query("SELECT * FROM reservations");
    res.json({ reservations: result.rows || [] });
  } catch (error) {
    console.error("Error testing database connection:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.post("/reservations/:id", async (req, res) => {
  try {
    const wheelId = req.params.id;
    const userId = req.body.userId;
    const result = await pool.query(
      `
    WITH target_reservation AS (
      SELECT date, starting_time
      FROM reservations
      WHERE id = $1
    ),
    existing_reservations AS (
      SELECT DISTINCT user_id
      FROM reservations
      JOIN target_reservation
        ON reservations.date = target_reservation.date
        AND reservations.starting_time = target_reservation.starting_time
    )
    SELECT
      CASE
        WHEN EXISTS (
          SELECT 1
          FROM existing_reservations
          WHERE user_id = $2
        ) THEN true
        ELSE false
      END AS has_existing_reservation,
      (SELECT user_id FROM reservations WHERE id = $1) IS NOT NULL AS reservation_has_user_id;
    `,
      [wheelId, userId],
    );
    if (
      result.rows[0].has_existing_reservation ||
      result.rows[0].reservation_has_user_id
    ) {
      res.status(409).json({
        success: false,
        error:
          "Internal conflict error. Wheel is already reserved or User already has reservation for same day.",
      });
    } else {
      const response = await pool.query(
        `
        UPDATE reservations SET user_id = $1 WHERE id = $2
        RETURNING *;
      `,
        [userId, wheelId],
      );
      console.log(response);
      res.status(200).json(response.rows[0]);
    }
  } catch (error) {
    console.error("Error testing database connection:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.put(`/reservations/:id`, async (req, res) => {
  const wheelId = req.params.id;
  const userId = req.body.userId;
  const result = await pool.query(
    `
    UPDATE reservations SET user_id = $1 WHERE id = $2 RETURNING *;
    `,
    [userId, wheelId],
  );
  res.status(200).json(result.rows[0]);
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    `
    SELECT * FROM users WHERE id = $1;
  `,
    [id],
  );
  res.status(200).json(result.rows[0]);
});

app.post("/users", async (req, res) => {
  const user = req.body.user;
  const { uid, email, displayName } = req.body.user;
  const result = await pool.query(
    `
      INSERT INTO users (id, name, email)
      VALUES ($1, $2, $3)
    `,
    [uid, displayName, email],
  );
  res.status(201).json(result.rows[0]);
});

// app.use("/", indexRouter);
// app.use("/api/habits", habitsRouter);

// app.get("/users", db.getUsers);
// app.get("/users/:id", db.getUserById);
// app.post("/users", db.createUser);
// app.put("/users/:id", db.updateUser);
// app.delete("/users/:id", db.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
});

module.exports = app;
