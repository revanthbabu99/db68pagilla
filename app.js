var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var addmodsRouter = require('./routes/addmods');
var dogRouter = require('./routes/dog');
var selectorRouter = require('./routes/selector');
var Costume = require('./models/costume');
var resource = require('./routes/resource');
var mustang= require('./routes/mustang');

var app = express();

const connectionString = process.env.MONGO_CON;
mongoose = require('mongoose');
mongoose.connect("mongodb+srv://revanth:Revanth%402003@cluster0.8wlqs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true});


//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function(){
console.log("Connection to DB succeeded")
recreateDB();
}
);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/addmods', addmodsRouter);
app.use('/dog',dogRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resource);
app.use('/mustang', mustang);


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

async function recreateDB(){
  // Delete everything
  await Costume.deleteMany();
  let instance1 = new  Costume({costume_type:"ghost", size:'small',cost:26.4});
  let instance2 = new  Costume({costume_type:"bobby", size:'large',cost:67.4});
  let instance3 = new Costume({costume_type:"superman", size:'medium',cost:66.4});
  instance1.save( function(err,doc) {
  if(err) return console.error(err);
  console.log("First object saved")
  });
  instance2.save( function(err,doc) {
  if(err) return console.error(err);
  console.log("second object saved")
  });
  instance3.save( function(err,doc) {
  if(err) return console.error(err);
  console.log("third object saved")
    });
 }

module.exports = app;
