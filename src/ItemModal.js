import React from 'react'
import { Modal } from 'react-bootstrap'
const ItemModal = ({ item, onItemChange, ...rest }) => (
    <Modal {...rest} bsSize="large">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-lg">Your Gigglelibs</Modal.Title>
      </Modal.Header>
      <Modal.Body>
  
        <h4>No Gigglelibs Yet!</h4>
       <a className="btn btn-secondary">Create New Gigglelib</a> 
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  )
  

export default ItemModal
