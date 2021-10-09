import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Rating from '../components/Rating'

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-2'>
            <Link to={`/product/${product._id}`}>
                <Card.Img
                    src={product.image}
                    variant='top'
                    className='card-img'
                />

                <Card.Body>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>

                    <Card.Text as='div'>
                        <div className='my-3'>
                            <Rating
                                value={product.rating}
                                text={product.numReviews}
                            />
                        </div>
                    </Card.Text>

                    <Card.Text as='div'>
                        <h3>${product.price}</h3>
                    </Card.Text>
                </Card.Body>
            </Link>
        </Card>
    )
}

export default Product
