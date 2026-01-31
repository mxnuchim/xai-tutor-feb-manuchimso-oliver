import { MoreHorizontal, Plus } from "lucide-react";
import { Task, TaskStatus } from "@/types/task.types";
import TaskCard from "./TaskCard";

interface BoardColumnProps {
  title: TaskStatus;
  tasks: Task[];
  statusColor: string;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onAddTask: (status: TaskStatus) => void;
}

export default function BoardColumn({
  title,
  tasks,
  statusColor,
  onEdit,
  onDelete,
  onAddTask,
}: BoardColumnProps) {
  const getStatusColor = () => {
    switch (title) {
      case "Pending":
        return "bg-pending";
      case "In Progress":
        return "bg-inProgress";
      case "Completed":
        return "bg-completed";
      case "Launched":
        return "bg-launched";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="flex-shrink-0 w-80">
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
            <h2 className="font-medium text-sm text-gray-700">{title}</h2>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1 hover:bg-gray-200 rounded">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
            <button
              onClick={() => onAddTask(title)}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <Plus className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
