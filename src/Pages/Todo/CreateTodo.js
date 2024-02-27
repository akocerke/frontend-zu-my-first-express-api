import React, { useState } from 'react';
import axios from 'axios'; // Importiere axios für HTTP-Anfragen
import Content from '../../Layout/Content/Content';
import styles from './CreateTodo.module.css'; // Importiere die CSS-Datei
import { ToastContainer, toast } from 'react-toastify'; // Importiere toast und ToastContainer für die Bestätigungsnachricht
import 'react-toastify/dist/ReactToastify.css'; // Importiere die CSS-Datei für das Toast-Modul
import { Link } from 'react-router-dom';

const CreateTodo = () => {
  // Zustände für die Eingabefelder
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const [doneByDate, setDoneByDate] = useState('');
  const [userId, setUserId] = useState(''); // Hinzufügen von userId-Zustand für das Todo-Formular

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
      // Zeige die Bestätigungsnachricht als Toast an
      toast.success(`Todo wurde erfolgreich hinzugefügt für Benutzer ID: ${userId}`, { autoClose: 3000 }); // Toast wird nach 3 Sekunden automatisch geschlossen
    } catch (error) {
      console.error('Fehler beim Hinzufügen eines neuen Todos:', error);
      // Zeige einen Fehler-Toast an, wenn das Hinzufügen fehlschlägt
      toast.error(`Fehler beim Hinzufügen eines neuen Todos ! Benutzer ID: ${userId} nicht vorhanden !`);
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
          <button className={styles.buttonZ}>Zurück</button>
        </Link>
      </div>
      <ToastContainer /> 
    </Content>
  );
};

export default CreateTodo;
