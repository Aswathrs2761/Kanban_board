import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const styles = {
  todo: {
    wrapper: "border-blue-400 bg-blue-50/60",
    dot: "bg-blue-500",
  },
  inprogress: {
    wrapper: "border-yellow-400 bg-yellow-50/60",
    dot: "bg-yellow-500",
  },
  done: {
    wrapper: "border-green-400 bg-green-50/60",
    dot: "bg-green-500",
  },
};

export default function Column({ column, tasks }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const style = styles[column.id];

  return (
    <div
      ref={setNodeRef}
      className={`rounded-2xl p-4 border-2 ${style.wrapper}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            className={`h-3 w-3 rounded-full ${style.dot}`}
          ></span>
          <h2 className="font-semibold text-slate-800">
            {column.title}
          </h2>
        </div>

        <span className="text-sm font-medium text-slate-600">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-4 min-h-[200px]">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
