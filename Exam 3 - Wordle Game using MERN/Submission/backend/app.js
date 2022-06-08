var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors=require("cors");
const mongodb = require("mongodb");
const dotenv = require("dotenv");
const CoursesDAO = require("./dao/coursesDAO.js");



const corsOptions ={
  origin:'http://localhost:3000', //origin: '*'
  //credentials:true,
  //optionSuccessStatus:200,
}

/*
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
*/

var coursesRouter = require('./routes/courses.route');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors(corsOptions)); //cross origin resource sharing.

//app.use('/', indexRouter);
/*app.use('/users', usersRouter);

*/

app.use(coursesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




const MongoClient = mongodb.MongoClient

MongoClient.connect(
  process.env.COURSES_DB_URI
  )
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await CoursesDAO.injectDatabase(client);

  });



module.exports = app;
