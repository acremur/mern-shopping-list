import React, { useEffect } from 'react'
import {
    Container, ListGroup, ListGroupItem, Button
} from 'reactstrap'
import { CSSTransition, TransitionGroup} from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import { getItems, deleteItem } from '../redux/actions/itemActions'

function ShoppingList() {

    const items = useSelector(state => state.item.items)
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getItems())
    }, [dispatch])
    
    return (
        <Container>
            <ListGroup>
                <TransitionGroup className="shopping-list">
                    {items.map(({ _id, name }) => (
                        <CSSTransition key={_id} timeout={500} classNames="fade">
                            <ListGroupItem>
                                {auth.isAuthenticated ? (
                                    <Button
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={() => dispatch(deleteItem(_id))}
                                >&times;</Button>
                                ) : null}
                                {name}
                            </ListGroupItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ListGroup>
        </Container>
    )
}

export default ShoppingList