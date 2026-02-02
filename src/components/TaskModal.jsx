import { useEffect, useState } from "react";
import { useTasks } from "../store/TaskContext";

export default function TaskModal({ task, onClose }) {
  const { updateTask, deleteTask } = useTasks();

  // ✅ protect against undefined task
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "todo",
        tag: task.tag || "",
        priority: task.priority || "Medium",
      });
    }
  }, [task]);

  // ✅ if task is not ready, render nothing
  if (!task || !form) return null;

  function handleSave() {
    if (!form.title.trim()) return;

    updateTask(task.id, {
      ...form,
    });

    onClose();
  }

  function handleDelete() {
    deleteTask(task.id);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-5">Edit Task</h2>

        <div className="space-y-4">
          <input
            className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <div className="grid grid-cols-3 gap-3">
            <select
              className="border rounded-xl px-3 py-2 bg-blue-50 text-blue-700 font-medium"
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>

            <input
              className="border rounded-xl px-3 py-2 bg-purple-50 text-purple-700"
              value={form.tag}
              onChange={(e) =>
                setForm({ ...form, tag: e.target.value })
              }
              placeholder="Tag"
            />

            <select
              className={`border rounded-xl px-3 py-2 font-medium
                ${
                  form.priority === "High"
                    ? "bg-red-50 text-red-700"
                    : form.priority === "Medium"
                    ? "bg-yellow-50 text-yellow-700"
                    : "bg-green-50 text-green-700"
                }`}
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between mt-7">
          <button
            onClick={handleDelete}
            className="text-red-600 font-medium hover:underline"
          >
            Delete
          </button>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-blue-600 text-white"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
