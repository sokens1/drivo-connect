import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "./DashboardSidebar";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
  onAddVehicle?: () => void;
}

const DashboardLayout = ({ children, onAddVehicle }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    toast.success("Déconnexion réussie");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-muted">
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
        onAddVehicle={onAddVehicle}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar (Mobile) */}
        <header className="lg:hidden bg-card border-b border-border p-4 flex items-center justify-between sticky top-0 z-30">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <span className="font-display font-bold text-lg">Drivo</span>
          <div className="w-10" /> {/* Spacer */}
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
