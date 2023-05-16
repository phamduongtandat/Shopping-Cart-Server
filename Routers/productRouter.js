const router = require('express').Router()
const productController = require('../Controllers/productController.js')

router.get("/", productController.getProducts)
router.get("/:id", productController.getProductDetail)
router.put('/:id', productController.updateProduct)
router.post("/", productController.createProduct)
router.delete('/:id', productController.deleteProduct)


module.exports = { productRouter: router }