
//component for each task item in the list, with checkbox and delete button
//child component of TodoList
export default function TaskItem({ task, onToggleComplete, onDelete }) {
    return (
        <div>
            <li className={`task-item ${task.isComplete ? "completed" : ""}`}>
                <input
                    type="checkbox"
                    checked={task.isComplete}
                    onChange={(e) => onToggleComplete(task.id, e.target.checked)}
                />
                <span
                    style={{
                        textDecoration: task.isComplete ? "line-through" : "none",
                        flex: 1,
                        color: task.isComplete ? "#888" : "inherit",
                    }}
                >
                    {task.task_description}
                </span>
                <button
                    className="delete-btn"
                    onClick={() => onDelete(task.id)}
                >
                    remove
                </button>
            </li>
        </div>
    );
}
