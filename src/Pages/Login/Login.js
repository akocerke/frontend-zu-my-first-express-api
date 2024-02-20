// Login.js

import React, { useState } from 'react';
import styles from './Login.module.css'; // Importieren Sie das CSS-Modul

const Login = () => {
    // Zustände für Benutzername und Passwort
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Funktion zum Einreichen des Formulars
    const handleSubmit = (e) => {
        e.preventDefault();
        // Hier können Sie den Benutzernamen und das Passwort überprüfen und die entsprechenden Aktionen ausführen, z. B. eine Anfrage an den Server senden
        console.log('Username:', username);
        console.log('Password:', password);
        // Beispiel: Ein Anfrage an den Server senden, um sich einzuloggen
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className={styles.inputGroup}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
