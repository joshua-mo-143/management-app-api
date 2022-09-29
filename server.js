// dependencies
require('dotenv').config();

const express = require('express')
const app = express()
const sessions = require('express-session')

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const passport = require('passport')
const morgan = require('morgan')

const cors = require('cors')
app.use(cors())


// connect to db
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

// provide error msg if error, if not, connected to server
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to server'))

const users = [ ]
// accept express json
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized:true,
    cookie: { maxAge: 86400000 },
    resave: false 
}));

app.use(passport.initialize())
app.use(passport.session())

const taskRouter = require('./routes/tasks')
app.use('/tasks', passport.authenticate('jwt', {session: false}), taskRouter)

const authRouter = require('./routes/auth')
app.use('/auth', authRouter)

const registerRouter = require('./routes/register')
app.use('/register', registerRouter)

app.listen(3000, () => console.log("Server started"));