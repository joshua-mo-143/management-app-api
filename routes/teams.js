// require variables
const express = require('express')
const passport = require('passport')
const router = express.Router()

// model schemas from /models/task.js
const team = require ('../models/team')
const Team = require ('../models/team')
const User = require('../models/user')

router.get('/', async (req, res) => {
    try {
        // await result
 const teams = await Team.find({teamMembers: { memberName: req.headers['user']}});
//  send back results to user
 res.json(teams);

//  catch errors
    } catch {
res.status(500).json({message: err.message})
    }

})
// Create team
router.post('/', async (req, res) => {
    // attempt to push new record to database based on schema
 const team = new Team({
    teamName: req.body.teamName,
    teamOwner: req.headers.user,
    teamMembers: [{
        memberName: req.headers['user'],
        joinedAt: Date.now()
    }]
 });

//  attempt commit to database
 try {
    const newTeam = await team.save()
    res.status(201).json(newTeam)
 } catch (err) {
    res.status(400).json({message: err.message})
 }
}
)

module.exports = router