import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Content from '../../Layout/Content/Content';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './UpdateTodo.module.css';
import { Link } from 'react-router-dom';

const UpdateTodo = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [completed, setCompleted] = useState(false);
  const [doneByDate, setDoneByDate] = useState('');

  useEffect(() => {
    // Verbesserte fetchTodo-Funktion
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/v1/todos/byid/${id}`);
        if (response.status === 200 || response.status === 201) {
          const fetchedTodo = response.data.todo;
          setTodo(fetchedTodo);
          setTitle(fetchedTodo.title);
          setUserId(fetchedTodo.userId);
          setCompleted(fetchedTodo.completed);
          setDoneByDate(fetchedTodo.doneByDate);
        } else {
          throw new Error('Fehler beim Abrufen der Todo');
        }
      } catch (error) {
        console.error('Fehler beim Abrufen der Todo:', error);
      }
    };

    fetchTodo(); // Aufruf der Funktion innerhalb des useEffect-Hooks
  }, [id]); // Dependency Array hinzugefügt

  // Verbesserte handleSubmit-Funktion außerhalb des useEffect-Hooks definiert
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3030/v1/todos/update/${id}`, { title, userId, completed, doneByDate });
      if (response.status === 200 || response.status === 201) {
        console.log('Todo erfolgreich aktualisiert');
        toast.success('Todo erfolgreich aktualisiert');
      }
    } catch (error) {
      console.error(`Fehler beim Aktualisieren des Todos: Benutzer ID ${userId} nicht vorhanden!`, error);
      toast.error(`Fehler beim Aktualisieren des Todos: Benutzer ID ${userId} nicht vorhanden!`);
    }
  };

  return (
    <Content>
      <div className={styles.container}>
        {todo && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <input type="hidden" value={id} readOnly />
            <label>Todo-ID: {id}</label>
            <label>
              Benutzer-ID:
              <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} className={styles.input} />
            </label>
            <label>
              Titel:
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={styles.input} />
            </label>
            <label>
              Abgeschlossen:
              <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} className={styles.checkbox} />
            </label>
            <label>
              Fälligkeitsdatum:
              <input type="date" value={doneByDate} onChange={(e) => setDoneByDate(e.target.value)} className={styles.input} />
            </label>
            <button type="submit" className={styles.button}>Todo aktualisieren</button>
          </form>
        )}
        <Link to="/list">
          <button type="submit" className={styles.buttonZ}>Zurück</button>
        </Link>
      </div>
      <ToastContainer />
    </Content>
  );
};

export default UpdateTodo;
