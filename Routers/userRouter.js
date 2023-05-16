const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController.js')

router.get("/", userController.getUsers)



module.exports = { userRouter: router }