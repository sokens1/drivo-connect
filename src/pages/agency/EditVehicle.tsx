"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Upload, Car, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { mockVehicles, formatPrice } from "@/data/mockData";

const EditVehiclePage = () => {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    // Reuse existing vehicles list for side view
    const otherVehicles = mockVehicles.slice(0, 5);

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        brand: "",
        model: "",
        year: 2024,
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

    useEffect(() => {
        const vehicleToEdit = mockVehicles.find(v => v.id === id);
        if (vehicleToEdit) {
            setFormData({
                title: vehicleToEdit.title,
                brand: vehicleToEdit.brand,
                model: vehicleToEdit.model,
                year: vehicleToEdit.year,
                price: vehicleToEdit.price || 0,
                pricePerDay: vehicleToEdit.pricePerDay || 0,
                type: vehicleToEdit.type,
                category: vehicleToEdit.category,
                km: vehicleToEdit.km,
                fuel: vehicleToEdit.fuel,
                transmission: vehicleToEdit.transmission,
                location: vehicleToEdit.location,
                description: "Véhicule en excellent état, disponible de suite.", // Mock description if missing
            });
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!formData.title || !formData.brand || !formData.model) {
            toast.error("Veuillez remplir les champs obligatoires");
            setIsLoading(false);
            return;
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success("Véhicule modifié avec succès !");
        router.push("/dashboard/agence?tab=vehicles");
    };

    return (
        <div className="h-[calc(100vh-80px)] overflow-hidden flex flex-col md:flex-row gap-6">

            {/* Left Column - Fixed Form */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-background rounded-lg border shadow-sm">
                {/* Header */}
                <div className="p-4 border-b flex items-center gap-4 bg-muted/30">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard/agence?tab=vehicles">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-xl font-bold">Modifier le véhicule</h1>
                        <p className="text-xs text-muted-foreground">Mettez à jour les informations</p>
                    </div>
                </div>

                {/* Scrollable Form Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <form id="edit-vehicle-form" onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">

                        {/* Image Upload Placeholder */}
                        <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer group">
                            <div className="relative">
                                <div className="p-4 bg-muted rounded-full mb-3 group-hover:bg-primary/10 transition-colors">
                                    <Upload className="h-6 w-6 group-hover:text-primary" />
                                </div>
                            </div>
                            <p className="font-medium">Modifier les photos</p>
                            <p className="text-xs">PNG, JPG jusqu'à 10MB</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Marque *</Label>
                                <Input
                                    value={formData.brand}
                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Modèle *</Label>
                                <Input
                                    value={formData.model}
                                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Titre de l'annonce *</Label>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Année</Label>
                                <Input type="number" value={formData.year} onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Kilométrage</Label>
                                <Input type="number" value={formData.km} onChange={(e) => setFormData({ ...formData, km: parseInt(e.target.value) })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Carburant</Label>
                                <Select value={formData.fuel} onValueChange={(v) => setFormData({ ...formData, fuel: v })}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="essence">Essence</SelectItem>
                                        <SelectItem value="diesel">Diesel</SelectItem>
                                        <SelectItem value="hybride">Hybride</SelectItem>
                                        <SelectItem value="electrique">Electrique</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Type d'offre</Label>
                                <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="vente">Vente</SelectItem>
                                        <SelectItem value="location">Location</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>{formData.type === 'vente' ? 'Prix de vente (XAF)' : 'Prix / Jour (XAF)'}</Label>
                                <Input
                                    type="number"
                                    value={formData.type === 'vente' ? formData.price : formData.pricePerDay}
                                    onChange={(e) => setFormData({ ...formData, [formData.type === 'vente' ? 'price' : 'pricePerDay']: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                className="h-32"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="pt-4">
                            <Button type="submit" variant="hero" className="w-full gap-2" disabled={isLoading}>
                                <Save className="h-4 w-4" />
                                {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
                            </Button>
                        </div>

                    </form>
                </div>
            </div>

            {/* Right Column - Scrollable List */}
            <div className="hidden lg:flex w-80 flex-col h-full bg-muted/10 border-l border-border/50 pl-6">
                <div className="pb-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Car className="h-5 w-5" />
                        Autres véhicules
                    </h3>
                    <p className="text-sm text-muted-foreground">Aperçu de votre parc actuel</p>
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                    {otherVehicles.map((v) => (
                        <Card key={v.id} className="overflow-hidden hover:bg-muted/50 transition-colors">
                            <div className="flex gap-3 p-2">
                                <img src={v.image} alt={v.title} className="w-20 h-16 object-cover rounded-md" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate">{v.title}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{v.type === 'vente' ? formatPrice(v.price || 0) : `${formatPrice(v.pricePerDay || 0)}/j`}</p>
                                    <Badge variant="outline" className="text-[10px] h-5 mt-1">{v.available ? 'Dispo' : 'Indispo'}</Badge>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default EditVehiclePage;
