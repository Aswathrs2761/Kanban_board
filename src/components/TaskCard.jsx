import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import TaskModal from "./TaskModal";
import { useTasks } from "../store/TaskContext";

export default function TaskCard({ task }) {
  const { deleteTask } = useTasks();
  const [open, setOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
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
        className="relative rounded-2xl p-4 border bg-gradient-to-br from-white to-slate-50 shadow-sm hover:shadow-md transition"
      >
        {/* Drag handle */}
        <div
          {...listeners}
          {...attributes}
          className="cursor-grab active:cursor-grabbing mb-2 flex items-center gap-2 text-slate-400 text-xs"
        >
          <span className="text-base">⋮⋮</span>
          Drag
        </div>

        <h3 className="font-semibold text-slate-800 mb-1">
          {task.title}
        </h3>

        <p className="text-sm text-slate-600 line-clamp-2 mb-3">
          {task.description}
        </p>

        {/* badges */}
        <div className="flex gap-2 flex-wrap mb-4">
          {task.tag && (
            <span className="px-2.5 py-0.5 text-xs rounded-full bg-violet-100 text-violet-700 font-medium">
              {task.tag}
            </span>
          )}

          <span
            className={`px-2.5 py-0.5 text-xs rounded-full font-medium
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

        {/* actions */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-xs px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => deleteTask(task.id)}
            className="text-xs px-3 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-medium"
          >
            Delete
          </button>
        </div>
      </div>

      {open && <TaskModal task={task} onClose={() => setOpen(false)} />}
    </>
  );
}
