import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @Access  Public
const getProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
                  $options: 'i',
              },
          }
        : {}

    const products = await Product.find({ ...keyword })
    res.json(products)
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @Access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found!')
    }
})

// @desc    Delete a product
// @route   DEL /api/products/:id
// @Access  Private & Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({ message: 'Product removed!' })
    } else {
        res.status(404)
        throw new Error('Product not found!')
    }
})

// @desc    Create a product
// @route   POST /api/products/
// @Access  Private & Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        user: req.user._id,
        name: 'sample name',
        image: '/images/sample.png',
        brand: 'sample brand',
        category: 'sample category',
        description: 'sample desc',
        price: 0,
        countInStock: 0,
        numReviews: 0,
    })

    const createdProduct = await product.save()
    if (createdProduct) {
        res.status(201).json(createdProduct)
    } else {
        res.status(500)
        throw new Error('Unable to create a product')
    }
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @Access  Private & Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } =
        req.body

    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        if (updatedProduct) {
            res.json(updatedProduct)
        } else {
            res.status(500)
            throw new Error('Unable to update the product')
        }
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Review a product
// @route   POST /api/products/:id/reviews
// @Access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        )

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating =
            product.reviews.reduce((acc, item) => acc + item.rating, 0) /
            product.reviews.length

        const updatedProduct = await product.save()
        if (updatedProduct) {
            res.status(201)
            res.json({ message: 'Review Added' })
        } else {
            res.status(500)
            throw new Error('Unable to add review')
        }
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @Access  Public
const getTopRatedProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)

    res.json(products)
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopRatedProducts,
}
