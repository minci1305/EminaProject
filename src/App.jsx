import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./index.css";
import ToDoList from './features/ToDoList';
import LogIn from './features/LogIn';
import SignUp from './features/SignUp';
import { Navigate } from 'react-router-dom';


export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/todolist' element={<ToDoList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>

  );
}


