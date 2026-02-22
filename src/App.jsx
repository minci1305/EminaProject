import { useState } from 'react';
import './App.css';
import ToDoList from './features/ToDoList';
import LogIn from './features/LogIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './features/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/todolist' element={<ToDoList />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
