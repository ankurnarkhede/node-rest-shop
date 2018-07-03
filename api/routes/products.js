/**
 * Created by smartankur4u on 29/6/18.
 */

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Product = require('../../models/product');

// handle get requests to products
router.get('/', function (req, res, next) {

    Product.find({}, '_id name price ', function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).json(
                {
                    error: err
                });
        }
        if (result) {
            const response = {
                count: result.length,
                products: result.map(function (item) {
                    return {
                        name: item.name,
                        price: item.price,
                        _id: item._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + item._id
                        }
                    }

                })
            };

            res.status(200).json(response);
        }
    });

});

// post to /
router.post('/', function (req, res, next) {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

// saving to db

    product.save(function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        if (result) {
            console.log(result);
            res.status(200).json({
                message: 'Creates product in POST /product',
                product: {
                    _id: result.id,
                    name: result.name,
                    price: result.price,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + result._id
                    }
                }
            });
        }
    });


});

router.get('/:productId', function (req, res, next) {
    const id = req.params.productId;

    Product.findOne({_id: id}, "_id name price", function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).json(
                {
                    error: err,
                    msg: 'No valid entry found for ID: ' + id
                });
        }
        if (result) {
            console.log(result);
            res.status(200).json({
                message: 'Handling GET requests to /products/productId',
                product: result,
                request: {
                    type: 'GET',
                    description: 'Get all products',
                    url: 'http://localhost:3000/products/'
                }
            });
        }
    });


});


router.patch('/:productId', function (req, res, next) {

    const id = req.params.productId;
    const updateOps = {};
    console.log('=========updating product========');

    for (ops in req.body) {
        console.log(req.body[ops].value);
        updateOps[req.body[ops].propName] = req.body[ops].value
    }

    Product.update({_id: id}, {$set: updateOps}, function (err, result) {
        if (result) {
            console.log(result);
            res.status(200).json({
                msg: "product updated",
                result: result
            })

        }
        else if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
    });

});

router.delete('/:productId', function (req, res, next) {

    const id = req.params.productId;
    console.log('=========deleting product========');

    Product.deleteOne({_id: id}, function (err, result) {
        if (result) {
            console.log(result);
            res.status(200).json({
                msg: "Item deleted",
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