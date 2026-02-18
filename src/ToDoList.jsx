import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Title, Wrapper } from './components/Title.js';

export default function ToDoList({name}) {
    const [list, setList] = useState([]);
    const [input, setInput] = useState("");

    function handleInputChange(event) {
        setInput(event.target.value);
    }

    function handleAddClick() {
        setList([...list, {id: uuidv4(), name:input}]);
    }

    return (
        <>
        <Wrapper>
            <Title>{name}</Title>
        </Wrapper>
  
        <ul> 
            {list.map((elem) => (
                 <li key={uuidv4}> {elem.name}</li>
            ))};
        </ul>
        <input type="text" onChange={handleInputChange}></input>
        <button onClick={handleAddClick}>Add</button>
        <button onClick={(handleRemoveAllClick)}>Remove All</button>
        </>

    )
}
