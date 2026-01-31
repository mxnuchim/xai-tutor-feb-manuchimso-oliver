import { Calendar, Flag, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Task } from "@/types/task.types";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const priorityColor =
    task.priority === "High Priority" ? "text-red-500" : "text-blue-500";

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900 flex-1">
          {task.title}
        </h3>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <button
                onClick={() => {
                  onEdit(task);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete(task.id);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            {task.assignees.map((assignee, index) => (
              <div
                key={index}
                className="w-6 h-6 bg-purple-400 rounded-full border-2 border-white flex items-center justify-center"
              >
                <span className="text-white text-xs font-medium">
                  {assignee.charAt(0).toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{task.dueDate}</span>
            {task.isOverdue && (
              <span className="ml-1 text-red-500 font-medium">Overdue</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Flag className={`w-3 h-3 ${priorityColor}`} />
          <span className={`text-xs ${priorityColor}`}>{task.priority}</span>
        </div>
      </div>
    </div>
  );
}
