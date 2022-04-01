require('dotenv').config();
var express = require("express");
var session = require('express-session')
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const nunjucks = require("nunjucks");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");




var app = express();

nunjucks.configure("views", {
    autoescape: true,
    express: app
});
// view engine setup



app.use(logger("dev"));
app.use(express.json());    
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { sameSite: true}
  }))
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;