/**
 * Created by smartankur4u on 29/6/18.
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth')

// importing the controllers
const ProductsController = require('../controllers/products_controller');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = function (req, file, cb) {
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);

    }

};

const upload = multer({
    storage: storage,
    limits: {
        filesize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


const Product = require('../../models/product');


// handle get requests to products
router.get('/', ProductsController.products_get_all);

// post to product
router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_post_create_product);

// get product info by id
router.get('/:productId', ProductsController.product_get_productById);

// patch product
router.patch('/:productId', checkAuth, ProductsController.products_patch_productById);

// delete a product by id
router.delete('/:productId', checkAuth, ProductsController.products_delete_productById);

module.exports = router;