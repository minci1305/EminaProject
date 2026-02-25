import React from "react";

export default function TaskItem({ task, onToggleComplete, onDelete}) {

    return (
    <div>
        <li className={`task-item ${task.isComplete ? "completed" : ""}`}> 
       <input
       type="checkbox"
       onClick={(!task.isComplete)}
       checked={(task.isComplete)}
       onChange={(e) => onToggleComplete(task.id, e.target.checked)}
       />
       <span style={{ 
                textDecoration: task.isComplete ? 'line-through' : 'none',
                flex: 1,
                color: task.isComplete ? '#888' : 'inherit'
            }}>
            {task.task_description}
            </span>
        <button onClick={() => onDelete(task.id)}>
        Delete
        </button> 
       </li>
    </div>
    );
}
