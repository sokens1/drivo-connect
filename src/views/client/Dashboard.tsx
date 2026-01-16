"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Car,
    Heart,
    Calendar,
    MessageSquare,
    TrendingUp,
    DollarSign,
    Bell,
    Search,
    LayoutGrid,
    List as ListIcon,
    ChevronRight,
    Clock,
    ArrowUpRight,
    Send,
    ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { formatPrice, mockVehicles } from "@/data/mockData";
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

const ClientDashboard = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useApp();
    const [showWelcome, setShowWelcome] = useState(true);
    const activeTab = searchParams?.get("tab") || "overview";

    // Chat State
    const [activeThreadId, setActiveThreadId] = useState<number | null>(null);
    const [messageInput, setMessageInput] = useState("");
    const [threads, setThreads] = useState([
        {
            id: 1,
            user: "Sokens Auto",
            avatar: "S",
            status: "online",
            messages: [
                { id: 1, sender: "Sokens Auto", text: "Bonjour, votre réservation est confirmée. Quand souhaitez-vous récupérer le véhicule ?", time: "10:00" },
                { id: 2, sender: "me", text: "Bonjour, demain matin vers 9h si possible.", time: "10:05" },
                { id: 3, sender: "Sokens Auto", text: "C'est parfait, nous vous attendons.", time: "10:15" },
            ],
            lastMessage: "C'est parfait, nous vous attendons.",
            lastTime: "10:15",
            unread: 0
        },
        {
            id: 2,
            user: "Drivo Express",
            avatar: "D",
            status: "offline",
            messages: [
                { id: 1, sender: "Drivo Express", text: "Merci de nous envoyer une copie de votre permis.", time: "Hier" }
            ],
            lastMessage: "Merci de nous envoyer une copie...",
            lastTime: "Hier",
            unread: 1
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
                sender: activeThread?.user || "Agence",
                text: "Entendu, nous revenons vers vous rapidement.",
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    // Redirect if not logged in or if role is agency
    useEffect(() => {
        if (!user) {
            router.replace("/connexion");
        } else if (user.role === "agency") {
            router.replace("/dashboard/agence");
        }
    }, [user, router]);

    if (!user || user.role === "agency") return null;

    // Mock data for charts
    const spendingData = [
        { name: 'Jan', amount: 45000 },
        { name: 'Fév', amount: 120000 },
        { name: 'Mar', amount: 85000 },
        { name: 'Avr', amount: 210000 },
        { name: 'Mai', amount: 150000 },
        { name: 'Juin', amount: 95000 },
    ];

    const categoryPreference = [
        { name: 'Berline', count: 12 },
        { name: 'SUV', count: 18 },
        { name: 'Luxe', count: 5 },
        { name: 'Citadine', count: 8 },
    ];

    const bookingStatus = [
        { name: 'Terminées', value: 8, color: 'hsl(var(--success))' },
        { name: 'En cours', value: 2, color: 'hsl(var(--primary))' },
        { name: 'Annulées', value: 1, color: 'hsl(var(--destructive))' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "messages":
                return (
                    <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6">
                        {/* Threads List */}
                        <div className={`md:w-80 lg:w-96 flex flex-col bg-card rounded-2xl border shadow-sm overflow-hidden ${activeThreadId ? 'hidden md:flex' : 'flex h-full'}`}>
                            <div className="p-6 border-b bg-slate-50/50">
                                <h2 className="font-bold text-2xl mb-4">Messages</h2>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input placeholder="Rechercher..." className="pl-9 bg-white border-slate-200 rounded-xl" />
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                {threads.map(thread => (
                                    <div
                                        key={thread.id}
                                        onClick={() => setActiveThreadId(thread.id)}
                                        className={`p-4 border-b cursor-pointer hover:bg-slate-50 transition-colors flex gap-4 ${activeThreadId === thread.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''}`}
                                    >
                                        <div className="relative">
                                            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                                <AvatarFallback className="bg-primary/10 text-primary font-bold">{thread.avatar}</AvatarFallback>
                                            </Avatar>
                                            {thread.status === 'online' && <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-success rounded-full border-2 border-white" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-bold truncate text-slate-900">{thread.user}</h3>
                                                <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap">{thread.lastTime}</span>
                                            </div>
                                            <p className="text-sm text-slate-500 truncate">{thread.lastMessage}</p>
                                        </div>
                                        {thread.unread > 0 && (
                                            <div className="flex items-center">
                                                <Badge className="bg-primary text-white h-5 w-5 rounded-full flex items-center justify-center p-0 text-[10px] font-bold">
                                                    {thread.unread}
                                                </Badge>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chat Window */}
                        <div className={`flex-1 flex flex-col bg-card rounded-2xl border shadow-sm overflow-hidden ${!activeThreadId ? 'hidden md:flex' : 'flex h-full'}`}>
                            {activeThread ? (
                                <>
                                    <div className="p-4 md:p-6 border-b flex justify-between items-center bg-slate-50/50">
                                        <div className="flex items-center gap-4">
                                            <Button variant="ghost" size="icon" className="md:hidden -ml-2" onClick={() => setActiveThreadId(null)}>
                                                <ArrowLeft className="h-5 w-5" />
                                            </Button>
                                            <Avatar className="h-10 w-10 border shadow-sm">
                                                <AvatarFallback className="bg-primary/10 text-primary font-bold">{activeThread.avatar}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-bold text-slate-900">{activeThread.user}</h3>
                                                <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                                                    <div className={`w-2 h-2 rounded-full ${activeThread.status === 'online' ? 'bg-success' : 'bg-slate-300'}`} />
                                                    {activeThread.status === 'online' ? 'En ligne' : 'Hors ligne'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-50/30">
                                        {activeThread.messages.map(msg => (
                                            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[80%] md:max-w-[70%] rounded-2xl p-4 shadow-sm ${msg.sender === 'me' ? 'bg-primary text-white rounded-tr-sm' : 'bg-white text-slate-700 border rounded-tl-sm'}`}>
                                                    <p className="text-sm leading-relaxed">{msg.text}</p>
                                                    <span className={`text-[9px] block text-right mt-2 font-medium ${msg.sender === 'me' ? 'text-white/70' : 'text-slate-400'}`}>{msg.time}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-4 md:p-6 border-t bg-white">
                                        <form onSubmit={handleSendMessage} className="flex gap-3">
                                            <Input
                                                placeholder="Tapez votre message..."
                                                value={messageInput}
                                                onChange={(e) => setMessageInput(e.target.value)}
                                                className="flex-1 h-12 bg-slate-50 border-none rounded-xl px-4 focus-visible:ring-primary shadow-inner"
                                            />
                                            <Button type="submit" size="icon" className="h-12 w-12 rounded-xl" disabled={!messageInput.trim()}>
                                                <Send className="h-5 w-5" />
                                            </Button>
                                        </form>
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-slate-50/50">
                                    <div className="w-20 h-20 bg-white shadow-sm border rounded-3xl flex items-center justify-center mb-6 animate-pulse">
                                        <MessageSquare className="h-10 w-10 text-primary opacity-40" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Vos Messages</h3>
                                    <p className="max-w-xs mx-auto">Consultez vos conversations avec les agences partenaires.</p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case "bookings":
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Mes Réservations</h2>
                        <Card>
                            <CardContent className="py-12 text-center">
                                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                <p className="text-muted-foreground">Vous n'avez pas encore de réservations.</p>
                                <Button variant="hero" className="mt-4" asChild>
                                    <Link href="/search">Rechercher un véhicule</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                );
            case "favorites":
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Mes Favoris</h2>
                        <Card>
                            <CardContent className="py-12 text-center">
                                <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                <p className="text-muted-foreground">Votre liste de favoris est vide.</p>
                                <Button variant="hero" className="mt-4" asChild>
                                    <Link href="/search">Découvrir des véhicules</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                );
            default:
                return (
                    <div className="space-y-6">
                        {/* Welcome Message */}
                        {showWelcome && (
                            <div className="animate-in fade-in slide-in-from-top duration-500">
                                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex items-center gap-4">
                                    <Avatar className="h-14 w-14">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h1 className="text-2xl font-bold">Bonjour, {user.name}</h1>
                                        <p className="text-muted-foreground">Ravi de vous revoir sur votre espace Drivo.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card className="hover:shadow-md transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-success/10 rounded-xl">
                                            <DollarSign className="h-6 w-6 text-success" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">{formatPrice(705000)}</p>
                                            <p className="text-sm text-muted-foreground font-medium">Dépenses totales</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="hover:shadow-md transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-primary/10 rounded-xl">
                                            <Calendar className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">11</p>
                                            <p className="text-sm text-muted-foreground font-medium">Réservations</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="hover:shadow-md transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-destructive/10 rounded-xl">
                                            <Heart className="h-6 w-6 text-destructive" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">24</p>
                                            <p className="text-sm text-muted-foreground font-medium">Véhicules favoris</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="hover:shadow-md transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-accent rounded-xl">
                                            <Clock className="h-6 w-6 text-accent-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">3</p>
                                            <p className="text-sm text-muted-foreground font-medium">En cours</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Spending Evolution */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5 text-primary" />
                                        Évolution de vos dépenses
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={spendingData}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(value) => `${value / 1000}k`} />
                                                <Tooltip
                                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                                    formatter={(value: number) => [formatPrice(value), "Dépenses"]}
                                                />
                                                <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4, fill: 'hsl(var(--primary))', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Category Preferences */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Car className="h-5 w-5 text-primary" />
                                        Vos types de véhicules préférés
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={categoryPreference} layout="vertical">
                                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} />
                                                <Tooltip
                                                    cursor={{ fill: 'hsl(var(--primary)/0.05)' }}
                                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                                />
                                                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Booking Statistics */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-primary" />
                                        Statut des réservations
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={bookingStatus}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {bookingStatus.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                                <Legend verticalAlign="bottom" height={36} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Activity Card */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-lg font-bold">Activité récente</CardTitle>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href="/reservations" className="text-xs text-primary">Voir tout</Link>
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[
                                            { title: "Réservation confirmée", desc: "Toyota Corolla - Agence Libreville", date: "Il y a 2h", type: "booking" },
                                            { title: "Nouveau favori", desc: "Hyundai Tucson 2023", date: "Hier", type: "favorite" },
                                            { title: "Paiement effectué", desc: "35 000 XAF pour location", date: "Le 14 Juin", type: "payment" },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                                                <div className={`mt-1 p-2 rounded-lg ${item.type === 'booking' ? 'bg-primary/10' : item.type === 'favorite' ? 'bg-destructive/10' : 'bg-success/10'}`}>
                                                    {item.type === 'booking' ? <Calendar className="h-4 w-4 text-primary" /> : item.type === 'favorite' ? <Heart className="h-4 w-4 text-destructive" /> : <DollarSign className="h-4 w-4 text-success" />}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-semibold">{item.title}</p>
                                                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                                                </div>
                                                <span className="text-[10px] text-muted-foreground whitespace-nowrap">{item.date}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                );
        }
    };

    return (
        <DashboardLayout>
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {renderContent()}
            </div>
        </DashboardLayout>
    );
};

export default ClientDashboard;
