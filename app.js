var createError = require('http-errors');
var express = require('express');
var morgan = require('morgan');

var app = express();

const productRouter = require('./api/routes/products');
const orderRouter = require('./api/routes/orders');

app.use(morgan('dev'));

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


// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });



// error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });


module.exports = app;
