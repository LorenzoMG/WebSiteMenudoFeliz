import axios from 'axios'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default function DeleteModal(props) {
  const [show, setShow] = useState(false)
  const { getProducts, idProduct } = { ...props }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const deleteRecord = () => {
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_MENUDO}${process.env.NEXT_PUBLIC_URI_PRODUCTS}delete?idProduct=${idProduct}`
      )
      .then((res) => {
        getProducts()
      })
      .catch((error) => {
        console.log('eerr' + error)
      })
      .finally(() => {
        handleClose()
      })
  }
  return (
    <>
      <Button variant='danger' onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you wish delete the current Product?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={deleteRecord}>
            Acept
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
