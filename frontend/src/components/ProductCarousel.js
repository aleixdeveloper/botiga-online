import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import {getTheme} from '../actions/themeActions'

const ProductCarousel = () => {

    const dispatch = useDispatch()

    const listTheme = useSelector((state) => state.getTheme)
    const { loading:loadingTheme, theme } = listTheme
    
    const productTopRated = useSelector((state) => state.productTopRated)
    const { loading, error, products} = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
        dispatch(getTheme())
    },[dispatch])
    console.log('back:', theme.background)
    return loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (
            <div className='hide-carousel' style={{margin: '2em 2.5em 5em 2.5em'}}>
                <Carousel pause='hover' className='bg-dark carousel-background'  style={{background: theme.background}}>
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
