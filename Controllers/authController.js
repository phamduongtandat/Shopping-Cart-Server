const authService = require('../Services/authService.js')

//////////////////// REGISTER //////////////////// 

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        let isPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/.test(password)
        if (!email || !password) {
            return res.status(400).json({
                status: 0,
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 0,
                message: 'The input is not email'
            })
        } else if (!isPassword) {
            return res.status(400).json({
                status: 0,
                message: 'The password with minium 6 and maxium 20 letter,including at least 1 upper-case, number and special characters'
            })
        }

        const response = await authService.createUser(req.body)

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


//////////////////// LOG-IN //////////////////// 

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)

        if (!email || !password) {
            return res.status(200).json({
                status: 0,
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 0,
                message: 'The input is email'
            })
        }

        const response = await authService.loginUser(req.body)

        if (response.status === 0) {
            return res.status(401).json(response)
        }

        const { refresh_token, ...newReponse } = response
        res.cookie('refresh_token', `Bearer ${refresh_token}`, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 60 * 1000
        })
        return res.status(200).json({
            status: 1,
            data: { ...newReponse }
        })

    } catch (err) {
        return res.status(401).json({
            status: 0,
            message: err.message
        })
    }
}


//////////////////// REFRESH NEW ACCESS TOKEN ////////////////////

const refreshNewAccessToken = (req, res) => {
    try {

        let refresh_token = req.cookies.refresh_token.split(' ')[1]
        if (!refresh_token) {
            return res.status(401).json({
                status: 0,
                message: 'The refresh_token is required'
            })
        }

        const response = authService.refreshNewAccessToken(refresh_token)
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


//////////////////// LOG-OUT //////////////////// 

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 1,
            message: 'Logout successfully'
        })

    } catch (err) {
        return res.status(400).json({
            status: 0,
            message: 'Logout successfully'
        })
    }
}

//////////////////// EXPORT //////////////////// 
module.exports = { registerUser, loginUser, refreshNewAccessToken }