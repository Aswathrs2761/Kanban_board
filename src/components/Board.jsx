import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Column from "./Column";
import { useTasks } from "../store/TaskContext";

const columns = [
  { id: "todo", title: "To Do", color: "border-blue-400" },
  { id: "inprogress", title: "In Progress", color: "border-yellow-400" },
  { id: "done", title: "Done", color: "border-green-400" },
];

export default function Board() {
  const { tasks, moveTask } = useTasks();

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    moveTask(taskId, newStatus);
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="grid md:grid-cols-3 gap-6">
        {columns.map((col) => (
          <Column
            key={col.id}
            column={col}
            tasks={tasks.filter((t) => t.status === col.id)}
          />
        ))}
      </div>
    </DndContext>
  );
}
