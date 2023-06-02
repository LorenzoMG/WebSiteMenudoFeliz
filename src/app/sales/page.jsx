'use client'

import { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import axios from 'axios'

import FormSale from './components/FormSale'

import EActions from './../enums/actions'

export default function SalesMain() {
  const [sales, setSales] = useState([])

  useEffect(() => {
    getSales()
  }, [])
  const getSales = async () => {
    return await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_MENUDO}${process.env.NEXT_PUBLIC_URI_SALES}getAll?page=1&records=50`
      )
      .then((res) => {
        console.log(res.data.sales)
        setSales(res.data.sales)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .finally(function () {
        // always executed
      })
  }
  return (
    <Container>
      <h1>Sales</h1>
      <div>
        <FormSale getSales={getSales} action={EActions.Add}></FormSale>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Folio</th>
            <th>Date</th>
            <th>Client</th>
            <th rowSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => {
            return (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>{sale.folio}</td>
                <td>{sale.date}</td>
                <td>{sale.client}</td>
                <td colSpan={2}>
                  <FormSale getSales={getSales} idSale={sale.id}></FormSale>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Container>
  )
}
