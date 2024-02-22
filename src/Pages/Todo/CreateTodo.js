import React, { useState } from 'react';
import axios from 'axios'; // Importiere axios für HTTP-Anfragen
import Content from '../../Layout/Content/Content';
import styles from './CreateTodo.module.css'; // Importiere die CSS-Datei
import { Link } from 'react-router-dom';

const CreateTodo = () => {
  // Zustände für die Eingabefelder
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const [doneByDate, setDoneByDate] = useState('');
  const [userId, setUserId] = useState(''); // Hinzufügen von userId-Zustand für das Todo-Formular
  const [todoAdded, setTodoAdded] = useState(false); // Zustand für die Anzeige der Bestätigungsnachricht

  // Funktion zum Bearbeiten des Formulars und Senden der POST-Anfrage
  const handleSubmit = async (e) => {
    e.preventDefault(); // Verhindere das Neuladen der Seite

    try {
      // Sende die POST-Anfrage an den Server
      const response = await axios.post('http://localhost:3030/v1/todos/create', { userId, title, completed, doneByDate });
      console.log(response.data); // Gib die Antwort in der Konsole aus
      // Setze die Eingabefelder zurück nach erfolgreicher Erstellung
      setTitle('');
      setCompleted(false);
      setDoneByDate('');
      setTodoAdded(true); // Setze todoAdded auf true, um die Bestätigungsnachricht anzuzeigen
      setTimeout(() => {
        setTodoAdded(false); // Verstecke die Bestätigungsnachricht nach ein paar Sekunden
      }, 3000); // Timeout in Millisekunden (hier 3000ms = 3 Sekunden)
    } catch (error) {
      console.error('Fehler beim Hinzufügen eines neuen Todos:', error);
    }
  };

  return (
    <Content>
      <div className={styles.container}>
        <h2>Neues Todo erstellen</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Benutzer-ID:
            <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} className={styles.input} />
          </label>
          <label className={styles.label}>
            Titel:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={styles.input} />
          </label>
          <label className={styles.label}>
            Abgeschlossen:
            <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
          </label>
          <label className={styles.label}>
            Fälligkeitsdatum:
            <input type="date" value={doneByDate} onChange={(e) => setDoneByDate(e.target.value)} className={styles.input} />
          </label>
          <button type="submit" className={styles.button}>Todo hinzufügen</button>
        </form>
        <Link to="/list">
        <button type="submit" className={styles.buttonZ}>Zurück</button>
        </Link>
        {todoAdded && (
          <div className={styles.successMessage}>
            Todo wurde erfolgreich hinzugefügt!
          </div>
        )}
      </div>
    </Content>
  );
};

export default CreateTodo;
