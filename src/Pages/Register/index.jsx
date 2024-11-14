import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './styles.module.scss'
import { api } from '../../Services/api';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

export default function Register(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [birth, setBirth] = useState("")

    const navigate = useNavigate();

    async function handleSubmit(){
        try {
            const user = { email, password, birth }
            const response = await api.post('/users/newUser', user, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            navigate("/");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.registerPage}>
            <Card className="text-center">
                <Card.Header>Register</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control className={styles.input} value={email} type="email" placeholder="nome@gmail.com" onChange={(e) => setEmail(e.target.value)}/>
                    
                        <Form.Label>Senha</Form.Label>
                        <Form.Control className={styles.input} value={password} type="password" placeholder="Insira aqui" onChange={(e) => setPassword(e.target.value)}/>
                    
                        <Form.Label>Data de nascimento</Form.Label>
                        <Form.Control className={styles.input} value={birth} type="text" placeholder="2004-08-27" onChange={(e) => setBirth(e.target.value)}/>
                        <div className={styles.buttonDiv}>
                            <Button variant="primary" type='submit' className={styles.button} onClick={() => handleSubmit()}>
                                Register
                            </Button>
                            <Button variant="secondary" type='submit' className={styles.button} onClick={() => navigate("/")}>
                                Login
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}