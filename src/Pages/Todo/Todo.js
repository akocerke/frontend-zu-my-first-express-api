import React, { useState, useEffect } from 'react';
import Content from '../../Layout/Content/Content';
import styles from './Todo.module.css'; 

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [userIdInput, setUserIdInput] = useState('');
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    // Funktion zum Abrufen aller Todos
    const fetchAllTodos = async () => {
      try {
        const response = await fetch("http://localhost:3030/v1/todos/all");
        if (!response.ok) {
          throw new Error('Fehler beim Abrufen der Todos');
        }
        const data = await response.json();
        setTodos(data.todos);
      } catch (error) {
        console.error('Fehler beim Abrufen der Todos:', error);
      }
    };

    fetchAllTodos();
  }, []);

  useEffect(() => {
    // Funktion zum Filtern der Todos nach Benutzer-ID
    const filterTodosByUserId = () => {
      if (!userIdInput) {
        setFilteredTodos(todos);
      } else {
        const filtered = todos.filter(todo => todo.userId === parseInt(userIdInput));
        setFilteredTodos(filtered);
      }
    };

    filterTodosByUserId();
  }, [userIdInput, todos]);

  const handleUserIdInputChange = (e) => {
    setUserIdInput(e.target.value);
  };

  return (
    <Content>
      <div className={styles.todo}>
        <h2>Alle ToDos</h2>
        <div className={styles.filter}>
          <input 
            type="text" 
            placeholder="Benutzer-ID eingeben" 
            value={userIdInput} 
            onChange={handleUserIdInputChange} 
          />
          <button onClick={() => setUserIdInput('')}>Clear</button>
        </div>
        <ul className={styles.todoList}>
          {filteredTodos.map(todo => (
            <li key={todo.id} className={styles.todoItem}>
              <input type="checkbox" checked={todo.completed} onChange={() => {}} />
              <span>{todo.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </Content>
  );
}

export default Todo;
