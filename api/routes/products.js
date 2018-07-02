/**
 * Created by smartankur4u on 29/6/18.
 */

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Product = require('../../models/product');

// handle get requests to products
router.get('/', function (req, res, next) {

    Product.find(function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).json(
                {
                    error: err
                });
        }
        if (result) {
            res.status(200).json({
                message: 'Handling GET requests to /products',
                product: result
            });
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
                message: 'Handling POST requests to /products',
                product: product
            });
        }
    });


});

router.get('/:productId', function (req, res, next) {
    const id = req.params.productId;

    Product.findOne({_id: id}, function (err, result) {
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
                product: result
            });
        }
    });


});


router.patch('/:productId', function (req, res, next) {

    const id = req.params.productId;
    console.log('=========updating product========');

    req.body.forEach(ops, function () {
        updateOps[ops.propName] = ops.value;
    });
    console.log(updateOps);

    Product.update({_id: id}, {$set: updateOps})

    res.status(200).json({
        message: 'Updated product',
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