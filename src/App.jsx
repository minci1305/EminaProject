import { useState } from 'react'
import './App.css'
import ToDoList from './components/ToDoList';

function App() {

  return (
    <>
  <h1>Welcome back!</h1>
  <ToDoList name="Urgent" initialList={["Buy groceries", "Walk the dog"]} />
  <ToDoList name="Important" initialList={["Clean the house", "Call mom"]} />
    </>
  );
}

export default App;
