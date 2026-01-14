import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Car } from "lucide-react";
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
      {/* Sidebar - Fixed on desktop */}
      <div className="hidden lg:block w-72 flex-shrink-0">
        <div className="fixed left-0 top-0 h-full w-72">
          <DashboardSidebar
            isOpen={true}
            onClose={() => {}}
            onLogout={handleLogout}
            onAddVehicle={onAddVehicle}
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <DashboardSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={handleLogout}
          onAddVehicle={onAddVehicle}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar (Mobile only) */}
        <header className="lg:hidden bg-card border-b border-border p-4 flex items-center justify-between sticky top-0 z-30">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Car className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">Drivo</span>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
