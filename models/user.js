/**
 * Created by smartankur4u on 6/7/18.
 */



const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        // unique:true
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

    },

    password: {type: String, required: true},

    password_text: {type: String, required: true},

    status: {type: Boolean, default: true}

});

module.exports = mongoose.model('User', userSchema);

