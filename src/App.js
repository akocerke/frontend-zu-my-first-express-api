import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Layout/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Todo from './Pages/Todo/Todo';
import AllTodos from './Pages/Todo/AllTodos';
import UserTodos from './Pages/Todo/UserTodos';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
         <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<Todo />} />
          <Route path="/all-todos" element={<AllTodos />} />
          <Route path="/user-todos/:userId" element={<UserTodos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
