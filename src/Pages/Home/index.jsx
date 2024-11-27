import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { api } from '../../Services/api';
import styles from './styles.module.scss';
import NavBar from "../components/navbar";

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                console.log("Token não encontrado.");
                return;
                }

                const response = await api.get('/products', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProducts(response.data);
            } catch (error) {
                console.log('Erro ao carregar os produtos:', error);
            }
        }

        fetchProducts();
    }, []);

    return (
        <div  style={{ overflow: 'hidden' }}>
            <NavBar />
            <div className={styles.homePage}>
                {products.map(product => (
                    <Card className={styles.card}>
                        <Card.Header>Produtos</Card.Header>
                        <Card.Body>
                            <Card key={product.id} className="m-2">
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>{product.description}</Card.Text>
                                    <Card.Text><strong>Preço:</strong> R${product.price.toFixed(2)}</Card.Text>
                                    <Card.Text><strong>Quantidade:</strong> {product.quantity}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}
