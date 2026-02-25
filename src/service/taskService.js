
const Parse = window.Parse;
const Task = Parse.Object.extend("Task");

export async function newTaskItem(description, priority) {
    try {
        const currentUser = Parse.User.current();
        if (!currentUser) throw new Error("Not logged in");

        const task = new Task();

        task.set("task_description", description);
        task.set("task_priority", priority);
        task.set("isComplete", false);
        task.set("task_owner", Parse.User.current());

        return await task.save();
    } catch (error) {
        throw new Error("Failed to create task: " + error.message);
    }
}

export async function getTasks() {
    try {
        const query = new Parse.Query(Task);
        query.equalTo("task_owner", Parse.User.current());
        const results = await query.find();
        return results.map((task) => ({
            id: task.id,
            priority: task.get("task_priority"),
            task_owner: task.get("task_owner"),
            task_description: task.get("task_description"),
            isComplete: task.get("isComplete"),
        }));
    } catch (error) {
        throw new Error("Failed to get tasks: " + error.message);
    }
}

export async function deleteItem(id) {
    try {
       const query = new Parse.Query(Task);
        const item = await query.get(id);
        return await item.destroy(); 
    } catch (error) {
        throw new Error("Failed to delete task: " + error.message);
    } 
}


export async function updateState (id, isComplete) {
    try {
        const query = new Parse.Query(Task);
        const item = await query.get(id);
        item.set("isComplete", isComplete);
        return await item.save();
    } catch (error) {
        throw new Error("Failed to update task state: " + error.message);
    }
    
}