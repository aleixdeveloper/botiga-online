import React, {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


const ProductEditScreen = ({match, history}) => {

    const productId = match.params.id;

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails;

    const productUpdate = useSelector(state => state.productUpdate)
    const {loading:loadingUpdate, error:errorUpdate,  success:successUpdate} = productUpdate;

    useEffect(() => {

        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }else{ 

            if(!product.name || product._id !== productId){
                dispatch(listProductDetails(productId))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCountInStock(product.countInStock)
                setCategory(product.category)
                setDescription(product.description)
            }
        }
    },[product, dispatch, productId, history, successUpdate])


    const uploadFileHandler = async (e) => {
        const file  = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try{

            const config = {

                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }  

            const { data } = await axios.post('/api/upload', formData, config)
            
            setImage(data)
            setUploading(false)
        }catch(error){
            console.error(error)
            setUploading(false)
        }


    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }))
    }   



    return (
        <>
        <Link className='btn btn-info my-3' to={'/admin/productlist'}><i className="fas fa-long-arrow-alt-left"></i>&nbsp;Tornar</Link>
        <FormContainer className="container-registrat">
            <h1>Editar producte</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                    <Form.Label>Nom</Form.Label>
                    <Form.Control 
                    type='name'
                    placeholder='Introdueix el nom'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                    <Form.Label>Preu</Form.Label>
                    <Form.Control 
                    type='number'
                    placeholder='Introdueix el preu'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                    <Form.Label>Imatge</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder={'Introdueix una URL d\'imatge'}
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                    <Form.File
                    id='image-file'
                    label='Escull una imatge'
                    custom
                    onChange={uploadFileHandler}
                    ></Form.File>
                    {uploading && <Loader />}
                </Form.Group>

                <Form.Group controlId='brand'>
                    <Form.Label>Marca</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder='Introdueix la marca'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='countInStock'>
                    <Form.Label>Quantitat en Stock</Form.Label>
                    <Form.Control 
                    type='number'
                    placeholder='Introdueix la quantitat en stock'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder='Introdueix la categoria'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                    <Form.Label>Descripció</Form.Label>
                    <Form.Control as='textarea' rows='5'
                    placeholder='Introdueix la descripció'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Actualitza les dades</Button>
            </Form>
            )}
       </FormContainer>
        </>
                            
    )
}


export default ProductEditScreen
