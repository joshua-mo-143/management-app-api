// require variables
const express = require('express')
const router = express.Router()

// model schemas from /models/task.js
const team = require ('../models/team')
const Team = require ('../models/team')
const User = require('../models/user')
const Project = require('../models/project')

router.get('/', async (req, res) => {
    try {
        // await result
 const projects = await Project.find({projectMembers: { memberName: req.headers['user']}});
//  send back results to user
 res.json(projects);

//  catch errors
    } catch {
res.status(500).json({message: err.message})
    }

})
// Create team
router.post('/', async (req, res) => {
    // attempt to push new record to database based on schema
 const project = new Project({
    projectName: req.body.projectName,
    projectOwner: req.headers.user,
    projectBrief: req.body.projectBrief,
    highPriority: req.body.highPriority,
    projectDeadline: req.body.projectDeadline,
    assignedTeamId: req.body.assignedTeamId,
    projectMembers: [{
        memberName: req.headers['user'],
        joinedAt: Date.now()
    }]
 });

//  attempt commit to database
 try {
    const newProject = await project.save()
    res.status(201).json(newProject)
 } catch (err) {
    res.status(400).json({message: err.message})
 }
}
)

module.exports = router