import React, { useState, useEffect } from 'react';
import Content from '../../Layout/Content/Content';
import styles from './UserTodos.module.css';
import { Link, useParams } from 'react-router-dom'; // Importieren Sie useParams aus 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserTodos = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const { userId } = useParams(); // Holen Sie sich die Benutzer-ID aus den Parametern der URL
  
  useEffect(() => {
    fetchUserTodos(); 
  }, [userId]); 

  const fetchUserTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:3030/v1/todos/byuserid/${userId}`);
      setTodos(response.data.todos);
      setError(null);
    } catch (error) {
      console.error('Fehler beim Abrufen der Todos des Benutzers:', error);
      toast.error(`Fehler: Benutzer ID ${userId} nicht gefunden!  ${error.message}`);
      setError(`Fehler: Benutzer ID ${userId} nicht gefunden! ${error.message} `);
    }
  };

  return (
    <Content>
      <div className={styles.todo}>
        <h2>ToDos für Benutzer</h2>
        
        <div>
          <p>Benutzer-ID: {userId}</p> {/* Anzeige der Benutzer-ID für Debugging-Zwecke */}
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
        <Link to="/todos">
          <button className={styles.backButton}>Zurück</button>
        </Link>
      </div>
    </Content>
  );
}

export default UserTodos;
