import React, { useState, Fragment } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap'
import RegisterModal from './auth/RegisterModal'
import LoginModal from './auth/LoginModal'
import Logout from './auth/Logout'
import { useSelector } from 'react-redux'

function AppNavBar() {

    const [isOpen, setIsOpen] = useState(false)
    const auth = useSelector(state => state.auth)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const authLinks = (
        <Fragment>
            <NavItem>
                <span className="navbar-text mr-3">
                    <strong>{auth.user ? `Welcome ${auth.user.name}` : ''}</strong>
                </span>
            </NavItem>
            <NavItem><Logout /></NavItem>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <NavItem><RegisterModal /></NavItem>
            <NavItem><LoginModal /></NavItem>
        </Fragment>
    )
    
    return (
        <Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
                <NavbarBrand href="/">Shopping List</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {auth.isAuthenticated ? authLinks : guestLinks}
                        {/* <NavItem><RegisterModal /></NavItem>
                        { auth.isAuthenticated 
                        ? <NavItem><Logout /></NavItem>
                        : <NavItem><LoginModal /></NavItem> } */}
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    )
}

export default AppNavBar