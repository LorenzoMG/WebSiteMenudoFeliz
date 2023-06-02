'use client'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.css'

export default function Navigation() {
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='/'>Sale Point</Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link href='/products'>Products</Nav.Link>
          <Nav.Link href='/sales'>Sales</Nav.Link>
          <Nav.Link href='#pricing'>Contacto</Nav.Link>
          <Nav.Link href='#pricing'></Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
