import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Layout/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Todo from './Pages/Todo/Todo';
import AllTodos from './Pages/Todo/AllTodos';
import UserTodos from './Pages/Todo/UserTodos';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import CreateTodo from './Pages/Todo/CreateTodo';
import TodoList from './Pages/Todo/TotoList';
import UpdateTodo from './Pages/Todo/UpdateTodo';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
         <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<Todo />} />
          <Route path="/list" element={<TodoList />} />
          <Route path="/all-todos" element={<AllTodos />} />
          <Route path="/user-todos/:userId" element={<UserTodos />} />
          <Route path="/create" element={< CreateTodo/>} />
          <Route path="/update/:id" element={< UpdateTodo/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
