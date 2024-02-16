import React, { useState, useEffect } from 'react';
import Content from '../../Layout/Content/Content';
import styles from './Todo.module.css';

const AllTodos = () => {
  const [todos, setTodos] = useState([]);

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

  return (
    <Content>
      <div className={styles.todo}>
        <h2>Alle ToDos</h2>
        {todos.map(todo => (
          <div key={todo.id} className={styles.todoItem}>
            <h3>ToDo-Item</h3>
            <div>
              <strong>Aufgabe:</strong> {todo.title}
            </div>
            <div>
              <strong>DueDate:</strong> {new Date(todo.doneByDate).toLocaleDateString()}
            </div>
            <div>
              <strong>Geschafft:</strong> <input type="checkbox" checked={todo.completed} onChange={() => {}} />
            </div>
          </div>
        ))}
      </div>
    </Content>
  );
}

export default AllTodos;
