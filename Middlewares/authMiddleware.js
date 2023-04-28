const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

const authMiddleware = (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const { id } = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.userID = id;
        next();
    } catch (error) {
        res.status(401).json({
            status: 0,
            message: "Unauthorized",
        });
    }
};

module.exports = authMiddleware;