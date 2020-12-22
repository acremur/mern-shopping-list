import React, { Fragment } from 'react'
import { NavLink } from 'reactstrap'
import { logout } from '../../redux/actions/authActions'
import { useDispatch } from 'react-redux'

function Logout() {

    const dispatch = useDispatch()
    
    return (
        <Fragment>
            <NavLink onClick={() => dispatch(logout())} href="#">
                Logout
            </NavLink>
        </Fragment>
    )
}

export default Logout