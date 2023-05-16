const users = require('../Models/userModel.js')


const getUsers = async () => {
    try {
        const data = await users.find()
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


module.exports = { getUsers }