'use client'

import { Button } from 'react-bootstrap'
import { Container, Table } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import FormProduct from './components/FormProduct'
import axios from 'axios'
import EActions from './../enums/actions'
import DeleteModal from './components/DeleteProduct'

export default function Products() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    getProducts()
  }, [])
  const getProducts = async () => {
    return await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_MENUDO}${process.env.NEXT_PUBLIC_URI_PRODUCTS}getAll?page=1&records=50`
      )
      .then((res) => {
        console.log(res.data.products)
        setProducts(res.data.products)
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
      <h1>Products</h1>
      <div>
        <FormProduct
          getProducts={getProducts}
          action={EActions.Add}
        ></FormProduct>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Code</th>
            <th>Cost</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((element) => {
            return (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.name}</td>
                <td>{element.description}</td>
                <td>{element.code}</td>
                <td>{element.cost}</td>
                <td>
                  <FormProduct
                    getProducts={getProducts}
                    action={EActions.Update}
                    idProduct={element.id}
                  ></FormProduct>
                </td>
                <td>
                  <DeleteModal
                    getProducts={getProducts}
                    idProduct={element.id}
                  ></DeleteModal>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Container>
  )
}
