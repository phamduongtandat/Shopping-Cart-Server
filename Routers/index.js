const { userRouter } = require('./userRouter.js')
const { authRouter } = require('./authRouter.js')
const { productRouter } = require('./productRouter.js')
const { cartRouter } = require('./cartRouter.js')


const routers = (app) => {

    app.get('/', (req, res) => {
        res.status(202).send('HomePage')
    })
    app.use('/api/v1/users', userRouter)
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/product', productRouter)
    app.use('/api/v1/cart', cartRouter)

}
module.exports = routers