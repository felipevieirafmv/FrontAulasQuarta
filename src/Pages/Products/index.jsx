import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './styles.module.scss';
import { api } from '../../Services/api';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";

export default function Products() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0.0);
    const [quantity, setQuantity] = useState(0);
    const [productId, setProductId] = useState(null);
    
    async function handleSubmit(e) {

        const product = { name, description, price, quantity };
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.log("Token não encontrado.");
                return;
            }

            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            };

            if (productId) {
                const response = await api.put(`products?id=${productId}`, product, { headers });
            } else {
                const response = await api.post('/products', product, { headers });
            }

        } catch (error) {
            console.error('Erro ao cadastrar produto!');
        }
    }

    async function deleteSubmit(e){
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.log("Token não encontrado.");
                return;
            }

            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            };
            const response = await api.delete(`products?id=${productId}`, { headers });
        } catch (error) {
            console.error('Erro ao deletar produto!');
        }
    }

    return (
        <>
            <NavBar />
            <div className={styles.productPage}>
                <Card className="text-center">
                    <Card.Header>Create Product</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                className={styles.input}
                                value={name}
                                type="text"
                                placeholder="Nome"
                                onChange={(e) => setName(e.target.value)}
                            />

                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                className={styles.input}
                                value={description}
                                type="text"
                                placeholder="Descrição"
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <Form.Label>Preço</Form.Label>
                            <Form.Control
                                className={styles.input}
                                value={price}
                                type="number"
                                placeholder="0.00"
                                onChange={(e) => setPrice(e.target.value)}
                            />

                            <Form.Label>Quantidade</Form.Label>
                            <Form.Control
                                className={styles.input}
                                value={quantity}
                                type="number"
                                placeholder="0"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            
                            <Button variant="primary" type="submit" className={styles.button}>
                                Create
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>

                <Card className="text-center">
                    <Card.Header>Update Product</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Label>Id</Form.Label>
                            <Form.Control
                                className={styles.input}
                                value={productId}
                                type="number"
                                placeholder="Id"
                                onChange={(e) => setProductId(e.target.value)}
                            />

                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                className={styles.input}
                                value={name}
                                type="text"
                                placeholder="Nome"
                                onChange={(e) => setName(e.target.value)}
                            />

                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                className={styles.input}
                                value={description}
                                type="text"
                                placeholder="Descrição"
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <Form.Label>Preço</Form.Label>
                            <Form.Control
                                className={styles.input}
                                value={price}
                                type="number"
                                placeholder="0.00"
                                onChange={(e) => setPrice(e.target.value)}
                            />

                            <Form.Label>Quantidade</Form.Label>
                            <Form.Control
                                className={styles.input}
                                value={quantity}
                                type="number"
                                placeholder="0"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            
                            <Button variant="primary" type="submit" className={styles.button}>
                                Update
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>

                <Card className="text-center">
                    <Card.Header>Delete Product</Card.Header>
                    <Card.Body>
                        <Form onSubmit={deleteSubmit}>
                            <Form.Label>Id</Form.Label>
                            <Form.Control
                                className={styles.input}
                                value={productId}
                                type="number"
                                placeholder="Id"
                                onChange={(e) => setProductId(e.target.value)}
                            />

                            <Button variant="primary" type="submit" className={styles.button}>
                                Delete
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}
