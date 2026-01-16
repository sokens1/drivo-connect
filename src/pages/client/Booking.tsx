"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Calendar,
    ArrowLeft,
    ChevronRight,
    MapPin,
    Clock,
    CheckCircle,
    XCircle,
    MoreHorizontal,
    Eye,
    Download
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardLayout from "@/components/DashboardLayout";
import { mockVehicles, formatPrice } from "@/data/mockData";

// Mock client bookings
const mockBookings = [
    {
        id: "BK-8291",
        vehicle: mockVehicles[0],
        startDate: "2024-03-12",
        endDate: "2024-03-15",
        status: "confirmed",
        totalPrice: 450000,
        agency: "Sokens Auto",
        payment: "Paid"
    },
    {
        id: "BK-9012",
        vehicle: mockVehicles[1],
        startDate: "2024-04-05",
        endDate: "2024-04-08",
        status: "pending",
        totalPrice: 125000,
        agency: "Drivo Express",
        payment: "Pending"
    },
    {
        id: "BK-4432",
        vehicle: mockVehicles[2],
        startDate: "2024-02-20",
        endDate: "2024-02-22",
        status: "completed",
        totalPrice: 85000,
        agency: "Gabon Cars",
        payment: "Paid"
    }
];

const BookingPage = () => {
    const router = useRouter();

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <Calendar className="h-8 w-8 text-primary" />
                            Mes Réservations
                        </h1>
                        <p className="text-slate-500 font-medium">
                            Suivez vos demandes de location et historiques de réservations.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <Card className="border-none shadow-sm overflow-hidden rounded-2xl">
                        <CardHeader className="bg-white border-b">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Liste des réservations</CardTitle>
                                    <CardDescription>Vous avez {mockBookings.length} réservations au total.</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">Exporter CSV</Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 bg-white">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader className="bg-slate-50">
                                        <TableRow>
                                            <TableHead className="w-[120px]">ID</TableHead>
                                            <TableHead>Véhicule</TableHead>
                                            <TableHead>Agence</TableHead>
                                            <TableHead>Dates</TableHead>
                                            <TableHead>Montant</TableHead>
                                            <TableHead>Statut</TableHead>
                                            <TableHead className="text-right">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {mockBookings.map((booking) => (
                                            <TableRow key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                                                <TableCell className="font-mono font-medium text-xs">
                                                    #{booking.id}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-10 rounded-lg overflow-hidden flex-shrink-0 border">
                                                            <img src={booking.vehicle.image} alt="" className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-semibold text-sm line-clamp-1">{booking.vehicle.title}</span>
                                                            <span className="text-[10px] text-slate-500 uppercase tracking-wider">{booking.vehicle.category}</span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-sm font-medium">{booking.agency}</span>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col text-sm">
                                                        <span className="font-medium">{booking.startDate}</span>
                                                        <span className="text-xs text-slate-400">au {booking.endDate}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-slate-900">{formatPrice(booking.totalPrice)}</span>
                                                        <span className={`text-[10px] font-bold ${booking.payment === 'Paid' ? 'text-success' : 'text-orange-500'}`}>
                                                            {booking.payment === 'Paid' ? 'PAYÉ' : 'EN ATTENTE'}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={
                                                        booking.status === 'confirmed' ? 'success' :
                                                            booking.status === 'pending' ? 'warning' : 'secondary'
                                                    }>
                                                        {booking.status === 'confirmed' ? 'Confirmé' :
                                                            booking.status === 'pending' ? 'En attente' : 'Terminé'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-40 rounded-xl">
                                                            <DropdownMenuItem className="gap-2 cursor-pointer">
                                                                <Eye className="h-4 w-4" /> Détails
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="gap-2 cursor-pointer">
                                                                <Download className="h-4 w-4" /> Facture
                                                            </DropdownMenuItem>
                                                            {booking.status === 'pending' && (
                                                                <DropdownMenuItem className="gap-2 cursor-pointer text-destructive">
                                                                    <XCircle className="h-4 w-4" /> Annuler
                                                                </DropdownMenuItem>
                                                            )}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default BookingPage;
