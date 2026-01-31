import {
  LayoutDashboard,
  Inbox,
  Users,
  BarChart3,
  Settings,
  ChevronDown,
  Plus,
  Folder,
  Circle,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      <div className="p-4">
        <button className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <div className="flex items-center gap-2">
            <Circle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">OnPoint Studio</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="px-4 mb-4">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-purple-700">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add New</span>
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
          <LayoutDashboard className="w-5 h-5 text-gray-600" />
          <span className="text-sm">Dashboard</span>
        </button>

        <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100">
          <div className="flex items-center gap-3">
            <Inbox className="w-5 h-5 text-gray-600" />
            <span className="text-sm">Inbox</span>
          </div>
          <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
            4
          </span>
        </button>

        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
          <Users className="w-5 h-5 text-gray-600" />
          <span className="text-sm">Teams</span>
        </button>

        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
          <BarChart3 className="w-5 h-5 text-gray-600" />
          <span className="text-sm">Analytics</span>
        </button>

        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
          <Settings className="w-5 h-5 text-gray-600" />
          <span className="text-sm">Settings</span>
        </button>

        <div className="pt-4">
          <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100">
            <div className="flex items-center gap-2">
              <Circle className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium">Add Projects</span>
            </div>
          </button>

          <div className="mt-2 space-y-1">
            <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100">
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-gray-400" />
                <span className="text-sm">Main Project</span>
              </div>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            <div className="ml-6 space-y-1">
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-50 border-l-2 border-primary">
                <Folder className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">
                  Design Project
                </span>
              </button>

              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <Folder className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">Carl UI/UX</span>
              </button>

              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <Folder className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">
                  Hajime Illustrations
                </span>
              </button>
            </div>

            <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100">
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-gray-400" />
                <span className="text-sm">Landing Page Project</span>
              </div>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100">
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-gray-400" />
                <span className="text-sm">Yellow Branding</span>
              </div>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
          </div>
        </div>
      </nav>

      <div className="p-4 space-y-2 border-t border-gray-200">
        <button className="w-full px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">
          Invite Team
        </button>
        <button className="w-full px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">
          Help
        </button>
      </div>
    </aside>
  );
}
