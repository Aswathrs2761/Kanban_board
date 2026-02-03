import { useEffect, useState } from "react";
import { useTasks } from "../store/TaskContext";

export default function TaskModal({ task, onClose }) {
  const { updateTask, deleteTask } = useTasks();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
    tag: "",
    priority: "Medium",
  });

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

  if (!task) return null;

  function submit(e) {
    e.preventDefault();
    updateTask(task.id, form);
    onClose();
  }

  function remove() {
    deleteTask(task.id);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        onSubmit={submit}
        className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-5">Edit Task</h2>

        <div className="space-y-4">
          <input
            className="w-full border rounded-xl px-4 py-2"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            className="w-full border rounded-xl px-4 py-2"
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <div className="grid grid-cols-3 gap-3">
            <select
              className="border rounded-xl px-3 py-2"
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
              className="border rounded-xl px-3 py-2"
              value={form.tag}
              onChange={(e) =>
                setForm({ ...form, tag: e.target.value })
              }
            />

            <select
              className="border rounded-xl px-3 py-2"
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

        <div className="flex justify-between mt-7">
          <button
            type="button"
            onClick={remove}
            className="text-red-600"
          >
            Delete
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 text-white"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
