import React, { useState } from 'react';
import styles from './Signup.module.css'; // Importieren Sie das CSS-Modul
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    // Zustände für Vorname, Nachname, E-Mail und Passwort
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Funktion zum Einreichen des Formulars
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Registrierungsanfrage an den Server senden
            const signupResponse = await axios.post('http://localhost:3030/v1/auth/signup', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            });
            
            // Überprüfen, ob die Registrierung erfolgreich war
            if (signupResponse.data.message === "Benutzer erfolgreich registriert") {
                // Weiterleitung zur Anmeldeseite
                navigate('/login');
            } else {
                toast.error(signupResponse.data.message); // Fehlermeldung anzeigen
            }
        } catch (error) {
            console.error('Fehler bei der Registrierung:', error);
            toast.error('Fehler bei der Registrierung. Bitte versuchen Sie es später erneut.'); // Allgemeine Fehlermeldung anzeigen
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Registrieren</h2>
                <div className={styles.inputGroup}>
                    <label htmlFor="firstName">Vorname:</label>
                    <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="lastName">Nachname:</label>
                    <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">E-Mail:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Passwort:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Registrieren</button>
            </form>
            <ToastContainer /> {/* Toast-Benachrichtigungen anzeigen */}
        </div>
    );
};

export default Signup;
