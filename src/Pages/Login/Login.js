// Login.js

import React, { useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3030/v1/auth/login', {
                email: email,
                password: password
            });
            console.log(response.data);
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
