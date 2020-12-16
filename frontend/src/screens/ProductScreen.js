import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({history,match}) => {


    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState('0')
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {error:errorProductReview, success:successProductReview} = productReviewCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {

        if(successProductReview){
            //alert('Ressenya afegida!')
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }

        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match, successProductReview])


    const addDec = (num) => (Math.round(num*100) / 100).toFixed(2)
    const price = addDec(product.price)

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating, comment
        }))
    }

    return (
        <>

        <Link className='btn btn-primary my-3' to='/'><i className="fas fa-long-arrow-alt-left"></i>&nbsp;Tornar</Link>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <>
        <Meta title={product.name} description={product.description} keywords={product.category} />
            <Row>
            <Col sm={12} md={12} lg={4}>
                <Image src={product.image} alt={product.name} fluid></Image>
            </Col>
            <Col lg={4}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} ${product.numReviews === 1 ? 'ressenya' : 'ressenyes'}`} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span style={{
                            fontWeight: 'bold',
                            textDecoration: 'underline'}}>Preu:</span> {price}€
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span style={{
                            fontWeight: 'bold',
                            textDecoration: 'underline'}}>
                                Descripció:</span> {product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col lg={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <span style={{fontWeight: 'bold'}}>Preu:</span>
                                </Col>
                                <Col>
                                <strong>{product.price}€</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <span style={{fontWeight: 'bold'}}>Estat:</span>
                                </Col>
                                <Col>
                                {product.countInStock > 0 ? 'En Stock' : 'Sense Stock'}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <span style={{fontWeight: 'bold'}}>Quantitat:</span>
                                    </Col>
                                    <Col>
                                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                            {[...Array(product.countInStock).keys()].map(x => (
                                                <option key={x+1} value={x+1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}
                        <ListGroup.Item>
                            <Button 
                            onClick={addToCartHandler}
                            className="btn-block" type="button" disabled={product.countInStock===0}>
                                Afegir a la cistella
                            </Button>
                        </ListGroup.Item> 
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        <Row className="my-5">
            <Col md={6}>
                <h2>Ressenyes</h2>
                {product.reviews.length === 0 && <Message variant='info'>No hi ha ressenyes d'aquest producte</Message>}
                <ListGroup variant='flush'>
                    {product.reviews.map(review => (
                        <ListGroup.Item key={review._id}>
                            <p>{review.name}</p>
                            <Rating value={review.rating} />
                            <p>{review.createdAt.substring(0,10)}</p>
                            <p>{review.comment}</p>
                        </ListGroup.Item>
                    ))}
                <ListGroup.Item>
                    <h2>Escriu una ressenya com a client</h2>
                    {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                    {userInfo ? (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                            <Form.Label>Qualificació</Form.Label>
                            <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                <option value=''>Selecciona...</option>
                                <option value='1'>1 - Molt Malament</option>
                                <option value='2'>2 - Malament</option>
                                <option value='3'>3 - Bé</option>
                                <option value='4'>4 - Molt bé</option>
                                <option value='5'>5 - Excel·lent</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                            <Form.Label>Comentari</Form.Label>
                            <Form.Control as='textarea' rows='5' value={comment} onChange={(e) => setComment(e.target.value)}>
                               
                            </Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary'>Envia</Button>
                    </Form>) : 
                    <Message>Accedeix a la <Link to={'/login'} style={{fontWeight: 'bold'}}>zona clients</Link> per deixar una ressenya</Message>}
                </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
        </>
        )}
        </>
    )
}

export default ProductScreen
