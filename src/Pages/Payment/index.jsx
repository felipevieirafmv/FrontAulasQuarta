import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { api } from '../../Services/api';
import styles from './styles.module.scss';
import NavBar from "../components/navbar";

export default function Payment() {
    const [status, setStatus] = useState({})

    useEffect(() => {
        async function fetchStatus() {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                console.log("Token não encontrado.");
                return;
                }

                const paymentId = localStorage.getItem("paymentId")

                const response = await api.get(`/payment/status?transactionId=${paymentId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log(response.data, "FFFFFFFFFFFFFFFFFFFFFFFFFFF");

                setStatus(response.data);
            } catch (error) {
                console.log('Erro ao carregar o status:', error);
            }
        }

        fetchStatus();
    }, []);

    return (
        <div>
            <NavBar />
            <div className={styles.paymentPage}>
                <Card className={styles.card}>
                    <Card.Body>
                        <Card.Title>{status.method}</Card.Title>
                        <Card.Text>{status.status}</Card.Text>
                        <Card.Text><strong>Preço:</strong> R${status.totalValue}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}
