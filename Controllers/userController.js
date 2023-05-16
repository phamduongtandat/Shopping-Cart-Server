const userService = require('../Services/userService.js')

const getUsers = async (req, res) => {
    try {
        // const { limit, page, sort, filter } = req.query
        // const response = await ProductService.getAllProduct(Number(limit) || null, Number(page) || 0, sort, filter)
        const response = await userService.getUsers()
        return res.json(response)
    } catch (err) {
        return res.status(400).json({
            status: 0,
            message: err.message
        })
    }
}

module.exports = { getUsers }