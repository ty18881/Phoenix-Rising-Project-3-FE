import React from 'react'
import { Modal } from 'react-bootstrap'
const ItemModal = ({ item, onItemChange, ...rest }) => (
    <Modal {...rest} bsSize="large">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-lg">{item.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
  
        <h4>{item.text}</h4>
       <a className="btn btn-secondary">Update Gigglelib</a> 
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  )
  

export default ItemModal
