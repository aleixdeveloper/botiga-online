import React from 'react'
import {Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {logout} from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = () => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo } = userLogin

    const logoutHandler = () => {
      dispatch(logout())
    }

    return (
        <header>
           <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
               <Container>
               <LinkContainer to='/'>
                 <Navbar.Brand>Botiga Online</Navbar.Brand>
               
               </LinkContainer>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">

      <Route render={({history}) => <SearchBox history={history} />} />

    <Nav className="ml-auto">
    <LinkContainer to='/cart'>
    <Nav.Link><i className="fas fa-shopping-cart"></i>&nbsp;Cistella {cartItems.length > 0 && (<span>({cartItems.length})</span>)}</Nav.Link>

      </LinkContainer>
      {userInfo ? 
      (
        <NavDropdown title={userInfo.name} id="username">
          <LinkContainer to='/profile'>
          <NavDropdown.Item>Perfil</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={logoutHandler}>Tanca sessió</NavDropdown.Item>
          </NavDropdown>
      ) : 
      (
        <LinkContainer to='/login'>
          <Nav.Link><i className="fas fa-user"></i>&nbsp;Inicia sessió</Nav.Link>
        </LinkContainer>
      )}
      {userInfo && userInfo.isAdmin && (        
      <NavDropdown title={'Admin'} id="adminMenu">
          <LinkContainer to='/admin/userlist'>
          <NavDropdown.Item>Usuaris</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to='/admin/productlist'>
          <NavDropdown.Item>Productes</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to='/admin/orderlist'>
          <NavDropdown.Item>Comandes</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={logoutHandler}>Tanca sessió</NavDropdown.Item>
          </NavDropdown>) }
    </Nav>
  </Navbar.Collapse>
  </Container>

</Navbar>
        </header>
    )
}

export default Header
