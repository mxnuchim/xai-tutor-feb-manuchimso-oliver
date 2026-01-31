import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import KanbanBoard from "@/components/board/KanbanBoard";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto bg-gray-50">
            <KanbanBoard />
          </div>
        </main>
      </div>
    </div>
  );
}
