import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'


const FormContainer = ({width, children}) => {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={width}>
                    {children}
                </Col>
            </Row>
            
        </Container>
    )
}
FormContainer.defaultProps = {
    width: 9
}
export default FormContainer
