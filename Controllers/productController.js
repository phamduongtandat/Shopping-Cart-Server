const productService = require('../Services/productService.js')

//       _____  CREATE_PRODUCT  _____ 

const createProduct = async (req, res) => {

    try {
        const { name, image, type, price, countInStock, rating, desc, discount, selled } = req.body
        if (!name || !image || !type || !price || !countInStock || !rating || !desc || !discount || !selled) {
            return res.status(400).json({
                status: 0,
                message: 'The input is required',
            })
        }
        const response = await productService.createProduct(req.body)

        if (response.status === 0) {
            return res.status(400).json(response)
        }

        res.status(200).json(response)

    } catch (err) {
        return res.status(404).json({
            status: 0,
            message: err.message
        })
    }
}


//       _____  GET_PRODUCT  _____ 

const getProducts = async (req, res) => {
    try {
        // const { limit, page, sort, filter } = req.query
        // const response = await ProductService.getAllProduct(Number(limit) || null, Number(page) || 0, sort, filter)
        const response = await productService.getProducts()
        return res.json(response)
    } catch (err) {
        return res.status(400).json({
            status: 0,
            message: err.message
        })
    }
}


//       _____  GET_PRODUCT_DETAIL  _____

const getProductDetail = async (req, res) => {
    try {
        const { id } = req.params
        const response = await productService.getProductDetail(id)
        if (response.status === 0) {
            return res.status(404).json(response)
        }
        res.status(200).json(response)
    } catch (err) {
        return res.status(400).json({
            status: 0,
            message: err.message
        })
    }
}




//       _____  EXPORT  _____ 

module.exports = { createProduct, getProducts, getProductDetail }