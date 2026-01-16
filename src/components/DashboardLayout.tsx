"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Menu, Car, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "./DashboardSidebar";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface DashboardLayoutProps {
  children: React.ReactNode;
  onAddVehicle?: () => void;
}

const DashboardLayout = ({ children, onAddVehicle }: DashboardLayoutProps) => {
  const router = useRouter();
  const { setUser } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    toast.success("Déconnexion réussie");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex bg-muted">
      {/* Sidebar - Fixed on desktop */}
      <div className="hidden lg:block w-72 flex-shrink-0">
        <div className="fixed left-0 top-0 h-full w-72 z-40">
          <DashboardSidebar
            isOpen={true}
            onClose={() => { }}
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
        {/* Desktop Header */}
        <header className="hidden lg:flex bg-card border-b border-border p-4 items-center justify-end gap-4 sticky top-0 z-30">
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b border-border font-semibold">
                Notifications
              </div>
              <div className="p-4 text-sm text-center text-muted-foreground">
                Pas de nouvelles notifications
              </div>
            </PopoverContent>
          </Popover>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-4 py-2 h-auto hover:bg-muted rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${useApp().user?.name}`} />
                  <AvatarFallback>{useApp().user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-sm">
                  <span className="font-semibold">{useApp().user?.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">{useApp().user?.role === 'agency' ? 'Agence' : 'Client'}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/agence?tab=settings" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/agence?tab=settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

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
