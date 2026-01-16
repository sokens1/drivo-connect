"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Heart,
  Car,
  Search,
  Grid3X3,
  List
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import VehicleCard from "@/components/VehicleCard";
import { useApp } from "@/context/AppContext";

const FavoritesPage = () => {
  const { vehicles, favorites } = useApp();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const favoriteVehicles = useMemo(() =>
    vehicles.filter((v) => favorites.includes(v.id)),
    [vehicles, favorites]
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header section matching Search UI style */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Heart className="h-8 w-8 text-destructive fill-destructive" />
              Mes favoris
            </h1>
            <p className="text-slate-500 font-medium">
              {favoriteVehicles.length} véhicule{favoriteVehicles.length !== 1 ? "s" : ""} sauvegardé{favoriteVehicles.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-slate-100 p-1 rounded-lg border shadow-sm">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                className={`h-8 px-2 ${viewMode === 'grid' ? 'shadow-sm' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                className={`h-8 px-2 ${viewMode === 'list' ? 'shadow-sm' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="hero" asChild>
              <Link href="/search">
                <Search className="h-4 w-4 mr-2" />
                Explorer
              </Link>
            </Button>
          </div>
        </div>

        <div className="h-px bg-slate-200 w-full" />

        {favoriteVehicles.length > 0 ? (
          <div className={viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "flex flex-col gap-6"
          }>
            {favoriteVehicles.map((vehicle) => (
              <div key={vehicle.id} className="transition-all active:scale-95">
                <VehicleCard vehicle={vehicle} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 max-w-2xl mx-auto px-6">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
              <Heart className="h-10 w-10 text-slate-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Votre liste est vide
            </h2>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">
              Parcourez nos annonces et cliquez sur l'icône de cœur pour ajouter des véhicules à vos favoris.
            </p>
            <Button size="xl" variant="hero" asChild>
              <Link href="/search">
                <Car className="h-5 w-5 mr-2" />
                Découvrir les offres
              </Link>
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FavoritesPage;
