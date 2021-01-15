import React from 'react'
import {Modal, Button, Image} from 'react-bootstrap'

const ImageModal = (props) => {
  const product = props.product;
    return (
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {product.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <Image src={product.image} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant='outline-danger'>Tancar</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default ImageModal
