import { useState } from 'react';
import './App.css';
import ToDoList from './features/ToDoList';
import LogIn from './features/LogIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LogIn />} />
        <Route path='/todolist' element={<ToDoList />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
