import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const styles = {
  todo: "bg-blue-50/60 border-blue-400",
  inprogress: "bg-yellow-50/60 border-yellow-400",
  done: "bg-green-50/60 border-green-400",
};

export default function Column({ column, tasks }) {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div
      ref={setNodeRef}
      className={`rounded-2xl p-4 border-2 ${styles[column.id]}`}
    >
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold">{column.title}</h2>
        <span className="text-sm text-slate-500">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-4 min-h-[200px]">
        {tasks.map((t) => (
          <TaskCard key={t.id} task={t} />
        ))}
      </div>
    </div>
  );
}
