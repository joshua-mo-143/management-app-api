// require variables
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

// model schemas from /models/task.js
const user = require('../models/user')
const User = require('../models/user')

router.post('/', async (req, res) => {

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        try {
        const newUser = await user.save()
        res.status(201).json(newUser);
        console.log(newUser);

     } catch(err) {
        res.status(400).json({message: err.message})
     }

})

module.exports = router