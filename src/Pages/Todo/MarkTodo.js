import React from 'react';
import axios from 'axios';
import Content from '../../Layout/Content/Content';

const MarkTodo = ({ todoId }) => {
  const handleMarkAsCompleted = async () => {
    try {
      const response = await axios.put(`http://localhost:3030/v1/todos/mark/${todoId}`);
      if (response.status === 200) {
        console.log(response.data.message); // Erfolgsmeldung anzeigen
        // Hier können Sie weitere Aktionen ausführen, z.B. die Todos neu laden
      }
    } catch (error) {
      console.error('Fehler beim Markieren des Todos:', error);
    }
  };

  return (
    <Content>
        <div>
            <h2 style={{textAlign: 'center'}}>Markieren Sie das Todo</h2>
            <button onClick={handleMarkAsCompleted}>Markieren</button>
        </div>
    </Content>
    
  );
}

export default MarkTodo;
