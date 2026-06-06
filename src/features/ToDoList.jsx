import { useEffect, useState } from 'react';
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

    //loads tasks on page load and whenever currentUser changes (e.g. on login/logout)
    useEffect(() => {
        if (!currentUser) return; 
        const loadTasks = async () => {
            try {
                const tasks = await getTasks();
                setList(tasks);
            } catch (error) {
                console.error("Error loading tasks:", error);
                throw new Error("Failed to load tasks");
            }
        };
        loadTasks();
    }, [currentUser]);

    //handler calls logOut()  from authService.js, clears user state and redirects to login page
    const handleLogOut = async () => {
        try {
            await logOut();
            setUser(null);
            navigate("/");
        } catch (error) {
            console.error("Failed logging out", error);
        }
    }

    //handler for adding a new task, calls newTaskItem() from taskService.js and updates the list state
    async function handleAddClick() {
        const newItem = await newTaskItem(input);
        const formattedItem = {
            id: newItem.id,
            task_description: newItem.get("task_description"),
            isComplete: false,
            };
            setList([...list, formattedItem]);
            setInput("");
    }

    //handler for deleting a task, calls deleteItem() from taskService.js and updates the list state
    async function handleDelete(id) {
        try {
            await deleteItem(id);
            setList(list.filter(task => task.id !== id));  
        } catch (error) {
            console.error("Error deleting task:", error);
            throw new Error("Failed to delete task. Please try again.");
        }
    }

    //handler for and helper function for deleting all completed tasks(marked as complete via line-through in TaskItem.jsx) 
    //calls deleteItem() for each completed task and updates the list state
    async function handleDeleteCompleted() {
        try {
            const completedTasks = list.filter(task => task.isComplete);
            await Promise.all(completedTasks.map(task => deleteItem(task.id)));
            setList(list.filter(task => !task.isComplete));            
        } catch (error) {
            console.error("Error deleting completed tasks:", error);
                throw new Error("Failed to delete completed tasks. Please try again.");
        }
    }

    //handler for toggling task completion, calls updateState() from taskService.js and updates the list state (boolean in the DB)
    //also helper for TaskItem.jsx to update the UI (line-through for completed tasks) enabling deleting completed tasks via handleDeleteCompleted()
    async function handleCheck(id, isChecked) {
        try {
          await updateState(id, isChecked);
          const newList = list.map(task => task.id === id? {...task, isComplete: isChecked} : task);
          setList(newList);
        } catch (error) {
          console.error("Error updating task state:", error);
        }
    }

    return (
    <div className='login-page'>
        <div className='login-card' style={{minHeight: '600px'}}>
             <h1>Welcome back, {currentUser?.username}!</h1>
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
                    placeholder="Add task"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleAddClick();
                        }
                    }}
                    />
                <button disabled={!input.trim()} onClick= {handleAddClick}>Add</button>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                     <button onClick={handleDeleteCompleted}>Delete Completed</button> 
                     <button onClick={handleLogOut}>Sign out</button>
                </div>
             </div>
        </div>

    );
}

