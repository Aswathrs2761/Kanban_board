import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const TaskContext = createContext();
export const useTasks = () => useContext(TaskContext);

const STORAGE_KEY = "kanban_tasks";

const demo = [
  {
    id: uuid(),
    title: "Design new dashboard layout",
    description:
      "Create wireframes and mockups for the new analytics dashboard.",
    status: "todo",
    tag: "Feature",
    priority: "High",
  },
  {
    id: uuid(),
    title: "Fix mobile navigation bug",
    description:
      "The hamburger menu doesn't close properly on iOS devices.",
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
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : demo;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((p) => [...p, { ...task, id: uuid() }]);
  };

  const updateTask = (id, updates) => {
    setTasks((p) =>
      p.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((p) => p.filter((t) => t.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}
