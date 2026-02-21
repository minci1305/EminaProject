import { useState } from 'react';
import './App.css';
import LogIn from './features/LogIn';
import SignUp from './features/SignUp';
import ToDoList from './features/ToDoList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/todolist' element={<ToDoList />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
