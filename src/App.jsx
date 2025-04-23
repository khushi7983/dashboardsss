// Importing React and necessary components
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardNDV from "./components/dashboard/DashboardNDV";
import DashboardSidebar from "./components/dashboard/DashboardSidebar"; // Default import
import { SidebarWrapper } from "./components/dashboard/DashboardSidebar"; // Named import
import { useSidebar } from "@/components/ui/sidebar"; // Ensure this is the correct path
import "./index.css";
import Header from "./components/dashboard/Header";
import ThemeProvider from "./components/dashboard/ThemeProvider";
import Hierarchy from "./components/dashboard/Hierarchy";
import DashboardASD from './components/dashboard/DashboardASD';
import DashboardHr from './components/dashboard/DashboardHr';

function DashboardLayout() {
  const { toggleSidebar } = useSidebar(); // This works because it's wrapped in SidebarProvider

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <DashboardSidebar className="w-64 flex-shrink-0" /> {/* Fixed sidebar width */}
        <main className="flex-1 w-full pt-[70px] overflow-auto bg-inherit">
  <div className="w-full h-full">
    <Routes>
      <Route path="/" element={<DashboardASD />} />
      <Route path="/nvd_dashboard" element={<DashboardNDV />} />
      <Route path="/hr_dashboard" element={<DashboardHr />} />
      <Route path="/hierarchy" element={<Hierarchy />} />
    </Routes>
  </div>
</main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <SidebarWrapper>
          <DashboardLayout />
        </SidebarWrapper>
      </Router>
    </ThemeProvider>
  );
}