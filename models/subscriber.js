// require mongoose
const mongoose = require('mongoose')

// A schema enforces types, required etc. 
// This gives coherence and enforces structure on the database.
const subscriberSchema = new mongoose.Schema({
        name: {
type: String,
required: true
        },
        subscribedChannel: {
            type: String,
required: true

        },
        subscribeDate: {
            type: Date,
            default: Date.now(),
            required: true
        }
})

// expose model; name is 'Subscriber', using the
// subscriberSchema const from this file
module.exports = mongoose.model('Subscriber', subscriberSchema)