import { useEffect, useState } from 'react';
import { Title } from '../components/Title.js';
import { getCurrentUser, logOut } from '../service/authService.js';
import { getTasks, newTaskItem, deleteItem, updateState } from '../service/taskService.js';
import TaskItem from '../components/TaskItem.jsx';
import { useNavigate } from 'react-router-dom';

export default function ToDoList() {
    const [list, setList] = useState([]);
    const [input, setInput] = useState("");
    const [currentUser, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = getCurrentUser();
        if (user) {
            setUser(user);
        } else {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        if (!currentUser) return; 
        const loadTasks = async () => {
            try {
                const tasks = await getTasks();
                setList(tasks);
            } catch (error) {
                console.error("Error loading tasks:", error);
            }
        };
        loadTasks();
    }, [currentUser]);

    
    
    
    
        const handleIsLoggedIn = async () => {
        const user = getCurrentUser();
        setUser(user);
    }

    const handleLogOut = async () => {
        try {
            await logOut();
            setUser(null);
        } catch (error) {
            console.error("Failed logging out", error);
        }
    }

    useEffect(() => {
        const loadTasks = async () => {
                const data = await getTasks();
                setList(data);
        };
        loadTasks();
    }, []);


    async function handleAddClick() {
        if (!input.trim()) {
            alert("Please enter a task description.");
            return;
        }
        const newItem = await newTaskItem(input);
        const formattedItem = {
            id: newItem.id,
            task_description: newItem.get("task_description"),
            isComplete: false,
            };
            setList([...list, formattedItem]);
            setInput("");
    }

    async function handleDelete(id) {
        await deleteItem(id);
        setList(list.filter(task => task.id !== id));
    }

    async function handleDeleteCompleted() {
        const completedTasks = list.filter(task => task.isComplete);
        await Promise.all(completedTasks.map(task => deleteItem(task.id)));
        setList(list.filter(task => !task.isComplete));
    }

    async function handleCheck(id, isChecked) {
        await updateState(id, isChecked);
        setList(list.map(t => t.id == id ? {...t, isComplete: isChecked} : t));

    }

    async function handleToggle(id, isChecked) {
    try {
        await updateState(id, isChecked); 
        const newList = list.map(item => 
            item.id === id ? { ...item, isComplete: isChecked } : item
        );
        setList(newList);
    } catch (error) {
        console.error("Failed to toggle task:", error);
    }
}


    return (
    <div className='login-page'>
        <div className='login-card' style={{minHeight: '600px'}}>
             <Title>Welcome back!</Title>
                <ul className="task-list">
                   {list.map((elem) => (
                      <TaskItem
                         key={elem.id}
                         task={elem}
                         onToggleComplete={handleCheck}
                         onDelete={handleDelete}
                       />
                      ))}
               </ul> 
                 <div style={{display: 'flex', gap:'10px', justifyContent: 'center', marginTop:'20px'}}>
                    <input
                    type="text"
                    placeholder="Add a new task"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ margin: 0, flex: 1 }}
                    />
                <button onClick={handleAddClick}>Add</button>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                     <button onClick={handleDeleteCompleted}>Delete Completed</button> 
                     <button onClick={async () => { await logOut(); navigate("/");}}>Sign out</button>
                </div>
             </div>
        </div>

    );
}

