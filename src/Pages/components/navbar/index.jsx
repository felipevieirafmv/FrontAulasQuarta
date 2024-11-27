import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './styles.module.scss'

export default function NavBar(){

    return(
        <Navbar bg="dark" data-bs-theme="dark" className={styles.navBar}>
            <Container>
                <Navbar.Brand href="/home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/products">Produtos</Nav.Link>
                    <Nav.Link href="/cart">Carrinho</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}
