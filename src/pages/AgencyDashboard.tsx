import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Car,
  Plus,
  Eye,
  Heart,
  Edit,
  Trash2,
  Upload,
  Calendar,
  DollarSign,
  Bell,
  Camera,
  MessageSquare,
  TrendingUp,
  Users,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DashboardLayout from "@/components/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { formatPrice, formatNumber, mockVehicles } from "@/data/mockData";
import { toast } from "sonner";

const AgencyDashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, setUser } = useApp();
  const [showAddVehicle, setShowAddVehicle] = useState(false);

  const activeTab = searchParams.get("tab") || "overview";

  const setActiveTab = (tab: string) => {
    if (tab === "overview") {
      setSearchParams({});
    } else {
      setSearchParams({ tab });
    }
  };

  // Mock agency vehicles
  const [agencyVehicles, setAgencyVehicles] = useState(mockVehicles.slice(0, 3));

  // New vehicle form state
  const [newVehicle, setNewVehicle] = useState({
    title: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    pricePerDay: 0,
    type: "vente",
    category: "sedan",
    km: 0,
    fuel: "essence",
    transmission: "manuelle",
    location: "Libreville",
    description: "",
  });

  // Redirect if not logged in as agency
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="pt-6 text-center">
              <Car className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Connexion requise</h2>
              <p className="text-muted-foreground mb-6">
                Connectez-vous avec un compte agence pour accéder à cet espace.
              </p>
              <div className="flex flex-col gap-3">
                <Button variant="hero" asChild>
                  <Link to="/connexion">Se connecter</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // Redirect client to their dashboard
  if (user.role === "client") {
    navigate("/dashboard");
    return null;
  }

  const handleAddVehicle = () => {
    if (!newVehicle.title || !newVehicle.brand) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    toast.success("Véhicule ajouté avec succès !");
    setShowAddVehicle(false);
    setNewVehicle({
      title: "",
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      price: 0,
      pricePerDay: 0,
      type: "vente",
      category: "sedan",
      km: 0,
      fuel: "essence",
      transmission: "manuelle",
      location: "Libreville",
      description: "",
    });
  };

  const handleDeleteVehicle = (id: string) => {
    setAgencyVehicles(agencyVehicles.filter((v) => v.id !== id));
    toast.success("Véhicule supprimé");
  };

  // Mock stats
  const stats = {
    totalVehicles: agencyVehicles.length,
    totalViews: agencyVehicles.reduce((acc, v) => acc + v.views, 0),
    totalInterests: agencyVehicles.reduce((acc, v) => acc + v.interests, 0),
    monthlyRevenue: 2500000,
  };

  // Mock notifications
  const notifications = [
    { id: 1, type: "interest", message: "Nouvel intérêt pour Toyota Land Cruiser", time: "Il y a 2h" },
    { id: 2, type: "reservation", message: "Nouvelle réservation - Hyundai Accent", time: "Il y a 5h" },
    { id: 3, type: "message", message: "Message de Jean-Pierre M.", time: "Hier" },
  ];

  // Mock messages
  const messages = [
    {
      id: "1",
      from: "Jean-Pierre M.",
      message: "Bonjour, le Land Cruiser est-il disponible ce weekend ?",
      time: "Il y a 1h",
      unread: true,
    },
    {
      id: "2",
      from: "Marie O.",
      message: "Merci pour les informations.",
      time: "Il y a 3h",
      unread: true,
    },
    {
      id: "3",
      from: "Patrick K.",
      message: "Je confirme la réservation pour le 20.",
      time: "Hier",
      unread: false,
    },
  ];

  // Mock reservations
  const reservations = [
    {
      id: "1",
      client: "Jean-Pierre M.",
      vehicle: agencyVehicles[0],
      startDate: "2024-02-20",
      endDate: "2024-02-25",
      status: "pending",
      totalPrice: 750000,
    },
    {
      id: "2",
      client: "Marie O.",
      vehicle: agencyVehicles[1],
      startDate: "2024-02-15",
      endDate: "2024-02-18",
      status: "confirmed",
      totalPrice: 135000,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "vehicles":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Mes véhicules ({agencyVehicles.length})</h2>
              <Button variant="hero" onClick={() => setShowAddVehicle(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </div>
            <div className="space-y-4">
              {agencyVehicles.map((vehicle) => (
                <Card key={vehicle.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <img
                        src={vehicle.image}
                        alt={vehicle.title}
                        className="w-full md:w-32 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{vehicle.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {vehicle.type !== "location" && (
                            <Badge variant="sale">Vente: {formatPrice(vehicle.price)}</Badge>
                          )}
                          {vehicle.pricePerDay && (
                            <Badge variant="rental">Location: {formatPrice(vehicle.pricePerDay)}/jour</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {vehicle.views} vues
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {vehicle.interests} intérêts
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link to={`/vehicule/${vehicle.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => handleDeleteVehicle(vehicle.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Statistiques</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance ce mois</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Vues</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{formatNumber(stats.totalViews)}</span>
                        <Badge variant="success" className="text-xs">+12%</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Intérêts</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{stats.totalInterests}</span>
                        <Badge variant="success" className="text-xs">+8%</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Réservations</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">5</span>
                        <Badge variant="success" className="text-xs">+25%</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Revenus</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{formatPrice(stats.monthlyRevenue)}</span>
                        <Badge variant="success" className="text-xs">+15%</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top véhicules</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {agencyVehicles
                      .sort((a, b) => b.views - a.views)
                      .slice(0, 3)
                      .map((vehicle, index) => (
                        <div key={vehicle.id} className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                            {index + 1}
                          </span>
                          <img
                            src={vehicle.image}
                            alt={vehicle.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{vehicle.title}</p>
                            <p className="text-xs text-muted-foreground">{vehicle.views} vues</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "reservations":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Réservations</h2>
            <div className="space-y-4">
              {reservations.map((res) => (
                <Card key={res.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <img
                        src={res.vehicle.image}
                        alt={res.vehicle.title}
                        className="w-full md:w-32 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{res.vehicle.title}</h3>
                        <p className="text-sm text-muted-foreground">Client: {res.client}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{res.startDate} - {res.endDate}</span>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge variant={res.status === "confirmed" ? "success" : "warning"}>
                          {res.status === "confirmed" ? "Confirmée" : "En attente"}
                        </Badge>
                        <p className="font-bold">{formatPrice(res.totalPrice)}</p>
                        {res.status === "pending" && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-success">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-destructive">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "messages":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Messages</h2>
            <div className="space-y-3">
              {messages.map((msg) => (
                <Card key={msg.id} className={msg.unread ? "border-primary" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${msg.from}`} />
                        <AvatarFallback>{msg.from.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">{msg.from}</p>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{msg.message}</p>
                      </div>
                      {msg.unread && (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Notifications</h2>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <Card key={notif.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Bell className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{notif.message}</p>
                        <span className="text-xs text-muted-foreground">{notif.time}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "documents":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Documents</h2>
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Aucun document pour l'instant</p>
                <Button variant="outline" className="mt-4">
                  <Upload className="h-4 w-4 mr-2" />
                  Téléverser un document
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Paramètres</h2>
            <Card>
              <CardHeader>
                <CardTitle>Informations de l'agence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button
                      variant="icon"
                      size="iconSm"
                      className="absolute -bottom-1 -right-1 rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{user.name}</h3>
                    <Badge variant="success">Agence vérifiée</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nom de l'agence</Label>
                    <Input value={user.name} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={user.email} />
                  </div>
                  <div className="space-y-2">
                    <Label>Téléphone</Label>
                    <Input value={user.phone || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label>Localisation</Label>
                    <Input value="Libreville, Estuaire" />
                  </div>
                </div>
                <Button variant="hero">Sauvegarder les modifications</Button>
              </CardContent>
            </Card>
          </div>
        );

      default:
        // Overview
        return (
          <div className="space-y-6">
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Bienvenue, {user.name} 👋
                </h1>
                <p className="text-muted-foreground">
                  Gérez vos véhicules et suivez vos performances
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("vehicles")}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Car className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stats.totalVehicles}</p>
                      <p className="text-sm text-muted-foreground">Véhicules</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent rounded-xl">
                      <Eye className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{formatNumber(stats.totalViews)}</p>
                      <p className="text-sm text-muted-foreground">Vues</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("messages")}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-destructive/10 rounded-xl">
                      <MessageSquare className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{messages.filter(m => m.unread).length}</p>
                      <p className="text-sm text-muted-foreground">Messages</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-success/10 rounded-xl">
                      <DollarSign className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{formatPrice(stats.monthlyRevenue)}</p>
                      <p className="text-sm text-muted-foreground">Revenus</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Notifications & Recent Vehicles */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications récentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <p className="text-sm">{notif.message}</p>
                        <span className="text-xs text-muted-foreground">{notif.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Mes derniers véhicules</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("vehicles")}>
                    Voir tout
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {agencyVehicles.slice(0, 3).map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className="flex items-center gap-4 p-3 border rounded-xl"
                      >
                        <img
                          src={vehicle.image}
                          alt={vehicle.title}
                          className="w-16 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{vehicle.title}</h3>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {vehicle.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {vehicle.interests}
                            </span>
                          </div>
                        </div>
                        {vehicle.available ? (
                          <Badge variant="success" className="text-xs">Dispo</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">Indispo</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setShowAddVehicle(true)}>
                <Plus className="h-6 w-6" />
                <span>Ajouter véhicule</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setActiveTab("analytics")}>
                <TrendingUp className="h-6 w-6" />
                <span>Statistiques</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setActiveTab("reservations")}>
                <Calendar className="h-6 w-6" />
                <span>Réservations</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setActiveTab("settings")}>
                <Users className="h-6 w-6" />
                <span>Mon profil</span>
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <DashboardLayout onAddVehicle={() => setShowAddVehicle(true)}>
      {renderContent()}

      {/* Add Vehicle Dialog */}
      <Dialog open={showAddVehicle} onOpenChange={setShowAddVehicle}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau véhicule</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Marque *</Label>
              <Input
                placeholder="Ex: Toyota"
                value={newVehicle.brand}
                onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Modèle *</Label>
              <Input
                placeholder="Ex: Land Cruiser"
                value={newVehicle.model}
                onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label>Titre de l'annonce *</Label>
              <Input
                placeholder="Ex: Toyota Land Cruiser 2023 - Excellent état"
                value={newVehicle.title}
                onChange={(e) => setNewVehicle({ ...newVehicle, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Année</Label>
              <Input
                type="number"
                value={newVehicle.year}
                onChange={(e) => setNewVehicle({ ...newVehicle, year: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Kilométrage</Label>
              <Input
                type="number"
                placeholder="Ex: 50000"
                value={newVehicle.km}
                onChange={(e) => setNewVehicle({ ...newVehicle, km: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Type d'offre</Label>
              <Select
                value={newVehicle.type}
                onValueChange={(v) => setNewVehicle({ ...newVehicle, type: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vente">Vente uniquement</SelectItem>
                  <SelectItem value="location">Location uniquement</SelectItem>
                  <SelectItem value="both">Vente et location</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Catégorie</Label>
              <Select
                value={newVehicle.category}
                onValueChange={(v) => setNewVehicle({ ...newVehicle, category: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Berline</SelectItem>
                  <SelectItem value="suv">SUV / 4x4</SelectItem>
                  <SelectItem value="compact">Citadine</SelectItem>
                  <SelectItem value="pickup">Pick-up</SelectItem>
                  <SelectItem value="luxe">Luxe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Prix de vente (XAF)</Label>
              <Input
                type="number"
                placeholder="Ex: 15000000"
                value={newVehicle.price || ""}
                onChange={(e) => setNewVehicle({ ...newVehicle, price: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label>Prix location/jour (XAF)</Label>
              <Input
                type="number"
                placeholder="Ex: 50000"
                value={newVehicle.pricePerDay || ""}
                onChange={(e) => setNewVehicle({ ...newVehicle, pricePerDay: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label>Carburant</Label>
              <Select
                value={newVehicle.fuel}
                onValueChange={(v) => setNewVehicle({ ...newVehicle, fuel: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="essence">Essence</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="hybride">Hybride</SelectItem>
                  <SelectItem value="electrique">Électrique</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Transmission</Label>
              <Select
                value={newVehicle.transmission}
                onValueChange={(v) => setNewVehicle({ ...newVehicle, transmission: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manuelle">Manuelle</SelectItem>
                  <SelectItem value="automatique">Automatique</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Décrivez votre véhicule..."
                rows={4}
                value={newVehicle.description}
                onChange={(e) => setNewVehicle({ ...newVehicle, description: e.target.value })}
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label>Photos</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">
                  Glissez vos photos ici ou cliquez pour sélectionner
                </p>
                <Button variant="outline" className="mt-4">
                  <Camera className="h-4 w-4 mr-2" />
                  Sélectionner des photos
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowAddVehicle(false)}>
              Annuler
            </Button>
            <Button variant="hero" onClick={handleAddVehicle}>
              Publier l'annonce
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AgencyDashboard;
