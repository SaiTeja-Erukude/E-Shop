import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'

const App = () => {
    return (
        <Router>
            <Header />
            <main className='py-3'>
                <Container>
                    <Route path='/' exact component={HomeScreen} />
                    <Route path='/register' exact component={RegisterScreen} />
                    <Route path='/login' exact component={LoginScreen} />
                    <Route path='/profile' exact component={ProfileScreen} />
                    <Route path='/product/:id' component={ProductScreen} />
                    <Route path='/cart/:id?' component={CartScreen} />
                    <Route path='/shipping' component={ShippingScreen} />
                    <Route path='/payment' component={PaymentScreen} />
                </Container>
            </main>
            <Footer />
        </Router>
    )
}

export default App
