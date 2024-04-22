const express = require('express');
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY
const saltRounds = 10;

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, shopName, employeeId, isAdmin } = req.body;
        const newUser = new User({ firstName, lastName, shopName, employeeId, isAdmin });
        await newUser.save();
        // const token = jwt.sign({ userId: newUser._id }, JWT_KEY);
        const token = jwt.sign({ userId: newUser._id }, "coffeeinventory");
        res.status(201).json({ message: 'You have created a new user!', newUser, token });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/login', async (req, res) => {
    try{
        const { shopName, userId} = req.body;

        const user = await User.findOne({ $or: [{shopName}, {email: shopName}] })
        if(!user) {
            return res.status(401).json({error: "User Not found"});
        } 

        const employeeIdMatch = await bcrypt.compare(userId, user.employeeId);
        if(!employeeIdMatch) {
            return res.status(401).json({ error: "Incorrect User Id"});
        }

        const token =jwt.sign({ userId: user._id }, JWT_KEY)

        res.status(200).json({ message: "Login successful", token});

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({error: "Internal Server Error"})
    }
})

// router.post('/verify-token', async (req, res) => {
//     try{
//         const token = req.headers.authorization.split(' ')[1];
//         const decodedToken = jwt.verify(token, JWT_KEY);
//         const user = await User.findById(decodedToken.userId);
//         if(!user) {
//             return res.status(401).json({error: "User Not found"});
//         }

//         res.status(200).json({ message: "Token verified" });

//     } catch (error) {
//         console.error("Error during token verification:", error);
//         res.status(500).json({error: "Internal Server Error"})
//     }
// })

module.exports = router