// require mongoose
const mongoose = require('mongoose')

// A schema enforces types, required etc. 
// This gives coherence and enforces structure on the database.
const teamSchema = new mongoose.Schema({
        teamName: {
                type: String,
                required: true
        },

        teamCreatedAt: {
                type: Date,
                default: Date.now(),
                required: true
        },
        teamOwner: {
                type: String,
                required: true
                
        },

        projects: [{
                projectId: String
        }],
        
        teamMembers: [{
            memberName: String,
            joinedAt: {
                type: Date,
                default: Date.now(),
                required: true  
            }
        }]


}, {collection: 'teams'})

// expose model; name is 'Subscriber', using the
// subscriberSchema const from this file
module.exports = mongoose.model('Team', teamSchema)