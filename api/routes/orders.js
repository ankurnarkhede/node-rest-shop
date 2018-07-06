/**
 * Created by smartankur4u on 29/6/18.
 */

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth')

const Order = require('../../models/order');
const Product = require('../../models/product');

// importing the controllers
const OrdersController = require('../controllers/orders_controller');


router.get('/', checkAuth, OrdersController.orders_get_all);

router.post('/', checkAuth, OrdersController.orders_post_create_order);

router.get('/:orderId', checkAuth, OrdersController.orders_get_order);

router.delete('/:orderId', checkAuth, OrdersController.orders_delete_order);


module.exports = router;