import Board from "./components/Board";
import NewTaskModal from "./components/TaskModal";
import { useState } from "react";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Kanban Board</h1>
          <p className="text-sm text-slate-500">
            Manage your tasks across columns
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          + New Task
        </button>
      </div>

      <Board />

      {open && <NewTaskModal onClose={() => setOpen(false)} />}
    </div>
  );
}
