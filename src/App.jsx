import { useState } from 'react'
import './App.css'
import ToDoList from './ToDoList';

function App() {

  return (
    <>
  <h1>Welcome back!</h1>
  <ToDoList name="Urgent"/>
  <ToDoList name="Important"/>
    </>
  );
}

export default App;
