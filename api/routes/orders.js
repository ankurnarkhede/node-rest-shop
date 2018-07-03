/**
 * Created by smartankur4u on 29/6/18.
 */

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Order = require('../../models/order');
const Product = require('../../models/product');


router.get('/', function (req, res, next) {

    Order.find({}, '_id product quantity', function (err, result) {

        if (result) {
            const response = {
                count: result.length,
                createdOrder: result.map(function (order) {
                    return {
                        _id: order._id,
                        productId: order.product,
                        quantity: order.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + order._id
                        }
                    }

                })
            };

            res.status(200).json(response);
        }
        else if (err) {
            console.log(err);
            res.status(404).json(
                {
                    error: err
                });
        }
    });

});

router.post('/', function (req, res, next) {

    Product.findOne({_id: req.body.productId}, "_id name price", function (err, result) {

        if (result) {
            console.log("============product found");
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });

// saving to db

            order.save(function (err, result) {

                if (result) {
                    console.log(result);
                    res.status(201).json({
                        message: 'Creates order in POST /orders',
                        product: {
                            _id: result.id,
                            quantity: result.quantity,
                            product: result.product,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3000/orders/' + result._id
                            }
                        }
                    });
                }
                else if (err) {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                }
            });
        }
        else if (err) {
            console.log(err);
            res.status(404).json(
                {
                    error: err,
                    msg: 'Product not found for ID: ' + id
                });
        }
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