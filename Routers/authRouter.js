const router = require('express').Router()
const authController = require('../Controllers/authController.js')

router.post("/sign-up", authController.registerUser)
router.post("/log-in", authController.loginUser)
router.post('/refresh-token', authController.refreshNewAccessToken)
//router.post("/log-out", userController.logoutUser)

module.exports = { authRouter: router }

