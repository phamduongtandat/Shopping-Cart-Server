const express = require('express')
const routers = require('./Routers/index.js')
const cors = require('cors')
const { config } = require('dotenv')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
config()
const app = express()

//connect DB
mongoose.connect(process.env.MONGODB_URL)
    .then(() => { console.log('DB connected') })

//middlewares for express
app.use(cors({ credentials: true, origin: 'https://shopping-cart-client.vercel.app' }))
app.use(express.json())
app.use(cookieParser())

//Routers of Server
routers(app)

//Connect Server with PORT
app.listen(process.env.PORT, () => {
    console.log(`Server is running with port ${process.env.PORT}`)
})
