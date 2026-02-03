import { useState } from "react";
import Board from "./components/Board";
import TaskForm from "./components/TaskForm";   // ✅ only NEW task dialog here

export default function App() {
  const [openNew, setOpenNew] = useState(false);

  return (
    <div className="min-h-screen p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Kanban Board</h1>
          <p className="text-sm text-slate-500">
            Manage your tasks across columns
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpenNew(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          + New Task
        </button>
      </div>

      <Board />

      {/* ✅ only NEW TASK modal here */}
      {openNew && <TaskForm onClose={() => setOpenNew(false)} />}
    </div>
  );
}
