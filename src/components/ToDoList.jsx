import { useState } from 'react';
export default function ToDoList({name, initialList}) {
    const [list, setList] = useState([initialList]);
    const [input, setInput] = useState("");

    function handleRemoveAllClick() {
        setList([]);
    }

    function handleInputChange(event) {
        setInput(event.target.value);
    }

    function handleAddClick() {
        setList([...list, input]);
    }

    return (
        <div>
        <h1>{name}</h1>
        <ul> 
            {list.map((elem) => <li>{elem}</li>
        )}
        </ul>
        <input type="text" onChange={handleInputChange}></input>
        <button onClick={handleAddClick}>Add</button>
        <button onClick={(handleRemoveAllClick)}>Remove All</button>
        </div>

    )
}
