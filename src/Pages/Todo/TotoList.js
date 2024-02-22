import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Content from '../../Layout/Content/Content';
import style from './TodoList.module.css'; // Importieren Sie Ihr benutzerdefiniertes CSS
import { Link } from 'react-router-dom';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const response = await axios.get("http://localhost:3030/v1/todos/all");
        if (response.status !== 200) {
          throw new Error('Fehler beim Abrufen der Todos');
        }
        setTodos(response.data.todos);
      } catch (error) {
        console.error('Fehler beim Abrufen der Todos:', error);
      }
    };

    fetchTodoList();
  }, []);

  const handleDeleteTodo = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3030/v1/todos/${id}`);
      if (response.status === 200) {
        setTodos(todos.filter(todo => todo.id !== id));
      }
    } catch (error) {
      console.error('Fehler beim Löschen des Todos:', error);
    }
  };

  const handleUpdateTodo = async (id) => {
    // Implementieren Sie die Logik zum Aktualisieren des Todos
    console.log('Update Todo with ID:', id);
  };


  const handleCheckboxChange = async (id) => {
    try {
      const updatedTodos = todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      setTodos(updatedTodos);
      // Hier den Axios-Request senden, um den Status des Todos auf der Serverseite zu aktualisieren
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Todos:', error);
    }
  };


  return (
    <Content>
      <div className={style.container}>
      <h2 style={{ textAlign: 'center' }}>Alle Todos</h2>
        
        <Link to="/todos">
            <button className={style.backButton}>Zurück</button>
        </Link>
        <Link to="/create">
            <button className={style.createButton}>Create</button>
        </Link>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Todo ID</th>
              <th>User ID</th>
              <th>Title</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.userId}</td>
                <td>{todo.title}</td>
                <td><input type="checkbox" checked={todo.completed} onChange={() => handleCheckboxChange(todo.id)} /></td>
                <td className={style.buttonGroup}>
                  <button className={style.deleteButton} onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                  <button className={style.updateButton} onClick={() => handleUpdateTodo(todo.id)}>Update</button>
                  <Link to={`/mark/${todo.id}`}>
                    <button className={style.markButton}>Mark</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        
      </div>
    </Content>
  );
}

export default TodoList;
