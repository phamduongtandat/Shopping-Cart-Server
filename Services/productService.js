const products = require("../Models/productModel.js")




//       _____  CREATE_PRODUCT  _____ 

const createProduct = async (reqBody) => {
    const { name, image, type, countInStock, price, rating, desc, discount } = reqBody
    try {
        const checkProduct = await products.findOne({
            name
        })
        if (checkProduct !== null) {
            return ({
                status: 0,
                message: 'The name of product is exist'
            })
        }

        const newProduct = await products.create({
            name,
            image,
            type,
            countInStock: Number(countInStock),
            price,
            rating,
            desc,
            discount: Number(discount),
        })

        if (newProduct) {
            return ({
                status: 1,
                message: 'SUCCESS',
                data: newProduct
            })
        }
    } catch (err) {
        return ({
            status: 0,
            message: err.message,
        })
    }
}


//       _____  GET_PRODUCT  _____ 

const getProducts = async () => {
    try {
        const data = await products.find()
        return ({
            status: 1,
            message: 'SUCCESS',
            data: data
        })

    } catch (err) {
        return ({
            status: 0,
            message: err.message,
        })
    }
}


//       _____  GET_DETAIL  _____ 

const getProductDetail = async (id) => {
    try {
        const detail = await products.findById(id)
        if (detail === null) {
            return ({
                status: 0,
                message: 'Not found detail',
                data: detail
            })
        }
        return ({
            status: 1,
            message: 'SUCCESS',
            data: detail
        })
    } catch (err) {
        return ({
            status: 0,
            message: err.message,
        })
    }
}

//       _____ UPDATE _____

const updateProduct = async (id, data) => {
    try {
        const checkProduct = await products.findById(id)
        if (checkProduct === null) {
            return ({
                status: 0,
                message: 'The product is not defined'
            })
        }

        const updatedProduct = await products.findByIdAndUpdate(id, data, { new: true })
        return ({
            status: 1,
            message: 'SUCCESS',
            data: updatedProduct
        })
    } catch (err) {
        return ({
            status: 0,
            message: err.message,
        })
    }
}


//       _____ DELETE _____

const deleteProduct = async (id) => {
    try {
        const checkProduct = await products.findOne({
            _id: id
        })
        if (checkProduct === null) {
            return ({
                status: 0,
                message: 'The product is not defined'
            })
        }

        await products.findByIdAndDelete(id)
        return ({
            status: 1,
            message: 'Delete product success',
        })
    } catch (err) {
        return ({
            status: 0,
            message: err.message,
        })
    }
}

//       _____  EXPORT  _____ 

module.exports = { createProduct, getProducts, getProductDetail, updateProduct, deleteProduct }