const router = require('express').Router()
const productController = require('../Controllers/productController.js')

router.get("/", productController.getProducts)
router.get("/:id", productController.getProductDetail)
router.post("/", productController.createProduct)



module.exports = { productRouter: router }