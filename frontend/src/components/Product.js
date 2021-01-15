import React from 'react'

import {Link} from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'


const Product = ({product}) => {


    const styled = {
        maxWidth: '20em',

    }
    //Calculate Prices
    const addDec = (num) => (Math.round(num*100) / 100).toFixed(2)
    const price = addDec(product.price)
    return (
        <Card className='my-3 p-3 rounded card' style={{border: '1.5px solid lightgrey', boxShadow: '0px 0px 25px grey'}}>
            <Link to={`/product/${product._id}`} style={{margin: 'auto'}}>
                <Card.Img src={product.image} variant='top' style={styled} />
            </Link>
            <Card.Body>
            <Link to={`/product/${product._id}`}>
                <Card.Title as='div'><span style={{fontWeight: 'bold'}} className='product-name'>{product.name}</span></Card.Title>
            </Link>
            <Card.Text as='div'>
                <Rating 
                value={product.rating}
                text={`${product.numReviews} ${product.numReviews === 1 ? 'ressenya' : 'ressenyes'}`}
                fontSize={'12px'} />
            </Card.Text>
            <Card.Text as='h3'>{price}€</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
