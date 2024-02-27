import React, { useState, useEffect } from 'react';
import Content from '../../Layout/Content/Content';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './Welcome.module.css';

const Welcome = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:3030/v1/user/profile/${userId}`);
                setUserProfile(response.data.profile);
            } catch (error) {
                console.error('Fehler beim Abrufen des Benutzerprofils:', error);
            }
        };

        const fetchUserTodos = async () => {
            try {
                const response = await axios.get(`http://localhost:3030/v1/todos/byuserid/${userId}`);
                setTodos(response.data.todos);
                setError(null);
            } catch (error) {
                console.error('Fehler beim Abrufen der Todos des Benutzers:', error);
                setError(`Keine Todos gefunden für Benutzer mit der ID ${userId}`);
            }
        };

        fetchUserProfile();
        fetchUserTodos();
    }, [userId]);

    return (
        <Content>
            <div className={styles.container}>
                <h1 className={styles.title}>Willkommen!</h1>
                {userProfile ? (
                    <div>
                        <div className={styles.userInfo}>
                            <h4 className={styles.label}>Benutzer:</h4>
                            <p className={styles.info}>{userProfile.firstName} {userProfile.lastName}</p>
                        </div>
                        <div className={styles.userInfo}>
                            <h4 className={styles.label}>Benutzer mit der ID:</h4>
                            <p className={styles.info}>{userId}</p>
                        </div>
                        <div className={styles.userInfo}>
                            <h4 className={styles.label}>E-Mail:</h4>
                            <p className={styles.info}>{userProfile.email}</p>
                        </div>
                    </div>
                ) : (
                    <p>Lade Benutzerdaten...</p>
                )}
            </div>
            <div className={styles.additionalContent}>
                <h1 className={styles.title}>Meine Todos</h1>
                {error ? (
                    <p>{error}</p>
                ) : (
                    <ul className={styles.todoList}>
                        {todos.map(todo => (
                            <li key={todo.id} className={styles.todoItem}>
                                <div>
                                    <strong>Aufgabe:</strong> <p>{todo.title}</p>
                                </div>
                                <div>
                                    <strong>DueDate:</strong> <p>{new Date(todo.doneByDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <strong>Geschafft:</strong> <input type="checkbox" checked={todo.completed} onChange={() => {}} />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Content>
    );
};

export default Welcome;
