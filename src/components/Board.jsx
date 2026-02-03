import { DndContext } from "@dnd-kit/core";
import { useTasks } from "../store/TaskContext";
import Column from "./Column";

const columns = [
  { id: "todo", title: "To Do" },
  { id: "inprogress", title: "In Progress" },
  { id: "done", title: "Done" },
];

export default function Board() {
  const { tasks, updateTask } = useTasks();

  function onDragEnd(e) {
    const { active, over } = e;
    if (!over) return;

    updateTask(active.id, { status: over.id });
  }

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="grid md:grid-cols-3 gap-6">
        {columns.map((c) => (
          <Column
            key={c.id}
            column={c}
            tasks={tasks.filter((t) => t.status === c.id)}
          />
        ))}
      </div>
    </DndContext>
  );
}
