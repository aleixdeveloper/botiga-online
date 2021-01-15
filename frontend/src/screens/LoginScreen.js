import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Row, Button, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {login} from '../actions/userActions'

const LoginScreen = ({location, history}) => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin;
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    },[history, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email,password))
    }
    return (
        <FormContainer>
            <h1>Accedeix a la zona clients</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Correu electrònic</Form.Label>
                    <Form.Control 
                    type='email'
                    placeholder='Introdueix un correu electrònic'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Contrasenya</Form.Label>
                    <Form.Control 
                    type='password'
                    placeholder='Introdueix la contrasenya'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Envia</Button>
            </Form>


            <Row className='py-3'>
                <Col>
                    Ets un client nou? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}><span className="text-info font-weight-bold">Registra't</span></Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
