import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import mern_image from '../assets/media/mern-min.png'
import BarTheme from '../components/BarTheme'

const Footer = () => {
    return (
        <footer>
            <Container fluid className='bg-primary text-light'>
                <BarTheme />
                <Row>
                    <Col className='text-center py-3 '>
                    <p style={{
                        fontSize: '1.2em'
                    }}>Copyright &copy; aleixdev 2020 | <span style={{
                        fontSize: '1.2em'
                    }}>Built with <img width={100} src={mern_image} alt='mern stack'></img> stack</span></p>
                    </Col>
                </Row>
            </Container>            
        </footer>
    )
}

export default Footer
