"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
  LayoutGrid,
  List as ListIcon,
  Search,
  ArrowLeft,
  Send,
  MoreVertical,
  Phone,
  Video
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardLayout from "@/components/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { formatPrice, formatNumber, mockVehicles } from "@/data/mockData";
import { toast } from "sonner";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const AgencyDashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, setUser } = useApp();
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const [selectedReservation, setSelectedReservation] = useState<any>(null);

  // Chat State
  const [activeThreadId, setActiveThreadId] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [threads, setThreads] = useState([
    {
      id: 1,
      user: "Jean Dupont",
      avatar: "J",
      status: "online",
      messages: [
        { id: 1, sender: "Jean Dupont", text: "Bonjour, je suis intéressé par la Toyota Yaris.", time: "10:00" },
        { id: 2, sender: "me", text: "Bonjour Jean, elle est toujours disponible. Souhaitez-vous la voir ?", time: "10:05" },
        { id: 3, sender: "Jean Dupont", text: "Oui, est-ce possible demain matin ?", time: "10:15" },
      ],
      lastMessage: "Oui, est-ce possible demain matin ?",
      lastTime: "10:15",
      unread: 2
    },
    {
      id: 2,
      user: "Marie Curie",
      avatar: "M",
      status: "offline",
      messages: [
        { id: 1, sender: "Marie Curie", text: "Quel est votre dernier prix ?", time: "Hier" }
      ],
      lastMessage: "Quel est votre dernier prix ?",
      lastTime: "Hier",
      unread: 0
    }
  ]);

  const activeThread = threads.find(t => t.id === activeThreadId);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!messageInput.trim() || !activeThreadId) return;

    const newMessage = {
      id: Date.now(),
      sender: "me",
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setThreads(prev => prev.map(t => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          messages: [...t.messages, newMessage],
          lastMessage: newMessage.text,
          lastTime: newMessage.time
        };
      }
      return t;
    }));
    setMessageInput("");

    // Simulate reply
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: activeThread?.user || "User",
        text: "C'est noté, merci !",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setThreads(prev => prev.map(t => {
        if (t.id === activeThreadId) {
          return {
            ...t,
            messages: [...t.messages, reply],
            lastMessage: reply.text,
            lastTime: reply.time
          };
        }
        return t;
      }));
      toast.info("Nouveau message reçu");
    }, 2000);
  };

  const activeTab = searchParams?.get("tab") || "overview";

  const setActiveTab = (tab: string) => {
    if (tab === "overview") {
      router.push("/dashboard/agence");
      return;
    }
    router.push(`/dashboard/agence?tab=${tab}`);
  };

  // Mock agency vehicles
  const [agencyVehicles, setAgencyVehicles] = useState(mockVehicles.slice(0, 3));



  const filteredVehicles = agencyVehicles.filter(v =>
    v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.model.toLowerCase().includes(searchTerm.toLowerCase())
  );
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

  // Redirect client to their dashboard - Hook must be before early returns
  useEffect(() => {
    if (user?.role === "client") {
      router.replace("/dashboard");
    }
  }, [router, user?.role]);

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
                  <Link href="/connexion">Se connecter</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (user.role === "client") {
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

  const filteredReservations = reservations.filter(r =>
    r.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.vehicle.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case "vehicles":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Mes véhicules ({agencyVehicles.length})</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher..."
                    className="w-64 pl-9 h-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center bg-muted p-1 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 px-2 transition-all ${viewMode === 'grid' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 px-2 transition-all ${viewMode === 'list' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <ListIcon className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="hero" asChild>
                  <Link href="/dashboard/agence/ajouter">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Link>
                </Button>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle) => (
                  <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-[16/9] relative">
                      <img
                        src={vehicle.image}
                        alt={vehicle.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        {vehicle.available ? (
                          <Badge variant="success" className="bg-success/90 backdrop-blur-sm">Dispo</Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">Indispo</Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold truncate" title={vehicle.title}>{vehicle.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {vehicle.type !== "location" && (
                          <Badge variant="sale" className="text-xs">Vente: {formatPrice(vehicle.price)}</Badge>
                        )}
                        {vehicle.pricePerDay && (
                          <Badge variant="rental" className="text-xs">Location: {formatPrice(vehicle.pricePerDay)}/jour</Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {vehicle.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {vehicle.interests}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                            <Link href={`/vehicule/${vehicle.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                            <Link href={`/dashboard/agence/modifier/${vehicle.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteVehicle(vehicle.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Image</TableHead>
                      <TableHead>Titre</TableHead>
                      <TableHead>Modèle</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Stats</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVehicles.map(vehicle => (
                      <TableRow key={vehicle.id}>
                        <TableCell>
                          <img src={vehicle.image} alt={vehicle.model} className="w-16 h-10 object-cover rounded" />
                        </TableCell>
                        <TableCell className="font-medium">{vehicle.title}</TableCell>
                        <TableCell>{vehicle.year} {vehicle.brand}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {vehicle.type !== "location" && (
                              <span className="text-sm font-semibold">{formatPrice(vehicle.price)}</span>
                            )}
                            {vehicle.pricePerDay && (
                              <span className="text-xs text-muted-foreground">{formatPrice(vehicle.pricePerDay)}/j</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {vehicle.available ? (
                            <Badge variant="success" className="text-xs">Disponible</Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs">Indisponible</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div className="flex items-center gap-1"><Eye className="h-3 w-3" /> {vehicle.views}</div>
                            <div className="flex items-center gap-1"><Heart className="h-3 w-3" /> {vehicle.interests}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                              <Link href={`/vehicule/${vehicle.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteVehicle(vehicle.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
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
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Réservations ({filteredReservations.length})</h2>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Client, véhicule..."
                  className="w-64 pl-9 h-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Véhicule</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations.map((res) => (
                    <TableRow key={res.id}>
                      <TableCell className="font-medium">{res.client}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img src={res.vehicle.image} className="w-8 h-8 rounded object-cover" alt="" />
                          <span className="text-sm">{res.vehicle.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="flex flex-col">
                          <span>{res.startDate}</span>
                          <span className="text-muted-foreground text-xs">au {res.endDate}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-bold">{formatPrice(res.totalPrice)}</TableCell>
                      <TableCell>
                        <Badge variant={res.status === "confirmed" ? "success" : "warning"}>
                          {res.status === "confirmed" ? "Confirmée" : "En attente"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedReservation(res)}>Détails</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Dialog open={!!selectedReservation} onOpenChange={(open) => !open && setSelectedReservation(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Détails de la réservation</DialogTitle>
                </DialogHeader>
                {selectedReservation && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">ID Réservation</p>
                        <p className="font-mono font-bold">#{selectedReservation.id}</p>
                      </div>
                      <Badge variant={selectedReservation.status === "confirmed" ? "success" : "warning"}>
                        {selectedReservation.status === "confirmed" ? "Confirmée" : "En attente"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Client</h4>
                        <p>{selectedReservation.client}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Véhicule</h4>
                        <p>{selectedReservation.vehicle.title}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Période</h4>
                        <p className="text-sm">{selectedReservation.startDate} - {selectedReservation.endDate}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Montant Total</h4>
                        <p className="text-lg font-bold text-primary">{formatPrice(selectedReservation.totalPrice)}</p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button variant="outline" onClick={() => setSelectedReservation(null)}>Fermer</Button>
                      {selectedReservation.status === 'pending' && (
                        <Button variant="hero">Confirmer la demande</Button>
                      )}
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>

          </div>
        );

      case "messages":
        return (
          <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-4">
            {/* Threads List */}
            <div className={`md:w-1/3 flex flex-col bg-card rounded-lg border overflow-hidden ${activeThreadId ? 'hidden md:flex' : 'flex h-full'}`}>
              <div className="p-4 border-b bg-muted/30">
                <h2 className="font-bold text-lg mb-4">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Rechercher une conversation..." className="pl-9" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {threads.map(thread => (
                  <div
                    key={thread.id}
                    onClick={() => setActiveThreadId(thread.id)}
                    className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors flex gap-3 ${activeThreadId === thread.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''}`}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>{thread.avatar}</AvatarFallback>
                      </Avatar>
                      {thread.status === 'online' && <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-background" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold truncate">{thread.user}</h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{thread.lastTime}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{thread.lastMessage}</p>
                    </div>
                    {thread.unread > 0 && (
                      <div className="flex items-center">
                        <span className="w-5 h-5 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                          {thread.unread}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Window */}
            <div className={`flex-1 flex flex-col bg-card rounded-lg border overflow-hidden ${!activeThreadId ? 'hidden md:flex' : 'flex h-full'}`}>
              {activeThread ? (
                <>
                  <div className="p-4 border-b flex justify-between items-center bg-muted/30">
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setActiveThreadId(null)}>
                        <ArrowLeft className="h-5 w-5" />
                      </Button>
                      <Avatar>
                        <AvatarFallback>{activeThread.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold">{activeThread.user}</h3>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${activeThread.status === 'online' ? 'bg-success' : 'bg-gray-300'}`} />
                          {activeThread.status === 'online' ? 'En ligne' : 'Hors ligne'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {/* Audio and video calls removed as requested */}
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10">
                    {activeThread.messages.map(msg => (
                      <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] rounded-2xl p-3 px-4 ${msg.sender === 'me' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-muted rounded-tl-sm'}`}>
                          <p className="text-sm">{msg.text}</p>
                          <span className={`text-[10px] block text-right mt-1 opacity-70`}>{msg.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t bg-background">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Input
                        placeholder="Écrivez votre message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" size="icon" disabled={!messageInput.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="h-8 w-8 opacity-50" />
                  </div>
                  <h3 className="text-lg font-semibold">Vos Messages</h3>
                  <p>Sélectionnez une conversation pour commencer à discuter.</p>
                </div>
              )}
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
            {showWelcome && (
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 transition-opacity duration-500">
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
            )}

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
                      <p className="text-2xl font-bold">{threads.reduce((acc, t) => acc + (t.unread || 0), 0)}</p>
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



            {/* Charts Section */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6">

                {/* Evolution Revenue Chart */}
                <Card className="col-span-1 md:col-span-2 lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Évolution des Revenus</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[
                          { name: 'Jan', revenue: 1500000 },
                          { name: 'Fév', revenue: 2300000 },
                          { name: 'Mar', revenue: 3400000 },
                          { name: 'Avr', revenue: 2900000 },
                          { name: 'Mai', revenue: 4500000 },
                          { name: 'Juin', revenue: stats.monthlyRevenue },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                          <Tooltip
                            formatter={(value: number) => [formatPrice(value), "Revenus"]}
                            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                          />
                          <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Vehicle Distribution Pie Chart */}
                <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Répartition du Parc</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Disponible', value: agencyVehicles.filter(v => v.available).length },
                              { name: 'Loué', value: agencyVehicles.filter(v => !v.available && v.type === 'location').length },
                              { name: 'Vendu', value: agencyVehicles.filter(v => !v.available && v.type === 'vente').length },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            <Cell key="cell-0" fill="hsl(var(--success))" />
                            <Cell key="cell-1" fill="hsl(var(--warning))" />
                            <Cell key="cell-2" fill="hsl(var(--muted-foreground))" />
                          </Pie>
                          <Tooltip />
                          <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance des Top Véhicules</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={agencyVehicles.slice(0, 5).map(v => ({
                        name: v.model,
                        views: v.views,
                        interests: v.interests
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                          cursor={{ fill: 'transparent' }}
                          contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                        />
                        <Legend />
                        <Bar dataKey="views" name="Vues" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={50} />
                        <Bar dataKey="interests" name="Intérêts" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} maxBarSize={50} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
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
