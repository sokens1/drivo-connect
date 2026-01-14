"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  MapPin,
  X,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/data/mockData";

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { vehicles } = useApp();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recent");
  const [typeFilter, setTypeFilter] = useState(searchParams.get("type") || "all");
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "all");
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [locationFilter, setLocationFilter] = useState("");

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesQuery =
          vehicle.title.toLowerCase().includes(query) ||
          vehicle.brand.toLowerCase().includes(query) ||
          vehicle.model.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Type filter
      if (typeFilter !== "all") {
        if (typeFilter === "vente" && vehicle.type === "location") return false;
        if (typeFilter === "location" && vehicle.type === "vente") return false;
      }

      // Category filter
      if (categoryFilter !== "all" && vehicle.category !== categoryFilter) {
        return false;
      }

      // Price filter
      if (vehicle.price < priceRange[0] || vehicle.price > priceRange[1]) {
        return false;
      }

      // Location filter
      if (locationFilter && !vehicle.location.toLowerCase().includes(locationFilter.toLowerCase())) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "popular":
          return b.views - a.views;
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [vehicles, searchQuery, typeFilter, categoryFilter, priceRange, locationFilter, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setTypeFilter("all");
    setCategoryFilter("all");
    setPriceRange([0, 50000000]);
    setLocationFilter("");
    router.push("/recherche");
  };

  const hasActiveFilters = searchQuery || typeFilter !== "all" || categoryFilter !== "all" || locationFilter;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Search Header */}
        <section className="bg-primary py-8">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Rechercher un véhicule
            </h1>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Marque, modèle, ou mot-clé..."
                  className="pl-12 h-12 bg-card"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Rechercher"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-40 h-12 bg-card">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="vente">À vendre</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-40 h-12 bg-card">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="sedan">Berlines</SelectItem>
                  <SelectItem value="suv">SUV / 4x4</SelectItem>
                  <SelectItem value="compact">Citadines</SelectItem>
                  <SelectItem value="pickup">Pick-up</SelectItem>
                  <SelectItem value="luxe">Luxe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <nav className="flex items-center gap-2 text-sm" aria-label="Fil d'Ariane">
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Accueil
                </Link>
              </nav>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{filteredVehicles.length}</span> véhicules trouvés
                </p>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-destructive">
                    <X className="h-4 w-4 mr-1" />
                    Effacer les filtres
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Mobile Filters */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="md:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filtres
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[80vh]">
                    <SheetHeader>
                      <SheetTitle>Filtres</SheetTitle>
                    </SheetHeader>
                    <div className="py-6 space-y-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Localisation</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Ville ou province"
                            className="pl-10"
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-4 block">
                          Prix: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                        </label>
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          min={0}
                          max={50000000}
                          step={500000}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Desktop Filters */}
                <div className="hidden md:flex items-center gap-2">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Localisation"
                      className="pl-10 w-40"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                    />
                  </div>
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Plus récents</SelectItem>
                    <SelectItem value="popular">Plus vus</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="hidden md:flex border rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    aria-label="Vue grille"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    aria-label="Vue liste"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active filters badges */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    Recherche: {searchQuery}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                  </Badge>
                )}
                {typeFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {typeFilter === "vente" ? "À vendre" : "Location"}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setTypeFilter("all")} />
                  </Badge>
                )}
                {categoryFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {categoryFilter}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setCategoryFilter("all")} />
                  </Badge>
                )}
                {locationFilter && (
                  <Badge variant="secondary" className="gap-1">
                    {locationFilter}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setLocationFilter("")} />
                  </Badge>
                )}
              </div>
            )}

            {/* Results Grid */}
            {filteredVehicles.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "flex flex-col gap-4"
                }
              >
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  Aucun véhicule trouvé
                </h3>
                <p className="text-muted-foreground mb-4">
                  Essayez de modifier vos critères de recherche
                </p>
                <Button onClick={clearFilters}>Réinitialiser les filtres</Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;
