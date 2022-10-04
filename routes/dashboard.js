// require variables
const express = require('express')
const passport = require('passport')
const router = express.Router()

// model schemas from /models/task.js
const User = require('../models/user')
const Task = require('../models/task')
const Team = require('../models/team')
const Project = require('../models/project')

router.get('/', async (req, res) => {
    try {
    const tasks =  await Task.find({taskOwner: req.headers['user']});
    const teams = await Team.find({'teamMembers.memberName': req.headers.user});
    const projects = await Project.find({'projectMembers.memberName': req.headers.user});

    res.json({tasks, teams, projects});

    //  catch errors
        } catch(err) {
    res.status(500).json({message: err.message})
        }
    
    })

module.exports = router