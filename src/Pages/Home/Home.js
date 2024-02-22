// Home.js
import React from 'react';
import styles from './Home.module.css'; 
import Content from '../../Layout/Content/Content'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Content >
      <div className={styles.home}>
      <h1>Welcome to My Todo App</h1>
      <p>This is the home page of the Todo App. You can manage your todos here.</p>

      <Link to={"/todos"}>
      <button>Manage Todos</button>
      </Link>
    </div>
    </Content>
    
  );
}

export default Home;
