import React, { useState } from 'react';
import axios from 'axios'; // Importiere axios für HTTP-Anfragen
import Content from '../../Layout/Content/Content';
import styles from './CreateTodo.module.css'; // Importiere die CSS-Datei

const CreateTodo = () => {
  // Zustände für die Eingabefelder
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  // Funktion zum Bearbeiten des Formulars und Senden der POST-Anfrage
  const handleSubmit = async (e) => {
    e.preventDefault(); // Verhindere das Neuladen der Seite

    try {
      // Sende die POST-Anfrage an den Server
      const response = await axios.post('/api/todos/create', { title, completed });
      console.log(response.data); // Gib die Antwort in der Konsole aus
      // Setze die Eingabefelder zurück nach erfolgreicher Erstellung
      setTitle('');
      setCompleted(false);
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
            Titel:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={styles.input} />
          </label>
          <label className={styles.label}>
            Abgeschlossen:
            <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
          </label>
          <button type="submit" className={styles.button}>Todo hinzufügen</button>
        </form>
      </div>
    </Content>
  );
};

export default CreateTodo;
