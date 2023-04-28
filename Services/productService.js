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



//       _____  EXPORT  _____ 

module.exports = { createProduct, getProducts, getProductDetail }