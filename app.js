const express = require('express');
const connectDB = require('./Database/connect');
require('dotenv').config()
const defaultErrorHandler = require('./Errorhandlers/defaultErrorHandler')
const cors = require('cors')

const app = express()

//Middlewares
app.use(express.json())
app.use(cors())

//Import routers
const essayRoute = require('./Routers/Essays')

//Routes
app.use('/essays', essayRoute)

//Default error handler middleware
app.use(defaultErrorHandler)

//Post react build code when deploying
if(process.env.NODE_ENV === 'production'){
    //set static assets
    app.use(express.static('./client/build'))

    //Provides front end
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname,'client','build', 'index.html'))
    })
}

//All request handler
app.use('*', (req, res)=>{
    res.status(404).send('No routers available')
})

const PORT = process.env.PORT || 5000

const startServer = async() =>{
    try{
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, console.log('Server started'))
    }catch(err){
        console.log(err)
    }
}

startServer()