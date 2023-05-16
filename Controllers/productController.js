const productService = require('../Services/productService.js')

//       _____  CREATE_PRODUCT  _____ 

const createProduct = async (req, res) => {

    try {
        const { name, image, type, price, countInStock, rating, desc, discount, selled } = req.body
        if (!name || !image || !type || !price || !countInStock || !rating || !desc || !discount) {
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

//       _____ UPDATA _____

const updateProduct = async (req, res) => {
    try {

        const productId = req.params.id
        const data = req.body
        if (!productId) {
            return res.status(400).json({
                status: 0,
                message: 'The productId is required'
            })
        }

        const response = await productService.updateProduct(productId, data)
        if (response.status === 0) {
            return res.status(400).json(response)
        }
        return res.status(200).json(response)
    } catch (err) {
        return res.status(400).json({
            status: 0,
            message: err.message
        })
    }
}


//       _____ DELETE _____

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(400).json({
                status: 0,
                message: 'The productId is required'
            })
        }
        const response = await productService.deleteProduct(productId)

        if (response.status === 0) {
            return res.status(400).json(response)
        }

        return res.status(200).json(response)
    } catch (err) {
        return res.status(400).json({
            status: 0,
            message: err.message
        })
    }
}

//       _____  EXPORT  _____ 

module.exports = { createProduct, getProducts, getProductDetail, updateProduct, deleteProduct }