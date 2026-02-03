import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useTasks } from "../store/TaskContext";
import TaskModal from "./TaskModal";   // ✅ EDIT dialog ONLY

export default function TaskCard({ task }) {
  const { deleteTask } = useTasks();
  const [openEdit, setOpenEdit] = useState(false);

  const { setNodeRef, listeners, attributes, transform, transition } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="rounded-2xl p-4 border bg-gradient-to-br from-white to-slate-50 shadow-sm"
      >
        <div
          {...listeners}
          {...attributes}
          className="cursor-grab text-xs text-slate-400 mb-2"
        >
          ⋮⋮ Drag
        </div>

        <h3 className="font-semibold mb-1">{task.title}</h3>

        <p className="text-sm text-slate-600 line-clamp-2 mb-3">
          {task.description}
        </p>

        <div className="flex gap-2 mb-4">
          {task.tag && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-violet-100 text-violet-700">
              {task.tag}
            </span>
          )}

          <span
            className={`px-2 py-0.5 text-xs rounded-full
              ${
                task.priority === "High"
                  ? "bg-rose-100 text-rose-700"
                  : task.priority === "Medium"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
          >
            {task.priority}
          </span>
        </div>

        <div className="flex justify-end gap-2">
          {/* ✅ EDIT */}
          <button
            type="button"
            onClick={() => setOpenEdit(true)}
            className="text-xs px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => deleteTask(task.id)}
            className="text-xs px-3 py-1 rounded-lg bg-rose-50 text-rose-700"
          >
            Delete
          </button>
        </div>
      </div>

      {/* ✅ ONLY edit modal here */}
      {openEdit && (
        <TaskModal
          task={task}
          onClose={() => setOpenEdit(false)}
        />
      )}
    </>
  );
}
