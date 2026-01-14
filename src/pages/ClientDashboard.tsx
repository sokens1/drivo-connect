"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  User,
  Car,
  Heart,
  Calendar,
  ChevronRight,
  Bell,
  CreditCard,
  MapPin,
  Star,
  Edit,
  Camera,
  MessageSquare,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/components/DashboardLayout";
import VehicleCard from "@/components/VehicleCard";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/data/mockData";
import { toast } from "sonner";

const ClientDashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, setUser, vehicles, favorites } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");

  const activeTab = searchParams?.get("tab") || "overview";

  const setActiveTab = (tab: string) => {
    if (tab === "overview") {
      router.push("/dashboard");
      return;
    }
    router.push(`/dashboard?tab=${tab}`);
  };

  // Redirect agency to their dashboard
  useEffect(() => {
    if (user?.role === "agency") {
      router.replace("/dashboard/agence");
    }
  }, [router, user?.role]);

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="pt-6 text-center">
              <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Connexion requise</h2>
              <p className="text-muted-foreground mb-6">
                Connectez-vous pour accéder à votre espace client.
              </p>
              <Button variant="hero" asChild>
                <Link href="/connexion">Se connecter</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (user.role === "agency") {
    return null;
  }

  const favoriteVehicles = vehicles.filter((v) => favorites.includes(v.id));

  // Mock reservations
  const reservations = [
    {
      id: "1",
      vehicle: vehicles[0],
      startDate: "2024-02-15",
      endDate: "2024-02-18",
      status: "confirmed" as const,
      totalPrice: 450000,
    },
    {
      id: "2",
      vehicle: vehicles[1],
      startDate: "2024-01-20",
      endDate: "2024-01-22",
      status: "completed" as const,
      totalPrice: 90000,
    },
  ];

  // Mock messages
  const messages = [
    {
      id: "1",
      from: "Auto Premium Gabon",
      message: "Votre véhicule est disponible pour la location.",
      time: "Il y a 2h",
      unread: true,
    },
    {
      id: "2",
      from: "Libreville Motors",
      message: "Merci pour votre intérêt. Le prix est négociable.",
      time: "Hier",
      unread: false,
    },
  ];

  // Mock notifications
  const notifications = [
    { id: "1", message: "Votre réservation a été confirmée", time: "Il y a 1h", type: "success" },
    { id: "2", message: "Nouveau véhicule dans vos critères", time: "Il y a 3h", type: "info" },
    { id: "3", message: "Prix réduit sur Toyota Land Cruiser", time: "Hier", type: "promo" },
  ];

  const handleSaveProfile = () => {
    if (user) {
      setUser({ ...user, name: editName, phone: editPhone });
      setIsEditing(false);
      toast.success("Profil mis à jour !");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="success">Confirmée</Badge>;
      case "pending":
        return <Badge variant="warning">En attente</Badge>;
      case "completed":
        return <Badge variant="secondary">Terminée</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Annulée</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "reservations":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Mes réservations</h2>
              <Button variant="outline" asChild>
                <Link href="/recherche?type=location">
                  <Search className="h-4 w-4 mr-2" />
                  Nouvelle recherche
                </Link>
              </Button>
            </div>
            {reservations.length > 0 ? (
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
                          <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {res.startDate} - {res.endDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {res.vehicle.location}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(res.status)}
                          <p className="font-bold mt-2">{formatPrice(res.totalPrice)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Aucune réservation pour l'instant</p>
                  <Button variant="hero" className="mt-4" asChild>
                    <Link href="/recherche?type=location">Louer un véhicule</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
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
                      <div className={`p-2 rounded-full ${
                        notif.type === "success" ? "bg-success/10" :
                        notif.type === "promo" ? "bg-warning/10" : "bg-primary/10"
                      }`}>
                        <Bell className={`h-4 w-4 ${
                          notif.type === "success" ? "text-success" :
                          notif.type === "promo" ? "text-warning" : "text-primary"
                        }`} />
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

      case "profile":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Mon profil</h2>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Informations personnelles</CardTitle>
                {!isEditing && (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                )}
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
                    <p className="text-muted-foreground">{user.email}</p>
                    <Badge variant="secondary" className="mt-2">Client</Badge>
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Nom complet</Label>
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input value={user.email} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Téléphone</Label>
                      <Input
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button variant="hero" onClick={handleSaveProfile}>
                        Sauvegarder
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Annuler
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">Nom</span>
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">Email</span>
                      <span className="font-medium">{user.email}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">Téléphone</span>
                      <span className="font-medium">{user.phone || "Non renseigné"}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-muted-foreground">Type de compte</span>
                      <Badge variant="secondary">Client</Badge>
                    </div>
                  </div>
                )}
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
                  Bonjour, {user.name.split(" ")[0]} 👋
                </h1>
                <p className="text-muted-foreground">
                  Bienvenue sur votre tableau de bord
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("reservations")}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{reservations.length}</p>
                      <p className="text-sm text-muted-foreground">Réservations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Link href="/favoris">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-destructive/10 rounded-xl">
                        <Heart className="h-6 w-6 text-destructive" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{favorites.length}</p>
                        <p className="text-sm text-muted-foreground">Favoris</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("messages")}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent rounded-xl">
                      <MessageSquare className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{messages.filter(m => m.unread).length}</p>
                      <p className="text-sm text-muted-foreground">Messages non lus</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-success/10 rounded-xl">
                      <Star className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">4.8</p>
                      <p className="text-sm text-muted-foreground">Note moyenne</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reservations.slice(0, 3).map((res) => (
                    <div
                      key={res.id}
                      className="flex items-center gap-4 p-4 bg-muted rounded-lg"
                    >
                      <img
                        src={res.vehicle.image}
                        alt={res.vehicle.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{res.vehicle.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {res.startDate} - {res.endDate}
                        </p>
                      </div>
                      {getStatusBadge(res.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link href="/recherche">
                  <Car className="h-6 w-6" />
                  <span>Chercher un véhicule</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link href="/favoris">
                  <Heart className="h-6 w-6" />
                  <span>Mes favoris</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link href="/agences">
                  <MapPin className="h-6 w-6" />
                  <span>Agences</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link href="/contact">
                  <Bell className="h-6 w-6" />
                  <span>Support</span>
                </Link>
              </Button>
            </div>

            {/* Favorites Preview */}
            {favoriteVehicles.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Vos favoris</h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/favoris">
                      Voir tout
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteVehicles.slice(0, 3).map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      {renderContent()}
    </DashboardLayout>
  );
};

export default ClientDashboard;
