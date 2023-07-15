'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Offcanvas from 'react-bootstrap/Offcanvas'
import ListMenu from '@/app/components/ListMenu'

const saleDefault = { id: 0, date: '20200526', folio: 0, idClient: 0 }

export default function FormSale(props) {
  const { getSales, idSale } = { ...props }

  const [showForm, setShowForm] = useState(false)
  const [sale, setSale] = useState(saleDefault)

  const closeCanvas = () => {
    setShowForm(false)
  }
  const showCanvas = () => {
    console.log('IdVenta' + idSale)

    setSaleDefault()
    if (idSale > 0) getSaleById(idSale)
    setShowForm(true)
  }
  const getSaleById = async (idSale) => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_MENUDO}${process.env.NEXT_PUBLIC_URI_SALES}getById?id=${idSale}`
      )
      .then((res) => {
        setSale(res.data.data)
      })
      .catch((error) => {
        console.log('eerr' + error)
      })
      .finally(() => {})
  }
  const onChangeSale = (e) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value

    setSale((values) => ({
      ...values,
      [fieldName]: fieldValue,
    }))
  }

  const setSaleDefault = () => setSale(saleDefault)

  const saveRecord = async (e) => {
    e.preventDefault()

    if (idSale > 0) updateSale()
    else saveSale()

    closeCanvas()
  }
  const saveSale = async () => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_MENUDO}${process.env.NEXT_PUBLIC_URI_SALES}insert`,
        {
          data: sale,
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.log('eerr' + error)
      })
      .finally(() => {
        getSales()
      })
  }
  const updateSale = async () => {
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_API_MENUDO}${process.env.NEXT_PUBLIC_URI_SALES}update`,
        {
          data: sale,
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.log('eerr' + error)
      })
      .finally(() => {
        getSales()
      })
  }
  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }

  return (
    <Container>
      <Button variant={idSale > 0 ? 'success' : 'primary'} onClick={showCanvas}>
        {idSale > 0 ? 'Update' : 'New'}
      </Button>
      <Offcanvas show={showForm} onHide={closeCanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{idSale > 0 ? 'Update' : 'New'}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={saveRecord}>
            <Form.Group className='mb-3' controlId='Folio'>
              <Form.Label>Folio</Form.Label>
              <Form.Control
                name='folio'
                type='number'
                value={sale.folio}
                onChange={onChangeSale}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='Date'>
              <Form.Label for='date'>Date</Form.Label>
              <Form.Control
                name='date'
                value={formatDate(sale.date)}
                min={'2000-01-01'}
                max={'2099-01-01'}
                onChange={onChangeSale}
                type='date'
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Client</Form.Label>
              <ListMenu
                name={'idClient'}
                value={sale.idClient}
                onChange={onChangeSale}
              ></ListMenu>
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
