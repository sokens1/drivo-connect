"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Share2,
    Heart,
    MapPin,
    Calendar,
    Gauge,
    Fuel,
    Settings2,
    CheckCircle,
    Phone,
    MessageSquare,
    ShieldCheck,
    Star,
    ChevronRight,
    Maximize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { mockVehicles, formatPrice } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardLayout from "@/components/DashboardLayout";
import { useApp } from "@/context/AppContext";

const VehicleDetailPage = () => {
    const params = useParams();
    const { user } = useApp();
    const id = params?.id as string || "1";

    // Find vehicle or use mock fallback
    const vehicle = mockVehicles.find(v => v.id === id) || mockVehicles[0];

    // Mock images for carousel
    const images = [
        vehicle.image,
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2000",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=2000",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2000",
    ];

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-background pb-20 -m-4 lg:-m-8 relative">
                {/* Back Navigation Bar */}
                <div className="absolute top-6 left-6 z-40">
                    <Button variant="secondary" size="icon" className="rounded-full shadow-lg bg-background/80 backdrop-blur-md hover:bg-background transition-all hover:scale-105 border border-border/50" asChild>
                        <Link href={user?.role === 'agency' ? "/dashboard/agence?tab=vehicles" : "/search"}>
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                </div>

                {/* Hero Section with Carousel */}
                <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-muted">
                    <Carousel className="w-full h-full">
                        <CarouselContent>
                            {images.map((img, index) => (
                                <CarouselItem key={index} className="h-[60vh] md:h-[70vh]">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                    <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4 z-20" />
                        <CarouselNext className="right-4 z-20" />
                    </Carousel>

                    <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-12 text-white">
                        <div className="container mx-auto">
                            <div className="flex flex-wrap items-end justify-between gap-4">
                                <div>
                                    <div className="flex gap-2 mb-3">
                                        <Badge className="bg-primary hover:bg-primary border-none text-white">
                                            {vehicle.type === "vente" ? "En Vente" : "Location"}
                                        </Badge>
                                        <Badge variant="outline" className="text-white border-white/50 backdrop-blur-sm">
                                            {vehicle.year}
                                        </Badge>
                                        <Badge variant="outline" className="text-white border-white/50 backdrop-blur-sm">
                                            {vehicle.km} km
                                        </Badge>
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-bold mb-2">{vehicle.title}</h1>
                                    <p className="text-white/80 flex items-center gap-2 text-lg">
                                        <MapPin className="h-5 w-5" /> {vehicle.location}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl md:text-4xl font-bold text-white">
                                        {formatPrice(vehicle.price)}
                                    </p>
                                    {vehicle.pricePerDay && (
                                        <p className="text-white/80 text-sm">ou {formatPrice(vehicle.pricePerDay)} / jour</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 -mt-8 relative z-30">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Main Content (Left) */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Quick Specs Card */}
                            <Card className="border-none shadow-lg">
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <div className="flex flex-col items-center text-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                                            <Calendar className="h-6 w-6 text-primary" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Année</p>
                                                <p className="font-semibold">{vehicle.year}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center text-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                                            <Gauge className="h-6 w-6 text-primary" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Kilométrage</p>
                                                <p className="font-semibold">{vehicle.km} km</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center text-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                                            <Settings2 className="h-6 w-6 text-primary" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Boîte</p>
                                                <p className="font-semibold capitalize">{vehicle.transmission}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center text-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                                            <Fuel className="h-6 w-6 text-primary" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Carburant</p>
                                                <p className="font-semibold capitalize">{vehicle.fuel}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Description & Accordions */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold">À propos du véhicule</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Ce magnifique {vehicle.title} offre une expérience de conduite exceptionnelle.
                                    Entretenu avec soin, il dispose de nombreuses options adaptées au climat tropical :
                                    climatisation renforcée, vitres teintées anti-UV, et suspensions robustes.
                                </p>

                                <Accordion type="single" collapsible className="w-full bg-card rounded-xl border px-4">
                                    <AccordionItem value="features">
                                        <AccordionTrigger>Equipements & Options</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-4">
                                                {["Climatisation automatique", "GPS Intégré", "Caméra de recul", "Sièges cuir", "Bluetooth", "Régulateur de vitesse", "Jantes alliage", "Toit ouvrant"].map((opt, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <CheckCircle className="h-4 w-4 text-success" />
                                                        <span>{opt}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="history">
                                        <AccordionTrigger>Historique & Entretien</AccordionTrigger>
                                        <AccordionContent>
                                            <p className="text-sm text-muted-foreground pb-4">
                                                Véhicule première main. Carnet d'entretien complet disponible.
                                                Dernière révision effectuée à {vehicle.km - 2000} km.
                                                Contrôle technique vierge.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>

                            {/* AR Preview Placeholder */}
                            <Card className="overflow-hidden bg-black text-white">
                                <CardContent className="p-0 relative h-64 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1633511090164-b43840ea1607?auto=format&fit=crop&q=80')] bg-cover opacity-30" />
                                    <div className="relative z-10 text-center space-y-4">
                                        <Maximize2 className="h-12 w-12 mx-auto" />
                                        <h3 className="text-xl font-bold">Visualisation 3D</h3>
                                        <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black">
                                            Voir en Réalité Augmentée
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Reviews */}
                            <div className="space-y-4 pt-4">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    Avis clients <span className="text-base font-normal text-muted-foreground">(12)</span>
                                </h2>
                                <div className="space-y-4">
                                    {[1, 2].map((review) => (
                                        <div key={review} className="bg-card p-4 rounded-xl border">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=U${review}`} />
                                                        <AvatarFallback>U{review}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-semibold">Client Vérifié</p>
                                                        <div className="flex text-yellow-500">
                                                            {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-xs text-muted-foreground">Il y a {review} mois</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                Véhicule en parfait état, conforme à la description. Le vendeur a été très professionnel. Je recommande !
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Sticky Sidebar (Right) */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">

                                {/* Agency Card */}
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=Agency" />
                                                <AvatarFallback>AG</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-bold">Sokens Auto</p>
                                                <div className="flex items-center gap-1 text-xs text-success font-medium">
                                                    <ShieldCheck className="h-3 w-3" />
                                                    Agence Vérifiée
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            {vehicle.pricePerDay && (
                                                <Button variant="hero" className="w-full gap-2" size="lg" asChild>
                                                    <Link href={`/booking/${vehicle.id}`}>
                                                        <Calendar className="h-4 w-4" />
                                                        Réserver maintenant
                                                    </Link>
                                                </Button>
                                            )}
                                            <Button className="w-full gap-2" size="lg" variant={vehicle.pricePerDay ? "outline" : "hero"}>
                                                <Phone className="h-4 w-4" />
                                                Afficher le numéro
                                            </Button>
                                            <Button variant="outline" className="w-full gap-2" size="lg">
                                                <MessageSquare className="h-4 w-4" />
                                                Envoyer un message
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Location Map Placeholder */}
                                <Card className="overflow-hidden">
                                    <div className="h-48 bg-muted relative">
                                        {/* Fake Map UI */}
                                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                                            <MapPin className="h-8 w-8 text-primary animate-bounce" />
                                        </div>
                                        <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-[10px] shadow-sm">
                                            Map data ©2024
                                        </div>
                                    </div>
                                    <CardContent className="p-4">
                                        <p className="font-semibold flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-primary" />
                                            Libreville, Gabon
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Visible au showroom principal, Quartier Louis.
                                        </p>
                                    </CardContent>
                                </Card>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default VehicleDetailPage;
