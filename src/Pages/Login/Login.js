import React, { useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginResponse = await axios.post('http://localhost:3030/v1/auth/login', {
                email: email,
                password: password
            });
            
            if (loginResponse.data.message === "Login erfolgreich") {
                const userId = loginResponse.data.user.id; // Extrahieren Sie die Benutzer-ID aus der Antwort
                const todosResponse = await axios.get(`http://localhost:3030/v1/todos/byuserid/${userId}`);
                console.log(todosResponse.data); // Hier erhalten Sie die Todos des Benutzers
                navigate(`/user-todos/${userId}`);
            } else {
                console.error('Login fehlgeschlagen:', loginResponse.data.message);
            }
        } catch (error) {
            console.error('Fehler bei der Anmeldung:', error);
        }
    };
    
    

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">E-Mail:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Passwort:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
