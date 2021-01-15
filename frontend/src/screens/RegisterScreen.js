import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Row, Button, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {register} from '../actions/userActions'

const RegisterScreen = ({location, history}) => {


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const[showPassword1, setShowPassword1] = useState(false)
    const[showPassword2, setShowPassword2] = useState(false)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userRegister;

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    },[history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage('Les contrasenyes no coincideixen')
        }else {

            dispatch(register(name, email, password))
        }
    }
    const togglePassword1 = () => {
        showPassword1 ? setShowPassword1(false) : setShowPassword1(true)
    }
    const togglePassword2 = () => {
        showPassword2 ? setShowPassword2(false) : setShowPassword2(true)
    }
    return (
        <FormContainer className="container-registrat">
            <h1>Registra't</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
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
                    type={showPassword1 ? 'text' : 'password'}
                    placeholder='Introdueix la contrasenya'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword' style={{position: 'relative'}}>
                    <Form.Label>Confirma la contrasenya</Form.Label>
                    <Form.Control 
                    type={showPassword2 ? 'text' : 'password'}
                    placeholder='Confirma la contrasenya'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>

                </Form.Group>
                <Button type='submit' variant='primary'>Envia</Button>
            </Form>


            <Row className='py-3'>
                <Col>
                    Ja tens un compte? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}><span className="text-info font-weight-bold">Inicia sessió</span></Link>
                </Col>
            </Row>
            <div onClick={togglePassword1}><i style={{bottom:'207px'}} className={`btn fas fa-eye${showPassword1 ? '' : '-slash'} show-password`}></i></div>
            
            <div onClick={togglePassword2}><i style={{bottom:'117px'}} className={`btn fas fa-eye${showPassword2 ? '' : '-slash'} show-password`}></i></div>
        </FormContainer>
                            
    )
}

export default RegisterScreen
