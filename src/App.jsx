// Importing React and necessary components
import Dashboard from "./components/dashboard/Dashboard";
import DashboardSidebar from "./components/dashboard/DashboardSidebar"; // Default import
import { SidebarWrapper } from "./components/dashboard/DashboardSidebar"; // Named import
import { useSidebar } from "@/components/ui/sidebar"; // Ensure this is the correct path
import "./index.css";
import Header from "./components/dashboard/Header";
import ThemeProvider from "./components/dashboard/ThemeProvider";

function DashboardLayout() {
  const { toggleSidebar } = useSidebar(); // This will fail unless wrapped in SidebarProvider

  return (
    <div className="min-h-screen bg-background">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 pt-[70px]">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SidebarWrapper>
        <DashboardLayout />
      </SidebarWrapper>
    </ThemeProvider>
  );
}