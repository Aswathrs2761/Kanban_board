import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const TaskContext = createContext();

const STORAGE_KEY = "kanban_tasks_v1";

const initialTasks = [
  {
    id: uuid(),
    title: "Design new dashboard layout",
    description:
      "Create wireframes and mockups for the new analytics dashboard with charts and KPIs.",
    status: "todo",
    tag: "Feature",
    priority: "High",
  },
  {
    id: uuid(),
    title: "Implement authentication flow",
    description:
      "Set up user login, registration, and password reset functionality using JWT tokens.",
    status: "todo",
    tag: "Feature",
    priority: "High",
  },
  {
    id: uuid(),
    title: "Research API rate limiting",
    description:
      "Investigate best practices for implementing API rate limiting to prevent abuse.",
    status: "inprogress",
    tag: "Research",
    priority: "Medium",
  },
  {
    id: uuid(),
    title: "Fix mobile navigation bug",
    description:
      "The hamburger menu doesn't close properly on iOS devices after navigation.",
    status: "inprogress",
    tag: "Bug",
    priority: "Medium",
  },
  {
    id: uuid(),
    title: "Update dependencies",
    description:
      "Review and update all npm packages to their latest stable versions.",
    status: "done",
    tag: "Enhancement",
    priority: "Low",
  },
];

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, { ...task, id: uuid() }]);
  };

  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const moveTask = (id, status) => {
    updateTask(id, { status });
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, moveTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
