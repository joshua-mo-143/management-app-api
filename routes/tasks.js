// require variables
const express = require('express')
const router = express.Router()

// model schemas from /models/task.js
const task = require('../models/task')
const Task = require('../models/task')

// Get all tasks, async await function
router.get('/', async (req, res) => {
    try {
        // await result
 const subscribers = await Task.find();
//  send back results to user
 res.json(subscribers);
//  catch errors
    } catch {
res.status(500).json({message: err.message})
    }
})

// Get one sub
router.get('/:id', getTask, (req, res) => {
    res.send(res.task)
})

// Create subscriber
router.post('/', async (req, res) => {
    // attempt to push new record to database based on schema
 const task = new Task({
    taskName: req.body.taskName,
    taskDesc: req.body.taskDesc,
 })

//  attempt commit to database
 try {
    const newTask =  await task.save()
    res.status(201).json(newTask)
 } catch (err) {
    res.status(400).json({message: err.message})
 }
})

// Update subscriber
router.patch('/:id', getTask, async (req, res) => {
    // if the name property of the request body contains something, attempt to set record name to new name
    if (req.body.taskName != null) {
        res.task.taskName = req.body.taskName
    }
    // if the subscribedChannel property of the body contains something, attempt to set subscribedChannel to new subscribedChannel
    if (req.body.taskDesc != null) {
        res.task.taskDesc = req.body.taskDesc
    }

    if (req.body.taskCompleted != null) {
        res.task.taskCompleted = req.body.taskCompleted
    }

    // attempt to save record changes to database
    try {
        const updatedTask = await res.task.save()
        res.json(updatedTask)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})
// Delete subscriber
router.delete('/:id', getTask, async (req, res) => {

    try {
        await res.task.remove()
        res.json({message: 'Deleted task'})
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// next property = once executed, move onto the next piece of code, preferably request or middleware
// async function to provide middleware for our API
async function getTask(req, res, next) {
    // define our unit variable
    let task;
    try {
        // query database to find subscriber by id (from URL - id parameter)
        // Subscriber.findById is a mongoose command 
        task = await Task.findById(req.params.id)
        // if subscriber doesn't exist, give error
        if (task == null) {
            return res.status(400).json({message: 'Cannot find task'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    // set subscriber response to information from await
    res.task = task;
    next()
}

module.exports = router