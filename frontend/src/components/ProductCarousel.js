import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {

    const dispatch = useDispatch()

    const productTopRated = useSelector((state) => state.productTopRated)
    const { loading, error, products} = productTopRated
    const randomNumber = Math.floor(Math.random()*2);
    const [color,setColor] = useState({
        background: 'linear-gradient(20deg, #167ddd 30%, #12e3ff 90%)'
    })
    
    const colors = [
        {
            background: 'linear-gradient(20deg, #167ddd 30%, #12e3ff 90%)'
        },
        {
            background: 'linear-gradient(to right, #40E0D0, #FF8C00, #FF0080)'
        },
        /*
        {
            background: 'linear-gradient(20deg, #11998e 30%, #38ef7d 90%)'

        },
        {
            background: 'linear-gradient(20deg, #000046 30%, #1cb5e0 90%)'

        },
        {
            background: 'linear-gradient(20deg, #80d0c7 30%, #13547a 90%)'

        },

        {
            background: 'linear-gradient(to right, #57EDFF, #608A51, #FF8502)'

        },
        {
            background: 'linear-gradient(20deg, #23074d 30%, #cc5333 90%)'

        },
        {
            background: 'linear-gradient(to right, #1a2a6c, #b21f1f, #fdbb2d)'

        },
        {
            background: 'linear-gradient(to right, #5433ff, #20bdff, #a5fecb)'

        }*/

        
    ]
    useEffect(() => {
        dispatch(listTopProducts())
        setColor(colors[randomNumber])

    },[dispatch])


    return loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (
            <div className='hide-carousel' style={{marginBottom: '4em'}}>
                <Carousel pause='hover' className='bg-dark carousel-background' style={color}>
                {products.map((product) => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image src={product.image} alt={product.name} />
                            <Carousel.Caption className='carousel-caption'>
                                <h3 style={{color: 'white'}}>{product.name} ({product.price}€)</h3>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ) )}
            </Carousel>
            </div>
        )
}

export default ProductCarousel
