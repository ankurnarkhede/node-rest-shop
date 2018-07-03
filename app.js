var createError = require('http-errors');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

const productRouter = require('./api/routes/products');
const orderRouter = require('./api/routes/orders');

mongoose.connect(
    'mongodb+srv://node-rest-shop:'
    + process.env.MONGO_ATLAS_PW +
    '@node-rest-shop-ynkrt.mongodb.net/test?retryWrites=true'
    // {
    //     useMongoClient: true
    // }
);
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        "Access-Control-Allow-Origin",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productRouter);
app.use('/orders', orderRouter);


// error handler
app.use(function (req, res, next) {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    res.json({
        msg: "Inside app.js error handler",
        error: {
            message: error.message
        }
    });
});


module.exports = app;
