import React, { useState, useEffect } from 'react';
import Content from '../../Layout/Content/Content';
import styles from './UserTodos.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserTodos = () => {
  const [todos, setTodos] = useState([]);
  const [userIdInput, setUserIdInput] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Diese useEffect-Hook wird nur ausgeführt, wenn userIdInput sich ändert.
    // Es wird nicht mehr automatisch eine Anfrage an die Datenbank gesendet.
  }, [userIdInput]);

  const fetchUserTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:3030/v1/todos/byuserid/${userIdInput}`);
      setTodos(response.data.todos);
      setError(null);
    } catch (error) {
      console.error('Fehler beim Abrufen der Todos des Benutzers:', error);
      toast.error(`Fehler: Benutzer ID ${userIdInput} nicht gefunden!  ${error.message}`);
      setError(`Fehler: Benutzer ID ${userIdInput} nicht gefunden! ${error.message} `);
    }
  };

  const handleUserIdInputChange = (e) => {
    setUserIdInput(e.target.value);
  };

  const handleButtonClick = () => {
    fetchUserTodos(); // Diese Funktion wird aufgerufen, wenn der Benutzer auf den Button klickt
  };

  return (
    <Content>
      <div className={styles.todo}>
        <h2>ToDos für Benutzer</h2>
        
        <div>
          <input
            type="text"
            placeholder="Benutzer-ID eingeben"
            value={userIdInput}
            onChange={handleUserIdInputChange}
          />
          <button onClick={handleButtonClick}>Daten abrufen</button> {/* Button, um Daten abzurufen */}
            <Link to="/todos">
              <button className={styles.backButton}>Zurück</button>
          </Link>
        </div>
        <ToastContainer />
        {error && <p>{error}</p>}
        <ul className={styles.todoList}>
          {todos.map(todo => (
            <li key={todo.id} className={styles.todoItem}>
              <div>
                <strong>Aufgabe:</strong> {todo.title}
              </div>
              <div>
                <strong>DueDate:</strong> {new Date(todo.doneByDate).toLocaleDateString()}
              </div>
              <div>
                <strong>Geschafft:</strong> <input type="checkbox" checked={todo.completed} onChange={() => {}} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Content>
  );
}

export default UserTodos;
