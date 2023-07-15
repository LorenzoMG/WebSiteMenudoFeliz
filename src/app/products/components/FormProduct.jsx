'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Offcanvas from 'react-bootstrap/Offcanvas'
import EActions from './../../enums/actions'

export default function FormProduct(props) {
  const productDefault = {
    id: 0,
    name: '',
    description: '',
    code: '',
    cost: '',
  }

  const { getProducts, action, idProduct } = { ...props }
  const [showForm, setShowForm] = useState(false)
  const [product, setProduct] = useState(productDefault)

  const closeCanvas = () => setShowForm(false)
  const showCanvas = () => {
    setProductDefault()
    if (action === EActions.Update) getProductById(idProduct)
    setShowForm(true)
  }
  const setProductDefault = () => setProduct(productDefault)

  const onChangeProduct = (e) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value

    if (fieldName === 'description') generateCode(fieldValue)

    setProduct((values) => ({
      ...values,
      [fieldName]: fieldValue,
    }))
  }
  const generateCode = (description) => {
    let newCode = ''
    let aux = description.trim().toUpperCase().split(' ')

    aux.forEach((element) => {
      if (element !== undefined && element !== null) {
        if (newCode.length <= 6) {
          if (element.length > 1) newCode += element.substring(0, 2)
          else newCode += element.substring(0, 2)
        }
      }
    })
    product.code = newCode
    setProduct(product)
  }
  const getProductById = async (idProduct) => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_MENUDO}${process.env.NEXT_PUBLIC_URI_PRODUCTS}getById?idProduct=${idProduct}`
      )
      .then((res) => {
        setProduct(res.data.data)
      })
      .catch((error) => {
        console.log('eerr' + error)
      })
      .finally(() => {})
  }
  const saveRecord = async (e) => {
    e.preventDefault()

    if (action === EActions.Update) updateProduct()
    else saveProduct()

    closeCanvas()
  }
  const saveProduct = async () => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_MENUDO}${process.env.NEXT_PUBLIC_URI_PRODUCTS}insert`,
        {
          data: product,
        }
      )
      .then((response) => {
        console.log('response' + response.data.data)
      })
      .catch((error) => {
        console.log('eerr' + error)
      })
      .finally(() => {
        getProducts()
      })
  }
  const updateProduct = async () => {
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_API_MENUDO}${process.env.NEXT_PUBLIC_URI_PRODUCTS}update`,
        {
          data: product,
        }
      )
      .then((response) => {
        console.log('response' + response.data.data)
      })
      .catch((error) => {
        console.log('eerr' + error)
      })
      .finally(() => {
        getProducts()
      })
  }
  return (
    <Container>
      <Button
        variant={action === EActions.Add ? 'primary' : 'success'}
        onClick={showCanvas}
      >
        {action === EActions.Add ? 'New' : 'Update'}
      </Button>
      <Offcanvas show={showForm} onHide={closeCanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {action === EActions.Add ? 'New' : 'Update'}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={saveRecord}>
            <Form.Group className='mb-3' controlId='Name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name='name'
                type='text'
                value={product.name}
                onChange={onChangeProduct}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='Description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name='description'
                value={product.description}
                onChange={onChangeProduct}
                type='text'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='Code'>
              <Form.Label>Code</Form.Label>
              <Form.Control
                name='code'
                value={product.code}
                readOnly={true}
                disabled={true}
                type='text'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='Cost'>
              <Form.Label>Cost</Form.Label>
              <Form.Control
                name='cost'
                value={product.cost}
                onChange={onChangeProduct}
                type='number'
              />
            </Form.Group>
            <div>
              <Button type='sumbit' size='sm' variant='success'>
                Save
              </Button>
              <Button size='sm' variant='danger' onClick={closeCanvas}>
                Cancel
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  )
}
