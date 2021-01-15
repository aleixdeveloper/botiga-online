import React, {useEffect} from 'react'
/* import {Link} from 'react-router-dom' */
import {Table, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {LinkContainer} from 'react-router-bootstrap'
import {listProducts, deleteProduct, createProduct} from '../actions/productActions'
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'

const ProductListScreen = ({history, match}) => {
    
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {error,loading,products, pages, page} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {error:errorDelete,loading:loadingDelete, success:successDelete} = productDelete
    
    const productCreate = useSelector(state => state.productCreate)
    const {error:errorCreate,loading:loadingCreate, success:successCreate, product:createdProduct} = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {

        dispatch({type: PRODUCT_CREATE_RESET})
        
        if(!userInfo.isAdmin){
            history.push('/login')
        }
        
        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts('',pageNumber))
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber])

    const createProductHandler = () => {

          dispatch(createProduct())

    }
    const deleteHandler = (id) => {
        if(window.confirm('Estàs segur d\'esborrar el producte?')){
          dispatch(deleteProduct(id))
        }

    }

    return (
        <>
        <Row className='aling-items-center'>
            <Col>
                <h1>Productes</h1>

            </Col>
            <Col className='text-right'>
                <Button className='my-3 bg-success' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Crea un producte
                </Button>
            </Col>
        </Row>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message> }
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message> }

         {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
             <>
             <Table className='table-sm' striped bordered hover responsive>
                 <thead>
                     <tr>
                         <th>ID</th>
                         <th>NOM</th>
                         <th>PREU</th>
                         <th>CATEGORIA</th>
                         <th>MARCA</th>
                         <th></th>
                     </tr>
                 </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}€</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td className="text-center">
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='info' className='btn-sm mx-1'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm mx-1' onClick={() => deleteHandler(product._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
             </Table>
             <Paginate pages={pages} page={page} isAdmin={true} />
             </>
         )}   
        </>
    )
}

export default ProductListScreen
