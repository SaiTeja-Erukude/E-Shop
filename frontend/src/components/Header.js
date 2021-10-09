import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { Route } from 'react-router-dom'
import SearchBox from './SearchBox'

const Header = () => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.userLogin)

    const logoutHandler = () => {
        dispatch(logout())
    }

    let loggedIn = false
    try {
        if (userInfo.name) {
            loggedIn = true
        }
    } catch (error) {
        loggedIn = false
    }

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </LinkContainer>
                    <Route render={({history}) => <SearchBox history={history}/>}/>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse
                        id='basic-navbar-nav'
                        className='justify-content-end'
                    >                        
                        <Nav>
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <i className='fas fa-shopping-cart'></i>{' '}
                                    Cart
                                </Nav.Link>
                            </LinkContainer>
                            {loggedIn ? (
                                <NavDropdown
                                    id='username'
                                    title={userInfo.name}
                                >
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <i className='fas fa-user'></i> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown id='admin' title='Admin'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>
                                            Users
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>
                                            Products
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>
                                            Orders
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
