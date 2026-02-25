import { use, useState } from "react";

const Parse = window.Parse;
const Task = Parse.Object.extend("Task");

export async function newTaskItem(description, priority) {
     const currentUser = Parse.User.current();
    if (!currentUser) throw new Error("Not logged in");

    const Task = Parse.Object.extend("Task");
    const task = new Task();

    task.set("task_description", description);
    task.set("task_priority", priority);
    task.set("isComplete", false);
    task.set("task_owner", Parse.User.current());

    return await task.save();
}

export async function getTasks() {
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
}

export async function deleteItem(id) {
    const query = new Parse.Query(Task);
    const item = await query.get(id);
    return await item.destroy();
}

export async function updateState (id, isComplete) {
    const query = Parse.Query(Task);
    const item = await query.get(id);
    item.set("isComplete", isChecked);
    return await item.save();
}