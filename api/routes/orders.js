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
    var order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'order was created',
        order: order
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
        message: 'Order  deleted',
        orderId: req.params.orderId
    });
});


module.exports = router;