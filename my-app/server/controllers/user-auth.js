// const router = require('express').Router()
// const User = require('../models/user')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

// router.post('/register', async (req, res) => {
//     try{
//         const { firstName, lastName, shopName, userId} = req.body
//         const newUser = new User({  firstName, lastName, shopName, userId})
//     } catch{}
// })

// module.exports = router

const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, shopName, userId, isAdmin } = req.body;
        const newUser = new User({ firstName, lastName, shopName, userId, isAdmin });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, JWT_KEY);
        res.status(201).json({ message: 'You have created a new user!', newUser, token });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router
