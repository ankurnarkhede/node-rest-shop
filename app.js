var createError = require('http-errors');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

const productRouter = require('./api/routes/products');
const orderRouter = require('./api/routes/orders');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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
        error: {
            message: error.message
        }
    });
});





module.exports = app;
