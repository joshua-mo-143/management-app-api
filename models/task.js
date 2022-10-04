// require mongoose
const mongoose = require('mongoose')

// A schema enforces types, required etc. 
// This gives coherence and enforces structure on the database.
const taskSchema = new mongoose.Schema({
        taskName: {
                type: String,
                required: true
        },
        
        taskDesc: {
                type: String,
                required: true

        },
        taskDate: {
                type: Date,
                default: Date.now(),
                required: true
        },

        taskCompleted: {
                type: Boolean,
                default: false,
                required: true
        },

        taskCompletedBy: {
                type: String,
                default: null,
                required: false
        },

        taskOwner: {
                type: String,
                required: true
                
        },


        highPriority: {
                type: Boolean,
                required: true,
                default: false
        },

        projectId: {
                type: String
                
        }
        
}, {collection: 'tasks'})

// expose model; name is 'Subscriber', using the
// subscriberSchema const from this file
module.exports = mongoose.model('Task', taskSchema)