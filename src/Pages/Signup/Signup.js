// Signup.js

import React, { useState } from 'react';
import styles from './Signup.module.css'; // Importieren Sie das CSS-Modul

const Signup = () => {
    // Zustände für Benutzername, E-Mail und Passwort
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Funktion zum Einreichen des Formulars
    const handleSubmit = (e) => {
        e.preventDefault();
        // Hier können Sie den Benutzernamen, die E-Mail und das Passwort überprüfen und die entsprechenden Aktionen ausführen, z. B. eine Anfrage an den Server senden
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        // Beispiel: Ein Anfrage an den Server senden, um sich zu registrieren
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className={styles.inputGroup}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
