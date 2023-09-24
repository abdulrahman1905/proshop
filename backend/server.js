import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDb from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

const port = process.env.PORT || 5000

connectDb()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('ProShop API running')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
