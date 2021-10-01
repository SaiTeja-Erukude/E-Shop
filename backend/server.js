import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import colors from 'colors'

import connectDB from './config/db.js'
import products from '../backend/data/products.js'

const app = express()

app.use(express.json());
app.use(cors());
dotenv.config()

connectDB()

app.get('/', (req, res) => {
    res.send('Hi from ProShop backend')
})

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    res.json(product)
})

const port = process.env.PORT || 5000

app.listen(port, console.log(`Listening at port ${port}..`.cyan.bold))