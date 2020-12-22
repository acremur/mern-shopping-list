import React, { useState, useEffect } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/actions/authActions'
import { clearErrors } from '../../redux/actions/errorActions'

function LoginModal() {

    const [modal, setModal] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)
    const dispatch = useDispatch()
    const error = useSelector(state => state.error)
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        if (error) {
            // Check for register error
            if (error.id === 'LOGIN_FAIL') {
                setErrorMsg(error.msg.msg)
            } else {
                setErrorMsg(null)
            }
        }   
    }, [error])

    useEffect(() => {
        // If authenticated, close modal
        if (modal) {
            if (auth.isAuthenticated) {
                toggleModal()
            }
        }
        // eslint-disable-next-line
    }, [auth])

    const toggleModal = () => {
        // Clear errors
        dispatch(clearErrors())
        
        setModal(!modal)
    }

    const onSubmit = e => {
        e.preventDefault()

        const user = { email, password }

        // Attemp to login
        dispatch(login(user))
    }
    
    return (
        <div>
            <NavLink onClick={toggleModal} href="#">
                Login
            </NavLink>

            <Modal
                isOpen={modal}
                toggle={toggleModal}
            >
                <ModalHeader toggle={toggleModal}>Login</ModalHeader>
                <ModalBody>
                    { errorMsg ? <Alert color="danger">{errorMsg}</Alert> : null }
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                className="mb-3"
                                name="email"
                                id="email"
                                placeholder="Email"
                                onChange={e => setEmail(e.target.value)}
                            ></Input>

                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                            ></Input>
                            
                            <Button
                                color="dark"
                                style={{ marginTop: '2rem' }}
                                block
                            >Login</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default LoginModal