// require variables
const express = require('express')
const router = express.Router()

// model schemas from /models/subscriber.js
const subscriber = require('../models/subscriber')
const Subscriber = require('../models/subscriber')

// Get all subs, async await function
router.get('/', async (req, res) => {
    try {
        // await result
 const subscribers = await Subscriber.find();
//  send back results to user
 res.json(subscribers);
//  catch errors
    } catch {
res.status(500).json({message: err.message})
    }
})

// Get one sub
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber.name)
})
// Create subscriber
router.post('/', async (req, res) => {
    // attempt to push new record to database based on schema
 const subscriber = new Subscriber({
    name: req.body.name,
    subscribedChannel: req.body.subscribedChannel,
 })

//  attempt commit to database
 try {
    const newSubscriber =  await subscriber.save()
    res.status(201).json(newSubscriber)
 } catch (err) {
    res.status(400).json({message: err.message})
 }
})
// Update subscriber
router.patch('/:id', getSubscriber, async (req, res) => {
    // if the name property of the request body contains something, attempt to set record name to new name
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    // if the subscribedChannel property of the body contains something, attempt to set subscribedChannel to new subscribedChannel
    if (req.body.subscribedChannel != null) {
        res.subscriber.subscribedChannel = req.body.subscribedChannel
    }

    // attempt to save record changes to database
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})
// Delete subscriber
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({message: 'Deleted subscriber'})
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// next property = once executed, move onto the next piece of code, preferably request or middleware
// async function to provide middleware for our API
async function getSubscriber(req, res, next) {
    // define our unit variable
    let subscriber
    try {
        // query database to find subscriber by id (from URL - id parameter)
        // Subscriber.findById is a mongoose command 
        subscriber = await Subscriber.findById(req.params.id)
        // if subscriber doesn't exist, give error
        if (subscriber == null) {
            return res.status(400).json({message: 'Cannot find subscriber'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    // set subscriber response to information from await
    res.subscriber = subscriber
    next()
}

module.exports = router