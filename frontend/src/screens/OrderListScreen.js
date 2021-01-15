import React, {useEffect} from 'react'
/* import {Link} from 'react-router-dom' */
import {Table, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {LinkContainer} from 'react-router-bootstrap'
import {listOrders} from '../actions/orderActions'

const OrderListScreen = ({history}) => {
    
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const {error,loading,orders} = orderList
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        }else{
            history.push('/login')
        }

    }, [dispatch, history, userInfo])

    return (
        <>
         <h1>Comandes</h1>
         {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
             <Table className='table-sm text-center' striped bordered hover responsive>
                 <thead>
                     <tr>
                         <th>ID</th>
                         <th>USUARI</th>
                         <th>DATA</th>
                         <th>TOTAL</th>
                         <th>PAGAT</th>
                         <th>ENVIAT</th>
                         <th></th>
                     </tr>
                 </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>{order.totalPrice}€</td>
                            <td>{order.isPaid ? <span className='success-mark'>{order.paidAt.substring(0,10)}</span> : (<i className='fas fa-times text-danger'></i>)}</td>
                            <td>{order.isDelivered ? <span className='success-mark'>{order.deliveredAt.substring(0,10)}</span> : (<i className='fas fa-times text-danger'></i>)}</td> 
                            <td>
                            <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant='info' className='btn-sm'>
                                        Detalls
                                    </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
             </Table>
         )}   
        </>
    )
}

export default OrderListScreen
