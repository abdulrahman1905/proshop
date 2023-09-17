import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

const port = process.env.PORT || 5000

connectDb()

const app = express()

app.get('/', (req, res) => {
  res.send('ProShop API running')
})

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
