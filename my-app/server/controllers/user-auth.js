//Hi I did this -Frans
const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

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
    try {
        const { shopName, employeeId } = req.body;
        const user = await User.findOne({ shopName, employeeId });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const token = jwt.sign({ userId: user._id }, JWT_KEY);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



router.put('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { firstName, lastName, shopName, employeeId, isAdmin } = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, { firstName, lastName, shopName, employeeId, isAdmin }, { new: true });
        res.status(200).json({ message: "User details updated", updatedUser });
    } catch (error) {
        console.error("Error updating user detail:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;

