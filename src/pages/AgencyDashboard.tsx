import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Car,
  Plus,
  BarChart3,
  Settings,
  LogOut,
  Eye,
  Heart,
  Edit,
  Trash2,
  Upload,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Bell,
  Check,
  X,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import { formatPrice, formatNumber, mockVehicles } from "@/data/mockData";
import { toast } from "sonner";

const AgencyDashboard = () => {
  const navigate = useNavigate();
  const { user, setUser } = useApp();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddVehicle, setShowAddVehicle] = useState(false);

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
  if (!user || user.role !== "agency") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="pt-6 text-center">
              <Car className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Accès réservé aux agences</h2>
              <p className="text-muted-foreground mb-6">
                Connectez-vous avec un compte agence pour accéder à cet espace.
              </p>
              <div className="flex flex-col gap-3">
                <Button variant="hero" asChild>
                  <Link to="/inscription?role=agency">Créer un compte agence</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/connexion">Se connecter</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const handleLogout = () => {
    setUser(null);
    toast.success("Déconnexion réussie");
    navigate("/");
  };

  const handleAddVehicle = () => {
    if (!newVehicle.title || !newVehicle.brand) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Add mock vehicle
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Agency Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {user.name}
                </h1>
                <p className="text-muted-foreground">{user.email}</p>
                <Badge variant="success" className="mt-1">Agence vérifiée</Badge>
              </div>
            </div>
            <div className="flex gap-3">
              <Dialog open={showAddVehicle} onOpenChange={setShowAddVehicle}>
                <DialogTrigger asChild>
                  <Button variant="hero">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un véhicule
                  </Button>
                </DialogTrigger>
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
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Aperçu</TabsTrigger>
              <TabsTrigger value="vehicles">Mes véhicules</TabsTrigger>
              <TabsTrigger value="analytics">Statistiques</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <Car className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stats.totalVehicles}</p>
                        <p className="text-sm text-muted-foreground">Véhicules publiés</p>
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
                        <p className="text-sm text-muted-foreground">Vues totales</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-destructive/10 rounded-xl">
                        <Heart className="h-6 w-6 text-destructive" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stats.totalInterests}</p>
                        <p className="text-sm text-muted-foreground">Intérêts</p>
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
                        <p className="text-sm text-muted-foreground">Revenus du mois</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Notifications */}
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

              {/* Recent Vehicles */}
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
                        className="flex items-center gap-4 p-4 border rounded-xl"
                      >
                        <img
                          src={vehicle.image}
                          alt={vehicle.title}
                          className="w-20 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{vehicle.title}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
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
                        <div className="text-right">
                          <p className="font-bold">{formatPrice(vehicle.price)}</p>
                          {vehicle.available ? (
                            <Badge variant="success">Disponible</Badge>
                          ) : (
                            <Badge variant="secondary">Indisponible</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Vehicles Tab */}
            <TabsContent value="vehicles">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Mes véhicules ({agencyVehicles.length})</CardTitle>
                  <Button variant="hero" onClick={() => setShowAddVehicle(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {agencyVehicles.map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-xl"
                      >
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
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
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
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres de l'agence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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
                      <Input value={user.phone} />
                    </div>
                    <div className="space-y-2">
                      <Label>Localisation</Label>
                      <Input value="Libreville, Estuaire" />
                    </div>
                  </div>
                  <Button variant="hero">Sauvegarder les modifications</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AgencyDashboard;
