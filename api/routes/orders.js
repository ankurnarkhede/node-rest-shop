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
    }).populate('product', '_id name price');

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
                            _id: result._id,
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

    const id = req.params.orderId;

    Order.findOne({_id: id}, "_id quantity product", function (err, result) {

        if (result) {
            console.log(result);
            res.status(200).json({
                message: 'Handling GET requests to /orders/orderId',
                product: result,
                request: {
                    type: 'GET',
                    description: 'Get all orders',
                    url: 'http://localhost:3000/orders/'
                }
            });
        }
        else if (err) {
            console.log(err);
            res.status(404).json(
                {
                    error: err,
                    msg: 'No valid entry found for ID: ' + id
                });
        }
    });

});

router.delete('/:orderId', function (req, res, next) {
    const id = req.params.orderId;
    console.log('=========deleting order========');

    Order.deleteOne({_id: id}, function (err, result) {
        if (result) {
            console.log(result);
            res.status(200).json({
                msg: "Order deleted",
                result: result
            });
        }
        else if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
    });
});


module.exports = router;