const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    try{
        const { firstName, lastName, shopName, shopId} = req.body
        const newUser = new User({  firstName, lastName, shopName, shopId})
    } catch{}
})



module.exports = router