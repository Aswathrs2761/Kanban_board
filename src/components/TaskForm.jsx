import { useState } from "react";
import { useTasks } from "../store/TaskContext";

export default function TaskForm({ onClose }) {
  const { addTask } = useTasks();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
    tag: "",
    priority: "Medium",
  });

  function submit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;

    addTask(form);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        onSubmit={submit}
        className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-5">
          New Task
        </h2>

        <div className="space-y-4">
          <input
            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <div className="grid grid-cols-3 gap-3">
            <select
              className="border rounded-xl px-3 py-2 bg-blue-50 text-blue-700"
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
              placeholder="Tag"
              value={form.tag}
              onChange={(e) =>
                setForm({ ...form, tag: e.target.value })
              }
            />

            <select
              className="border rounded-xl px-3 py-2 bg-yellow-50 text-yellow-700"
              value={form.priority}
              onChange={(e) =>
                setForm({
                  ...form,
                  priority: e.target.value,
                })
              }
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-7">
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
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
