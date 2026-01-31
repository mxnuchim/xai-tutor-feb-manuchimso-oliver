import {
  Edit2,
  Share2,
  Zap,
  ChevronDown,
  SlidersHorizontal,
  Plus,
} from "lucide-react";

interface BoardHeaderProps {
  onAddTask: () => void;
}

export default function BoardHeader({ onAddTask }: BoardHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            Design Project
            <Edit2 className="w-4 h-4 text-gray-400" />
          </h1>
          <div className="flex -space-x-2">
            <div className="w-8 h-8 bg-blue-400 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-xs font-medium">A</span>
            </div>
            <div className="w-8 h-8 bg-purple-400 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-xs font-medium">B</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Share2 className="w-4 h-4" />
            <span className="text-sm">Share</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Zap className="w-4 h-4" />
            <span className="text-sm">Automation</span>
          </button>
        </div>
      </div>

      <div className="px-6 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            Overview
          </button>
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            List
          </button>
          <button className="px-4 py-2 text-sm text-primary border-b-2 border-primary font-medium">
            Board
          </button>
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            Calendar
          </button>
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            Files
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm">
              <span className="text-gray-600">Due Date</span>
              <span className="font-medium">March 17 - 20</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm">
              <span className="text-gray-600">Assignee</span>
              <span className="font-medium">All</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm">
              <span className="text-gray-600">Priority</span>
              <span className="font-medium">All</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Advance Filters</span>
            </button>
          </div>

          <button
            onClick={onAddTask}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add New</span>
          </button>
        </div>
      </div>
    </div>
  );
}
