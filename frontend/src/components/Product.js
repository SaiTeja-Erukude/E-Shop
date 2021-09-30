import { Card } from "react-bootstrap"
import Rating from "../components/Rating"

const Product = ({ product }) => {
    return (
        <Card className="my-3 p-2">
            <a href={`/product/${product._id}`}>
                <Card.Img src={product.image} variant="top" />

                <Card.Body>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>


                    <Card.Text as="div">
                        <div className="my-3">
                            <Rating value={product.rating} text={product.numReviews}/>
                        </div>
                    </Card.Text>

                    <Card.Text as="div">
                        <h3>${product.price}</h3>
                    </Card.Text>
                </Card.Body>
            </a>
        </Card>
    )
}

export default Product
