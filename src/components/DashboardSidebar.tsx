import { Link, useLocation } from "react-router-dom";
import { 
  Car, 
  LayoutDashboard, 
  Heart, 
  Calendar, 
  User, 
  Settings, 
  LogOut, 
  BarChart3, 
  Plus,
  MessageSquare,
  Bell,
  FileText,
  HelpCircle,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href?: string;
  onClick?: () => void;
  badge?: number;
}

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onAddVehicle?: () => void;
}

const DashboardSidebar = ({ isOpen, onClose, onLogout, onAddVehicle }: DashboardSidebarProps) => {
  const location = useLocation();
  const { user } = useApp();
  
  const isAgency = user?.role === "agency";

  const clientMenuItems: SidebarItem[] = [
    { icon: LayoutDashboard, label: "Tableau de bord", href: "/dashboard" },
    { icon: Heart, label: "Mes favoris", href: "/favoris" },
    { icon: Calendar, label: "Réservations", href: "/dashboard?tab=reservations" },
    { icon: Car, label: "Rechercher", href: "/recherche" },
    { icon: Building2, label: "Agences", href: "/agences" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard?tab=messages", badge: 2 },
    { icon: Bell, label: "Notifications", href: "/dashboard?tab=notifications", badge: 5 },
    { icon: User, label: "Mon profil", href: "/dashboard?tab=profile" },
    { icon: HelpCircle, label: "Aide & Support", href: "/contact" },
  ];

  const agencyMenuItems: SidebarItem[] = [
    { icon: LayoutDashboard, label: "Tableau de bord", href: "/dashboard/agence" },
    { icon: Car, label: "Mes véhicules", href: "/dashboard/agence?tab=vehicles" },
    { icon: BarChart3, label: "Statistiques", href: "/dashboard/agence?tab=analytics" },
    { icon: Calendar, label: "Réservations", href: "/dashboard/agence?tab=reservations", badge: 3 },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/agence?tab=messages", badge: 4 },
    { icon: Bell, label: "Notifications", href: "/dashboard/agence?tab=notifications", badge: 7 },
    { icon: FileText, label: "Documents", href: "/dashboard/agence?tab=documents" },
    { icon: Settings, label: "Paramètres", href: "/dashboard/agence?tab=settings" },
    { icon: HelpCircle, label: "Aide & Support", href: "/contact" },
  ];

  const menuItems = isAgency ? agencyMenuItems : clientMenuItems;

  const isActive = (href?: string) => {
    if (!href) return false;
    const [path, query] = href.split("?");
    if (query) {
      return location.pathname === path && location.search.includes(query);
    }
    return location.pathname === path && !location.search;
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-72 bg-card border-r border-border z-50 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">Drivo</span>
            </Link>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{user?.name}</p>
                <Badge variant={isAgency ? "success" : "secondary"} className="text-xs">
                  {isAgency ? "Agence" : "Client"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Add Vehicle Button (Agency only) */}
          {isAgency && onAddVehicle && (
            <div className="p-4 border-b border-border">
              <Button variant="hero" className="w-full" onClick={onAddVehicle}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un véhicule
              </Button>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  {item.href ? (
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                        isActive(item.href)
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && item.badge > 0 && (
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-bold",
                          isActive(item.href) 
                            ? "bg-primary-foreground/20 text-primary-foreground"
                            : "bg-primary text-primary-foreground"
                        )}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ) : (
                    <button
                      onClick={item.onClick}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all w-full"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="flex-1 text-left">{item.label}</span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-border space-y-2">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
            >
              <Car className="h-5 w-5" />
              <span>Retour au site</span>
            </Link>
            <button
              onClick={onLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all w-full"
            >
              <LogOut className="h-5 w-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
