import React, { useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import {Col, Row, ListGroup, Image, Card, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

const OrderScreen = ({match, history}) => {
    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)
  
    const dispatch = useDispatch()
  
    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails
  
    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay
  
    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver
  
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const addDec = (num) => (Math.round(num*100) / 100).toFixed(2)
    if (!loading) {

  
      order.itemsPrice = addDec(
        order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      )
    }
  
    useEffect(() => {
      if (!userInfo) {
        history.push('/login')
      }
  
      const addPayPalScript = async () => {
        const { data: clientId } = await axios.get('/api/config/paypal')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        script.async = true
        script.onload = () => {
          setSdkReady(true)
        }
        document.body.appendChild(script)
      }
  
      if (!order || successPay || successDeliver || order._id !== orderId) {
        dispatch({ type: ORDER_PAY_RESET })
        dispatch({ type: ORDER_DELIVER_RESET })
        dispatch(getOrderDetails(orderId))
      } else if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript()
        } else {
          setSdkReady(true)
        }
      }
    }, [dispatch, orderId, successPay, successDeliver, order])
  
    const successPaymentHandler = (paymentResult) => {

      dispatch(payOrder(orderId, paymentResult))
    }
  
    const deliverHandler = () => {
      dispatch(deliverOrder(order))
    }
  

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
    <><h1>Comanda: <span className='order-id'>{order._id}</span> </h1>
    
    <Row>
               <Col md={8}>
                   <ListGroup variant='flush'>
                       <ListGroup.Item>
                           <h2>Enviament</h2>
                           <p>
                           <span style={{fontWeight: 'bold'}}>Nom: </span>{order.user.name}

                           </p>
                           <p>
                           <span style={{fontWeight: 'bold'}}>Email: </span><a href={`mailto:${order.user.email}`}>{order.user.email}</a>

                           </p>
                           <p>
                               <span style={{fontWeight: 'bold'}}>Adreça: </span>
                               {order.shippingAddress.address},{' '}
                               {order.shippingAddress.city},{' '}
                               {order.shippingAddress.postalCode}{'. '}
                               {order.shippingAddress.country}
                           </p>
                           {order.isDelivered ? 
                            <Message variant='success'>
                                Enviat. ({new Date(order.deliveredAt).toLocaleString()})
                            </Message> : 
                            <Message variant='danger'>
                                No enviat
                            </Message>
                            }
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <h2>Mètode de pagament</h2>
                            <p><span style={{fontWeight: 'bold'}}>Mètode: </span>{order.paymentMethod} </p>
                            {order.isPaid ? 
                            <Message variant='success'>
                                Pagament realitzat. ({new Date(order.paidAt).toLocaleString()})
                            </Message> : 
                            <Message variant='danger'>
                                No s'ha realitzat el pagament
                            </Message>
                            }
                       </ListGroup.Item>

                       <ListGroup.Item>
                           <h2>Articles de la comanda</h2>
                           {order.orderItems.length === 0 ? <Message>La teva comanda està buida</Message> : (
                               <ListGroup variant='flush'>
                                   {order.orderItems.map((item,index) => (
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
                                    <Col>Articles</Col>
                                    <Col>{order.itemsPrice}€</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Enviament</Col>
                                    <Col>{order.shippingPrice}€</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>IVA (21%)</Col>
                                    <Col>{addDec(order.taxPrice)}€</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><span style={{fontWeight: 'bold', fontSize: '1.2em'}}>TOTAL</span></Col>
                                    <Col><span style={{fontWeight: 'bold', fontSize: '1.2em'}}>{addDec(order.totalPrice)}€</span></Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton amount={order.totalPrice}
                                        onSuccess={successPaymentHandler} />
                                    )}
                                </ListGroup.Item>
                            )}
                            {loadingDeliver && <Loader />}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                        Marcar com a enviat
                                    </Button>
                                </ListGroup.Item>
                            )}
                       </ListGroup>
                   </Card>
               </Col>
           </Row>
    </>
}

export default OrderScreen
