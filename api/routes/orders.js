/**
 * Created by smartankur4u on 29/6/18.
 */

const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.status(200).json({
        message: 'Orders were fetched'
    });
});

router.post('/', function (req, res, next) {
    res.status(201).json({
        message: 'order was created'
    });
});

router.get('/:orderId', function (req, res, next) {
    res.status(200).json({
        message: 'Order details',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', function (req, res, next) {
    res.status(200).json({
        message: 'Order deleted',
        orderId: req.params.orderId
    });
});


module.exports = router;