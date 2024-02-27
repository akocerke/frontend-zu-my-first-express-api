import { Link } from 'react-router-dom'; // Importieren Sie Link aus react-router-dom
import Content from '../../Layout/Content/Content';
import styles from './Todo.module.css'; 

const Todo = () => {
  return (
    <Content>
      <div className={styles.todo}>
        <h2>ToDo-Verwaltung</h2>
        <div className={styles.filter}>
        <Link to="/list">
          <button>List ToDos</button>
          </Link>
          {/* <Link to="/all-todos">
            <button>Alle ToDos</button>
          </Link> */}
          
          {/* <Link to="/user-todos/:userId">
          <button>User ToDos</button>
          </Link> */}
          
        </div>
      </div>
    </Content>
  );
}

export default Todo;
