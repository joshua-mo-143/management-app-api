// require mongoose
const mongoose = require('mongoose')

// A schema enforces types, required etc. 
// This gives coherence and enforces structure on the database.
const projectSchema = new mongoose.Schema({
        projectName: {
                type: String,
                required: true
        },

        projectCreatedAt: {
                type: Date,
                default: Date.now(),
                required: true
        },
        projectOwner: {
                type: String,
                required: true
                
        },

        projectBrief: {
            type: String,
            required: true
        },

        highPriority: {
            type: Boolean,
            required: true,
            default: false
        },

        projectDeadline: {
            type: Date,
            default: null
        },

        assignedTeamId: {
            type: String,
            required: true
        },

        projectMembers: [{
            memberName: String,
            joinedAt: {
                type: Date,
                 default: Date.now(),
                required: true  
            }
        }],

        tasks: [{
            taskId: String
        }]

}, {collection: 'projects'})

// expose model; name is 'Subscriber', using the
// subscriberSchema const from this file
module.exports = mongoose.model('Project', projectSchema)