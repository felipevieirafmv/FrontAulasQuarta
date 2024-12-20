import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import styles from './styles.module.scss';
import { api } from '../../Services/api';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const user = { email, password };
        try {
            const response = await api.post('/users/login', user, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            localStorage.setItem("token", response.data.token);
            navigate("/home");
        } catch (error) {
            console.error('Erro ao tentar fazer login:', error.response || error.message);
        }
    }

    return (
        <div className={styles.loginPage}>
            <Card className="text-center">
                <Card.Header>Login</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            className={styles.input}
                            value={email}
                            type="email"
                            placeholder="nome@gmail.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            className={styles.input}
                            value={password}
                            type="password"
                            placeholder="Insira aqui"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className={styles.buttonDiv}>
                            <Button variant="primary" type="submit" className={styles.button}>
                                Login
                            </Button>
                            <Button variant="secondary" type="button" className={styles.button} onClick={() => navigate("/register")}>
                                Register
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
