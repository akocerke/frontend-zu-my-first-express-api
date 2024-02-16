import React, { useState, useEffect } from 'react';
import Content from '../../Layout/Content/Content';
import styles from './UserTodos.module.css';

const UserTodos = () => {
  const [todos, setTodos] = useState([]);
  const [userIdInput, setUserIdInput] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userIdInput.trim() !== '') {
      fetchUserTodos(userIdInput);
    }
  }, [userIdInput]);

  const fetchUserTodos = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3030/v1/todos/byuserid/${userId}`);
      if (!response.ok) {
        throw new Error(`Kein Benutzer gefunden mit der ID ${userId}`);
      }
      const data = await response.json();
      setTodos(data.todos);
      setError(null);
    } catch (error) {
      console.error('Fehler beim Abrufen der Todos des Benutzers:', error);
      setError(error.message);
    }
  };

  const handleUserIdInputChange = (e) => {
    setUserIdInput(e.target.value);
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
        </div>
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
