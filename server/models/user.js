const { mongoose } = require('../db');
// const { mongoose } = require('mongoose');

const User = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            maxLength: 70
        },
        lastName: {
            type: String,
            required: true,
            maxLength: 70
        },
        shopName: {
            type: String,
            required: true
        },
        employeeId: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false // By default, users are not admins
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("user", User);
