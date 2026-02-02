import React, { useState } from "react";
import { useTasks } from "../store/TaskContext";

const TaskForm = () => {
  const { addTask } = useTasks();
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "To Do",
    priority: "Medium",
    tags: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return;
    addTask(task);
    setTask({ title: "", description: "", status: "To Do", priority: "Medium", tags: [] });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 p-4 bg-white rounded-xl shadow-md border border-gray-200"
    >
      <input
        className="flex-1 border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
        placeholder="Task title..."
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
        Add
      </button>
    </form>
  );
};

export default TaskForm;   // <-- This line is required
