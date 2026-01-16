"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Star,
  Shield,
  Phone,
  ExternalLink,
  Grid3X3,
  List,
  Search,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardLayout from "@/components/DashboardLayout";
import { mockAgencies } from "@/data/mockData";
import { useApp } from "@/context/AppContext";

const AgenciesPage = () => {
  const { user } = useApp();
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredAgencies = mockAgencies.filter(agency =>
    agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agency.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const MainContent = () => (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            Nos agences partenaires
          </h1>
          <p className="text-muted-foreground">
            {filteredAgencies.length} agence{filteredAgencies.length !== 1 ? 's' : ''} vérifiée{filteredAgencies.length !== 1 ? 's' : ''} au Gabon
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une agence..."
              className="pl-9 bg-slate-100 border-none rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgencies.map((agency) => (
            <Card key={agency.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-none shadow-sm group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative">
                    <img
                      src={agency.logo}
                      alt={agency.name}
                      className="w-20 h-20 rounded-2xl object-cover border-4 border-slate-50 shadow-md group-hover:scale-105 transition-transform"
                    />
                    {agency.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-full border-2 border-white">
                        <Shield className="h-3 w-3 fill-current" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{agency.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-bold text-sm">{agency.rating}</span>
                      <span className="text-slate-400 text-xs">({agency.reviews} avis)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-xl">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <MapPin className="h-4 w-4 text-primary" />
                    {agency.location}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Phone className="h-4 w-4 text-primary" />
                    {agency.phone}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="hero" className="flex-1 rounded-xl" asChild>
                    <Link href={`/search?agency=${agency.id}`}>
                      Consulter le parc
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl" asChild>
                    <a href={`tel:${agency.phone}`}>
                      <Phone className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          {filteredAgencies.map((agency, index) => (
            <div key={agency.id} className={`p-6 flex flex-col md:flex-row items-center gap-6 hover:bg-slate-50 transition-colors ${index !== filteredAgencies.length - 1 ? 'border-b' : ''}`}>
              <img
                src={agency.logo}
                alt={agency.name}
                className="w-16 h-16 rounded-xl object-cover shadow-sm"
              />
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-bold text-lg flex items-center gap-2 justify-center md:justify-start">
                  {agency.name}
                  {agency.verified && <Shield className="h-4 w-4 text-primary fill-primary/20" />}
                </h3>
                <div className="flex items-center gap-4 mt-1 justify-center md:justify-start">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    <span className="text-sm font-semibold">{agency.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="h-3 w-3" />
                    {agency.location}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" asChild className="rounded-xl">
                  <a href={`tel:${agency.phone}`}>Appeler</a>
                </Button>
                <Button variant="hero" asChild className="rounded-xl px-8">
                  <Link href={`/search?agency=${agency.id}`}>Voir véhicules</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!user && (
        <Card className="mt-12 p-10 bg-gradient-to-br from-primary to-primary/80 text-white text-center rounded-3xl border-none shadow-xl">
          <h2 className="text-3xl font-bold mb-4">
            Vous gérez un parc automobile ?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-lg mx-auto text-lg">
            Rejoignez Drivo et boostez la visibilité de votre agence auprès de milliers de clients au Gabon.
          </p>
          <Button variant="secondary" size="xl" className="rounded-2xl px-10 shadow-lg hover:scale-105 transition-transform" asChild>
            <Link href="/inscription?role=agency">
              Devenir partenaire
              <ExternalLink className="h-5 w-5 ml-3" />
            </Link>
          </Button>
        </Card>
      )}
    </div>
  );

  // Avoid flash of guest UI by waiting for mount
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
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <MainContent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AgenciesPage;
