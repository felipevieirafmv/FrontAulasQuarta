import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './styles.module.scss';
import { api } from '../../Services/api';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";

export default function Supplier() {
    const [name, setName] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [address, setAddress] = useState("");
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        async function fetchSuppliers() {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                console.log("Token não encontrado.");
                return;
                }

                const response = await api.get('/supplier', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSuppliers(response.data);
            } catch (error) {
                console.log('Erro ao carregar os fornecedores:', error);
            }
        }

        fetchSuppliers();
    }, []);
    
    async function handleSubmit(e) {

        const supplier = { name, cnpj, address };
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

            const response = await api.post('/supplier', supplier, { headers });
            
        } catch (error) {
            console.error('Erro ao cadastrar fornecedor!');
        }
    }

    return (
        <>
            <NavBar />
            <div className={styles.supplierPage}>
                <Card className="text-center">
                    <Card.Header>Create Supplier</Card.Header>
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

                            <Form.Label>CNPJ</Form.Label>
                            <Form.Control
                                className={styles.input}
                                value={cnpj}
                                type="text"
                                placeholder="CNPJ"
                                onChange={(e) => setCnpj(e.target.value)}
                            />

                            <Form.Label>Endereço</Form.Label>
                            <Form.Control
                                className={styles.input}
                                value={address}
                                type="text"
                                placeholder="Endereço"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            
                            <Button variant="primary" type="submit" className={styles.button}>
                                Create
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>

                <div>
                    {suppliers.map(supplier => (
                        <Card key={supplier.id} className={styles.card}>
                            <Card.Body>
                                <Card.Title>{supplier.name}</Card.Title>
                                <Card.Text>CNPJ: {supplier.cnpj}</Card.Text>
                                <Card.Text>Endereço: {supplier.address}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>

            </div>
        </>
    );
}
