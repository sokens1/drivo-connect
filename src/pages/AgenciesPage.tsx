"use client";

import Link from "next/link";
import { MapPin, Star, Shield, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { mockAgencies } from "@/data/mockData";

const AgenciesPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nos agences partenaires
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez les agences vérifiées qui proposent leurs véhicules sur Drivo. 
              Toutes nos agences sont sélectionnées pour leur professionnalisme et la qualité de leur service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAgencies.map((agency) => (
              <Card key={agency.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={agency.logo}
                      alt={agency.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{agency.name}</h3>
                        {agency.verified && (
                          <Shield className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-warning text-warning" />
                        <span className="font-medium">{agency.rating}</span>
                        <span className="text-muted-foreground text-sm">
                          ({agency.reviews} avis)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {agency.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {agency.phone}
                    </div>
                  </div>

                  {agency.verified && (
                    <Badge variant="success" className="mb-4">Agence vérifiée</Badge>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href="/authentification">
                        Voir les véhicules
                      </Link>
                    </Button>
                    <Button variant="icon" size="icon" asChild>
                      <a href={`tel:${agency.phone}`}>
                        <Phone className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA for agencies */}
          <Card className="mt-12 p-8 bg-primary text-primary-foreground text-center">
            <h2 className="font-display text-2xl font-bold mb-3">
              Vous êtes une agence ?
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
              Rejoignez Drivo et accédez à des milliers de clients potentiels au Gabon.
            </p>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/inscription?role=agency">
                Devenir partenaire
                <ExternalLink className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AgenciesPage;
