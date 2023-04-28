const cartServive = require('../Services/cartService')





//       _____ CREATE _____

const addCart = async (req, res) => {
    try {
        const userID = req.userID
        const products = req.body

        const response = await cartServive.addCart(userID, products)

        if (response.status === 0) return res.status(400).json(response)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(400).json({
            status: 0,
            message: error.message
        })
    }
}


//       _____ UPDATE _____

const updateCart = async (req, res) => {
    try {
        const userID = req.userID
        const products = req.body
        const response = await cartServive.updateCart(userID, products)
        if (response.status === 0) {
            return res.status(400).json(response)
        }
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({
            status: 0,
            message: error.message
        })
    }
}


//       _____ GET_CART _____

const getCart = async (req, res) => {
    try {
        const userID = req.userID
        const response = await cartServive.getCart(userID)
        if (response.status === 0) {
            return res.status(400).json(response)
        }
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({
            status: 0,
            message: error.message
        })
    }
}

module.exports = { getCart, addCart, updateCart, getCart }

