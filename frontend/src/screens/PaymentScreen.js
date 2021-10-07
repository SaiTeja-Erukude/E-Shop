import { useState } from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'  className='mb-3'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit card'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            onChange={(e)=>setPaymentMethod(e.target.value)}
                            className='mb-5'
                        ></Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
