import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Content from '../../Layout/Content/Content';
import style from './TodoList.module.css'; // Importieren Sie Ihr benutzerdefiniertes CSS
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false); // Zustand für die Erfolgsmeldung nach dem Löschen eines Todos
  const convertToGermanDate = (isoDate) => {
    // Zerlegen des ISO-Datums
    const [year, month, day] = isoDate.split("-");
  
    // Zusammenstellen des Datums im deutschen Format
    const germanDate = `${day}.${month}.${year}`;
  
    return germanDate;
  };
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
      const response = await axios.delete(`http://localhost:3030/v1/todos/delete/${id}`);
      if (response.status === 200) {
        setTodos(todos.filter(todo => todo.id !== id));
        setDeleteSuccess(true); // Setze deleteSuccess auf true, um die Erfolgsmeldung anzuzeigen
        setTimeout(() => setDeleteSuccess(false), 3000); // Verstecke die Erfolgsmeldung nach 3 Sekunden
        toast.success('Todo erfolgreich gelöscht!');
      }
    } catch (error) {
      console.error('Fehler beim Löschen des Todos:', error);
      toast.error('Fehler beim Löschen des Todos!');
    }
  };

  const handleCheckboxChange = async (id, completed) => {
    try {
      const response = await axios.put(`http://localhost:3030/v1/todos/mark/${id}`, { completed: !completed });
      if (response.status === 200) {
        const updatedTodos = todos.map(todo => {
          if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        });
        setTodos(updatedTodos);
        toast.success('Todo Completed erfolgreich aktualisiert!');
      }
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Todos Completed:', error);
      toast.error('Fehler beim Aktualisieren des Todos Completed!');
    }
  };

  return (
    <Content>
      <div className={style.container}>
        <h2 style={{ textAlign: 'center' }}>Alle Todos</h2>
        
        
        <Link to="/create">
          <button className={style.createButton}>Create</button>
        </Link>
        {deleteSuccess && ( // Zeige die Erfolgsmeldung an, wenn deleteSuccess true ist
          <div className={style.successMessage}>
            Todo erfolgreich gelöscht!
          </div>
        )}
        <table className={style.table}>
          <thead>
            <tr>
              <th>Todo ID</th>
              <th>User ID</th>
              <th>Title</th>
              <th>zu erledigen Datum</th>
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
                <td>{convertToGermanDate(todo.doneByDate)}</td>
                <td><input type="checkbox" checked={todo.completed} onChange={() => handleCheckboxChange(todo.id, todo.completed)} /></td>
                <td className={style.buttonGroup}>
                  <button className={style.deleteButton} onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                  <Link to={`/update/${todo.id}`}>
                    <button className={style.updateButton}>Update</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </Content>
  );
}

export default TodoList;
