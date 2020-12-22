import React, { useState } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../redux/actions/itemActions'

function ItemModal() {

    const [modal, setModal] = useState(false)
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    const toggleModal = () => {
        setModal(!modal)
    }

    const onSubmit = e => {
        e.preventDefault()

        const newItem = {
            name
        }

        dispatch(addItem(newItem))
        toggleModal()
    }
    
    return (
        <div>
            {auth.isAuthenticated ? (
                <Button
                    color="dark"
                    style={{ marginBottom: '2rem' }}
                    onClick={toggleModal}
                >Add Item</Button>
            ) : (
                <h4 className="mb-3 mt-4">Please, log in to manage items</h4>
            )}

            <Modal
                isOpen={modal}
                toggle={toggleModal}
            >
                <ModalHeader toggle={toggleModal}>Add To Shopping List</ModalHeader>
                <ModalBody>
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="item">Item</Label>
                            <Input
                                type="text"
                                name="item"
                                id="item"
                                placeholder="Add Shopping Item"
                                onChange={e => setName(e.target.value)}
                            ></Input>
                            <Button
                                color="dark"
                                style={{ marginTop: '2rem' }}
                                block
                            >Add Item</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ItemModal