/**
 * Created by smartankur4u on 6/7/18.
 */


const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const User = require('../../models/user');


// post to /signup /
router.post('/signup', function (req, res, next) {

    User.find({email: req.body.email}, function (er, result_user) {
        if (result_user.length >= 1) {

            return res.status(409).json({
                message: "Email exists"
            });

        } else {

            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                        password_text: req.body.password

                    });
                    user.save(function (err, result) {

                        if (result) {
                            console.log(result);
                            res.status(200).json({
                                message: 'Creates user in POST /signup',
                                product: {
                                    _id: result.id,
                                    email: result.email,
                                    password: result.password,
                                    password_text: result.password_text
                                }
                            });
                        } else if (err) {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        }

                    });
                }

            });

        }
    });


});


// post to /login /
router.post('/login', function (req, res, next) {

    User.find({email: req.body.email}, function (err, result) {
        if (result.length < 1) {

            console.log(err);
            res.status(401).json({
                message: 'Auth Failed'

            });

        }
        bcrypt.compare(req.body.password, result[0].password, function (err_pass, result_pass) {
            if (err_pass) {
                return res.status(401).json({
                    message: "Auth Failed"
                });
            } else if (result_pass) {
                return res.status(200).json({
                    message: "Auth Successful"
                });
            }
        });
    });


});



router.delete('/:userId', function (req, res, next) {

    const id = req.params.userId;
    console.log('=========deleting user========');

    // by deleting, just setting the status of user to false,
    // not actually deleting the user

    User.update({_id: id}, {status: false}, function (err, result) {
        if (result) {
            console.log(result);
            res.status(200).json({
                message: "User deleted",

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
