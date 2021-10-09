import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Image, Carousel } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { getTopProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector((state) => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(getTopProducts())
    }, [dispatch])

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <Carousel pause='hover' className='bg-dark'>
            {products.map((product) => (
                <Carousel.Item key={product._id} className='text-center'>
                    <Link to={`/product/${product._id}`} >
                        <Image src={product.image} alt={product.name} fluid className='mx-auto'/>
                        <Carousel.Caption className='carousel-caption'>
                            <h3>{product.name} (${product.price})</h3>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductCarousel
