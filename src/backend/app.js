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

// app.get("/", function (req, res, next) {
//   res.send([{ name: "habit1" }]);
// });

app.get("/hi", async (req, res) => {
  try {
    // Execute a simple query to test the database connection
    // const result = await pool.query("SELECT * FROM users");
    res.json({ success: true });
  } catch (error) {
    console.error("Error testing database connection:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
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
