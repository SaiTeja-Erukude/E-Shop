import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @Access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    if (orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const createdOrder = await Order.create({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })
        res.status(201).json(createdOrder)
    }
})

// @desc    Get an order by ID
// @route   GET /api/orders/:id
// @Access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    )

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found!')
    }
})

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @Access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }

        const updatedUser = await order.save()

        res.json(updatedUser)
    } else {
        res.status(404)
        throw new Error('Order not found!')
    }
})

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @Access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
})

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders }
