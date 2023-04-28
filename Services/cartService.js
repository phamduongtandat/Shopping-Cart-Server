
const carts = require('../Models/cartModel.js')
const Product = require('../Models/productModel.js')

//       _____ CREATE _____

const addCart = async (userID, products) => {
    try {
        // const userIDMatching = await users.findOne({ _id: userID })

        // if (!userIDMatching) {
        //     return ({
        //         status: 0,
        //         message: 'Please login correctly',
        //     })
        // }

        const data = await carts.create({ userID, products })

        return ({
            status: 1,
            message: 'SUCCESS',
            data,
        })

    } catch (error) {
        return ({
            status: 0,
            message: error.message
        })
    }
}


//       _____ UPDATE _____

const updateCart = async (userID, products) => {
    let { prodID, type } = products

    if (type === 'delAll') {
        const data = await carts.findOneAndUpdate(
            { userID }, { $set: { products: [] } }, { returnDocument: 'after' }
        )
        return ({
            status: 1,
            message: 'SUCCESS',
            data,
        })
    }

    try {
        const isProdID = await Product.findOne({ _id: prodID })
        if (!isProdID) {
            return ({
                status: 0,
                message: 'No product with this prodID',
            })
        }
        const cart = await carts.findOne({ userID })
        if (!cart) return ({
            status: 0,
            message: 'You have no Cart, please use endpoint addCart',
        })
        const index = cart.products.findIndex(x => x.prodID === prodID)

        if (index === -1) {
            cart.products.push(products)
        } else {
            if (type === 'inc') {
                const qty = cart.products[index].quantity + 1
                cart.products[index] = { prodID, quantity: qty }

            }
            if (type === 'dec') {
                const qty = cart.products[index].quantity - 1
                cart.products[index] = { prodID, quantity: qty }


            }
            if (type === 'del') {
                cart.products.splice(index, 1)
            }

        }

        //other Solution
        // const cart = await carts.findOne({ userID })
        // if ((cart.products.length) === 0) {
        //     cart.products.push(products)
        //     console.log(' cart:', cart.products.length)
        // }

        // let isMatching = false

        // for (i = 0; i < cart.products.length; i++) {
        //     if (cart.products[i].prodID === prodID) {
        //         cart.products[i] = products
        //         isMatching = true
        //     }
        // }

        // if (!isMatching) {
        //     cart.products.push(products)
        // }


        const data = await carts.findOneAndUpdate(
            { userID }, { $set: { products: cart.products } }, { returnDocument: 'after' }
        ).populate('products.prodID', 'image name price _id')




        return ({
            status: 1,
            message: 'SUCCESS',
            data,
        })
    } catch (error) {
        return ({
            status: 0,
            message: error.message
        })
    }
}


//       _____ GET_CART _____

const getCart = async (userID) => {
    try {
        const data = await carts.findOne({ userID }).populate('products.prodID', 'image name price _id')
        if (!data) {
            return ({
                status: 1,
                message: 'User not yet add Cart for any product',
                data: data
            })
        }

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

module.exports = { addCart, updateCart, getCart }