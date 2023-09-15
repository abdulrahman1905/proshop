import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 5000

const app = express()

app.get('/', (req, res) => {
  res.send('ProShop API running')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/product/:id', (req, res) => {
  const productId = req.params.id
  const product = products.find((p) => p._id === productId)
  res.json(product)
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
