const User = require("../Models/userModel")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()

//////////////////// Helper function  //////////////////// 

const genneralAccessToken = (payload) => {
    const access_token = jwt.sign({
        ...payload
    }, process.env.JWT_SECRET, { expiresIn: '30d' })

    return access_token
}

const genneralRefreshToken = (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_SECRET, { expiresIn: '365d' })

    return refresh_token
}



//////////////////// CREATE_USER //////////////////// 

const createUser = async (reqBody) => {

    const { username, email, password } = reqBody
    try {
        const checkUser = await User.findOne({
            email: email
        })
        if (checkUser !== null) {
            return ({
                status: 0,
                message: 'The email is exist already!!'
            })
        }

        const hashPassword = bcrypt.hashSync(password, 10)
        const createdUser = await User.create({
            username,
            email,
            password: hashPassword,
        })
        if (createdUser) {


            return ({
                status: 1,
                message: 'SUCCESS',
                data: {
                    email: createdUser.email,
                    isAdmin: createdUser.isAdmin,
                    username: createdUser.username,
                }
            })
        }
    } catch (err) {
        return (err.message)
    }
}


//////////////////// LOGIN_USER ////////////////////

const loginUser = async (reqBody) => {
    const { email, password } = reqBody

    try {
        const checkUser = await User.findOne({ email: email })
        if (checkUser === null) {
            return ({
                status: 0,
                message: 'Incorrect input'
            })
        }

        const comparePassword = bcrypt.compareSync(password, checkUser.password)
        if (!comparePassword) {
            return ({
                status: 0,
                message: 'Incorrect input'
            })
        }

        const access_token = genneralAccessToken({
            id: checkUser.id,
            username: checkUser.username,
            isAdmin: checkUser.isAdmin
        })

        const refresh_token = genneralRefreshToken({
            id: checkUser.id,
            username: checkUser.username,
            isAdmin: checkUser.isAdmin
        })

        return ({
            status: 1,
            message: 'SUCCESS',
            access_token: `Bearer ${access_token}`,
            refresh_token
        })

    } catch (err) {
        return ({
            status: 0,
            message: err.message
        })
    }
}


//////////////////// REFRESH_NEW_ACCESSTOKEN ////////////////////

const refreshNewAccessToken = (refreshToken) => {
    try {
        const { id, isAdmin } = jwt.verify(refreshToken, process.env.REFRESH_SECRET)

        const access_token = genneralAccessToken({
            id,
            isAdmin,
        })
        return ({
            status: 1,
            message: 'SUCESS',
            access_token
        })

    } catch (err) {
        return ({
            status: 0,
            message: err.message
        })
    }

}


//////////////////// EXPORT ////////////////////

module.exports = { createUser, loginUser, refreshNewAccessToken }