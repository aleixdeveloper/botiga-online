import React, { useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button, Col, Row, ListGroup, Image, Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = ({history}) => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    //Calculate Prices
    const addDec = (num) => (Math.round(num*100) / 100).toFixed(2)


    cart.itemsPrice = addDec(cart.cartItems.reduce((acc, item) => acc+item.price * item.qty, 0))
    //Enviament: Si la comanda supera els 100€ es free.
    cart.shippingPrice = addDec(cart.itemsPrice > 100 ? 0 : 10)
    cart.taxPrice = addDec(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (Number(cart.itemsPrice) +  Number(cart.shippingPrice) +  Number(cart.taxPrice)).toFixed(2)

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, success, error} = orderCreate

    useEffect(() => {
        if(success){
            history.push(`order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }
    return (
        <>
           <CheckoutSteps step1 step2 step3 step4/>
           <Row>
               <Col md={8}>
                   <ListGroup variant='flush'>
                       <ListGroup.Item>
                           <h2>Enviament</h2>
                           <p>
                               <span style={{fontWeight: 'bold'}}>Adreça: </span>
                               {cart.shippingAddress.address},{' '}
                               {cart.shippingAddress.city},{' '}
                               {cart.shippingAddress.postalCode}{'. '}
                               {cart.shippingAddress.country}
                           </p>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <h2>Mètode de pagament</h2>
                            <p><span style={{fontWeight: 'bold'}}>Mètode: </span>{cart.paymentMethod}</p>



                       </ListGroup.Item>

                       <ListGroup.Item>
                           <h2>Comanda</h2>
                           {cart.cartItems.length === 0 ? <Message>La teva cistella està buida</Message> : (
                               <ListGroup variant='flush'>
                                   {cart.cartItems.map((item,index) => (
                                       <ListGroup.Item key={index}>
                                           <Row>
                                               <Col md={2}>
                                                   <Image src={item.image} alt={item.name} fluid rounded />
                                               </Col>
                                               <Col md={6}>
                                                   <Link to={`/product/${item.product}`}>
                                                       {item.name}
                                                   </Link>
                                               </Col>
                                               <Col md={4}>
                                                   {item.qty} x {item.price}€ = {item.qty*item.price}€
                                               </Col>
                                           </Row>
                                       </ListGroup.Item>
                                   ) )}
                               </ListGroup>
                           )}
                           <p>
                           </p>
                       </ListGroup.Item>
                   </ListGroup>
               </Col>
               <Col md={4}>
                   <Card>
                       <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Resum de la comanda</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>{cart.itemsPrice}€</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Enviament</Col>
                                    <Col>{cart.shippingPrice}€</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>IVA (21%)</Col>
                                    <Col>{cart.taxPrice}€</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><span style={{fontWeight: 'bold', fontSize: '1.2em'}}>TOTAL</span></Col>
                                    <Col><span style={{fontWeight: 'bold', fontSize: '1.2em'}}>{cart.totalPrice}€</span></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Button 
                            type='button' 
                            className='btn-block' 
                            disabled={cart.cartItems === 0}
                            onClick={placeOrderHandler}>Efectuar la comanda</Button>
                            </ListGroup.Item>

                       </ListGroup>
                   </Card>
               </Col>
           </Row>
        </>
    )
}

export default PlaceOrderScreen
