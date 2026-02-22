import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Title, Wrapper } from '../components/Title.js';
import { Link, NavLink } from 'react-router-dom';
import LogIn from './LogIn.jsx';

export default function ToDoList({name}) {
    const [list, setList] = useState([]);
    const [input, setInput] = useState("");

    function handleInputChange(event) {
        setInput(event.target.value);
        
    }

    function handleAddClick() {
        setList([...list, {id:uuidv4(), name:input, done:false}]);
        setInput("");
    }

    function handleCheckBox(element_id) {
        let newList= list.map(e => {
            return e.id == element_id ? {id:e.id, name:e.name, done: !e.done} : e;
        });
        setList(newList);

    }


    return (
        <>
        <Wrapper>
            <Title>{name}</Title>
        <ul> 
            {list.map((elem) => (
                 <li 
                 style={{textDecoration: elem.done ? "line-through" : ""}} 
                 key={elem.id}> 
                 {elem.name}
                 <input type="checkbox" value={elem.done} onClick={() => handleCheckBox(elem.id)}></input>
                 </li>
            ))}
        </ul>
        <input type="text" onChange={handleInputChange}></input>
        <button onClick={handleAddClick}>Add</button>
        <button onClick={() => setList([])}>Remove All</button>
         </Wrapper>
        </>

    )
}
