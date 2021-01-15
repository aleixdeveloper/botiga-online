import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {

    return (
        <Nav className="justify-content-center mb-5">
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link><span style={styled}>Iniciar sessió</span></Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Iniciar sessió</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link><span style={styled}>Enviament</span></Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Enviament</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link><span style={styled}>Pagament</span></Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Pagament</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link><span style={styled}>Finalització</span></Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Finalització</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
}
const styled = {
    paddingBottom: '0.6em',
    borderBottom: '1.5px solid black'
}

export default CheckoutSteps
