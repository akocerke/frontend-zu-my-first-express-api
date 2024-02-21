import React, { useState } from 'react';
import axios from 'axios'; // Importiere axios für HTTP-Anfragen
import Content from '../../Layout/Content/Content';
import styles from './CreateTodo.module.css'; // Importiere die CSS-Datei

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
    } catch (error) {
      console.error('Fehler beim Hinzufügen eines neuen Todos:', error);
    }
  };

  return (
    <Content>
      <div className={styles.container}>
        <h2>Neues Todo erstellen</h2>
        {todoAdded && <p>Todo wurde erfolgreich hinzugefügt!</p>} {/* Zeige die Bestätigungsnachricht, wenn ein Todo hinzugefügt wurde */}
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
      </div>
    </Content>
  );
};

export default CreateTodo;
