var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var mongoose = require('mongoose');
const config = require('./config');



var mongoDB = config.database.connection;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var indexRouter = require('./routes/index');

var polnilniceOpenChargeRouter = require('./routes/openChargeMapAPI/searchElektroPolnilnicaRoutes');
var elektroPolnilnicaRouter = require('./routes/polnilnice/elektroPolnilnicaRoutes');
var addressRoutes = require('./routes/polnilnice/addressRoutes');
var usersRouter = require('./routes/userRoutes');
var connectionRoutes = require('./routes/polnilnice/connectionRoutes');
var connectionTypeRoutes = require('./routes/polnilnice/connectionTypeRoutes');

var app = express();
const secretKey = 'your-secret-key'; // Uporabite močan skrivni ključ

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/polnilniceopencharge', polnilniceOpenChargeRouter);
app.use('/elektroPolnilnice', elektroPolnilnicaRouter);
app.use('/address', addressRoutes);
app.use('/connection', connectionRoutes);
app.use('/connectionType', connectionTypeRoutes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;