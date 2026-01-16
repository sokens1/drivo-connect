"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search as SearchIcon,
  SlidersHorizontal,
  Grid3X3,
  MapPin,
  X,
  ChevronDown,
  Car,
  Settings2,
  Filter,
  ArrowUpDown,
  Navigation,
  Compass
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
import { Switch } from "@/components/ui/switch";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardLayout from "@/components/DashboardLayout";
import VehicleCard from "@/components/VehicleCard";
import { useApp } from "@/context/AppContext";
import { formatPrice, mockAgencies } from "@/data/mockData";
import { useDebounce } from "@/hooks/use-debounce";

const provinces = [
  "Estuaire",
  "Haut-Ogooué",
  "Moyen-Ogooué",
  "Ngounié",
  "Nyanga",
  "Ogooué-Ivindo",
  "Ogooué-Lolo",
  "Ogooué-Maritime",
  "Woleu-Ntem"
];

const roadTypes = [
  { label: "Asphaltée", value: "paved" },
  { label: "Piste / Latérite", value: "unpaved" }
];

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { vehicles, user } = useApp();
  const [mounted, setMounted] = useState(false);

  const [searchQuery, setSearchQuery] = useState(searchParams?.get("q") || "");
  const debouncedQuery = useDebounce(searchQuery, 300);

  const [sortBy, setSortBy] = useState("recent");
  const [typeFilter, setTypeFilter] = useState(searchParams?.get("type") || "all");
  const [categoryFilter, setCategoryFilter] = useState(searchParams?.get("category") || "all");
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [provinceFilter, setProvinceFilter] = useState("all");
  const [agencyFilter, setAgencyFilter] = useState(searchParams?.get("agency") || "all");
  const [isOffRoad, setIsOffRoad] = useState(false);
  const [roadType, setRoadType] = useState("all");

  const [displayCount, setDisplayCount] = useState(8);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update agency filter if URL param changes
  useEffect(() => {
    const agencyParam = searchParams?.get("agency");
    if (agencyParam) {
      setAgencyFilter(agencyParam);
    }
  }, [searchParams]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      if (debouncedQuery) {
        const query = debouncedQuery.toLowerCase();
        const matchesQuery =
          vehicle.title.toLowerCase().includes(query) ||
          vehicle.brand.toLowerCase().includes(query) ||
          vehicle.model.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      if (typeFilter !== "all") {
        if (typeFilter === "vente" && vehicle.type === "location") return false;
        if (typeFilter === "location" && vehicle.type === "vente") return false;
      }

      if (categoryFilter !== "all" && vehicle.category !== categoryFilter) {
        return false;
      }

      if (vehicle.price < priceRange[0] || (priceRange[1] < 50000000 && vehicle.price > priceRange[1])) {
        return false;
      }

      if (provinceFilter !== "all" && !vehicle.location.includes(provinceFilter)) {
        return false;
      }

      if (agencyFilter !== "all" && vehicle.agency.id !== agencyFilter) {
        return false;
      }

      if (isOffRoad && !["suv", "pickup"].includes(vehicle.category)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "popular": return b.views - a.views;
        default: return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [vehicles, debouncedQuery, typeFilter, categoryFilter, priceRange, provinceFilter, agencyFilter, isOffRoad, sortBy]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayCount < filteredVehicles.length) {
          setDisplayCount((prev) => prev + 4);
        }
      },
      { threshold: 1.0 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [displayCount, filteredVehicles.length]);

  const clearFilters = () => {
    setSearchQuery("");
    setTypeFilter("all");
    setCategoryFilter("all");
    setPriceRange([0, 50000000]);
    setProvinceFilter("all");
    setAgencyFilter("all");
    setIsOffRoad(false);
    setRoadType("all");
  };

  const hasActiveFilters = searchQuery || typeFilter !== "all" || categoryFilter !== "all" || provinceFilter !== "all" || agencyFilter !== "all" || isOffRoad;

  const MainContent = () => (
    <div className="flex-1">
      <section className={user ? "sticky top-0 z-40 bg-white border-b shadow-sm" : "sticky top-16 z-40 bg-white border-b shadow-sm"}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 w-full relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="search"
                placeholder="Rechercher par marque ou modèle..."
                className="pl-12 h-12 bg-slate-100 border-none rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40 h-12 rounded-xl bg-white border-slate-200"><SelectValue placeholder="Usage" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Vente & Location</SelectItem>
                  <SelectItem value="vente">À vendre</SelectItem>
                  <SelectItem value="location">Louer</SelectItem>
                </SelectContent>
              </Select>
              <Select value={provinceFilter} onValueChange={setProvinceFilter}>
                <SelectTrigger className="w-44 h-12 rounded-xl bg-white border-slate-200">
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /><SelectValue placeholder="Localisation" /></div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tout le Gabon</SelectItem>
                  {provinces.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={agencyFilter} onValueChange={setAgencyFilter}>
                <SelectTrigger className="w-44 h-12 rounded-xl bg-white border-slate-200">
                  <SelectValue placeholder="Agence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les agences</SelectItem>
                  {mockAgencies.map(a => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 bg-white px-4 h-12 rounded-xl border border-slate-200">
                <span className="text-sm font-medium text-slate-600">4x4</span>
                <Switch checked={isOffRoad} onCheckedChange={setIsOffRoad} />
              </div>
              <Sheet>
                <SheetTrigger asChild><Button variant="outline" className="h-12 w-12 rounded-xl p-0"><SlidersHorizontal className="h-5 w-5" /></Button></SheetTrigger>
                <SheetContent className="w-full sm:max-w-md">
                  <SheetHeader><SheetTitle className="text-2xl">Filtres avancés</SheetTitle></SheetHeader>
                  <div className="py-8 space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-base font-semibold">Budget (XAF)</label>
                        <Badge variant="secondary" className="font-mono">{formatPrice(priceRange[0])} - {priceRange[1] >= 50000000 ? "Max" : formatPrice(priceRange[1])}</Badge>
                      </div>
                      <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={50000000} step={1000000} className="py-4" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-base font-semibold">Agence</label>
                      <Select value={agencyFilter} onValueChange={setAgencyFilter}>
                        <SelectTrigger className="w-full h-12 rounded-xl bg-slate-50 border-none">
                          <SelectValue placeholder="Choisir une agence" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes les agences</SelectItem>
                          {mockAgencies.map(a => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-4">
                      <label className="text-base font-semibold flex items-center gap-2"><Compass className="h-5 w-5 text-primary" />Zone Géographique</label>
                      <div className="rounded-xl overflow-hidden h-40 border relative group">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1020349.5630654067!2d9.4674!3d0.4162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x107f3ba3ca9695d7%3A0xc6f3f00125023927!2sGabon!5e0!3m2!1sfr!2sga!4v1715800000000!5m2!1sfr!2sga" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-base font-semibold">Type de route</label>
                      <div className="grid grid-cols-2 gap-3">
                        {roadTypes.map(rt => (<Button key={rt.value} variant={roadType === rt.value ? "default" : "outline"} onClick={() => setRoadType(rt.value)} className="rounded-xl">{rt.label}</Button>))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white/50 py-4">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-slate-600 font-medium"><span className="text-primary font-bold">{filteredVehicles.length}</span> résultats au Gabon</h2>
            {hasActiveFilters && (<Button variant="ghost" size="sm" onClick={clearFilters} className="text-slate-400 hover:text-destructive h-7 px-2">Effacer</Button>)}
          </div>
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 h-10 bg-transparent border-none">
                <ArrowUpDown className="h-4 w-4 mr-2" /><SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Nouveautés</SelectItem>
                <SelectItem value="popular">Popularité</SelectItem>
                <SelectItem value="price-asc">Prix min</SelectItem>
                <SelectItem value="price-desc">Prix max</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
      <section className="py-8">
        <div className="container mx-auto px-4">
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVehicles.slice(0, displayCount).map((vehicle) => (<div key={vehicle.id} className="transition-all active:scale-95"><VehicleCard vehicle={vehicle} /></div>))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6"><SearchIcon className="h-10 w-10 text-slate-400" /></div>
              <h3 className="text-xl font-bold mb-2">Aucun véhicule trouvé</h3>
            </div>
          )}
          {displayCount < filteredVehicles.length && (<div ref={loaderRef} className="py-12 flex justify-center text-primary font-medium">Chargement...</div>)}
        </div>
      </section>
    </div>
  );

  if (!mounted) return <div className="min-h-screen bg-slate-50" />;

  if (user) {
    return (
      <DashboardLayout>
        <MainContent />
      </DashboardLayout>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default SearchPage;
