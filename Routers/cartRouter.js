const router = require('express').Router()
const cartController = require('../Controllers/cartController.js')
const authMiddleware = require('../Middlewares/authMiddleware.js')


router.get("/", cartController.getCart)
router.post("/add-cart", authMiddleware, cartController.addCart)
router.put("/update-cart", authMiddleware, cartController.updateCart)
router.get("/get-cart", authMiddleware, cartController.getCart)
//router.delete(" ",authMiddleware, )




module.exports = { cartRouter: router }