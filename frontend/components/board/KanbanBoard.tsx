"use client";

import { useEffect, useState } from "react";
import { Task, TaskStatus } from "@/types/task.types";
import BoardColumn from "./BoardColumn";
import BoardHeader from "./BoardHeader";
import AddTaskModal from "../shared/modal/AddTaskModal";
import EditTaskModal from "../shared/modal/EditTaskModal";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "@/actions/tasks.actions";

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>("Pending");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError("Failed to fetch tasks. Please try again.");
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (newTask: Omit<Task, "id">) => {
    try {
      const createdTask = await createTask(newTask);
      setTasks([...tasks, createdTask]);
    } catch (err) {
      console.error("Failed to create task:", err);
      alert("Failed to create task. Please try again.");
    }
  };

  const handleUpdateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const updatedTask = await updateTask(id, updates);
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    } catch (err) {
      console.error("Failed to update task:", err);
      alert("Failed to update task. Please try again.");
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
      alert("Failed to delete task. Please try again.");
    }
  };

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleAddTaskClick = (status?: TaskStatus) => {
    setDefaultStatus(status || "Pending");
    setIsAddModalOpen(true);
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  const statuses: TaskStatus[] = [
    "Pending",
    "In Progress",
    "Completed",
    "Launched",
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <>
      <BoardHeader onAddTask={() => handleAddTaskClick()} />

      <div className="flex gap-4 overflow-x-auto p-6">
        {statuses.map((status) => (
          <BoardColumn
            key={status}
            title={status}
            tasks={getTasksByStatus(status)}
            statusColor=""
            onEdit={handleEditClick}
            onDelete={handleDeleteTask}
            onAddTask={handleAddTaskClick}
          />
        ))}
      </div>

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(task) => handleAddTask({ ...task, status: defaultStatus })}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        task={selectedTask}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateTask}
      />
    </>
  );
}
