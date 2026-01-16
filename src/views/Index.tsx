"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Car,
  Shield,
  Clock,
  CreditCard,
  MapPin,
  Star,
  ArrowRight,
  Sparkles,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import { useApp } from "@/context/AppContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { mockAgencies } from "@/data/mockData";
const heroImage =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80";

const Index = () => {
  const { vehicles } = useApp();
  const isMobile = useIsMobile();
  const [agencySlide, setAgencySlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [vehicleScrollIndex, setVehicleScrollIndex] = useState(0);

  // Nombre de cartes par slide selon la taille d'écran
  const agenciesPerSlide = isMobile ? 1 : 3;
  const maxAgencySlide = Math.max(0, mockAgencies.length - agenciesPerSlide);

  // Nombre de véhicules visibles selon la taille d'écran
  const vehiclesPerSlide = isMobile ? 1 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? 2 : 4);
  const maxVehicleSlide = Math.max(0, vehicles.length - vehiclesPerSlide);

  const featuredVehicles = vehicles.slice(0, 4);

  // Autoplay du carousel
  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setAgencySlide((current) => {
        if (current >= maxAgencySlide) {
          return 0; // Recommencer depuis le début
        }
        return current + 1;
      });
    }, 5000); // Changer de slide tous les 5 secondes

    return () => clearInterval(interval);
  }, [isAutoplay, maxAgencySlide]);

  const features = [
    {
      icon: Shield,
      title: "Véhicules vérifiés",
      description: "Chaque véhicule est inspecté et certifié par nos experts",
    },
    {
      icon: Clock,
      title: "Réponse rapide",
      description: "Les agences répondent en moins de 2 heures en moyenne",
    },
    {
      icon: CreditCard,
      title: "Paiement sécurisé",
      description: "Orange Money, Airtel Money et cartes bancaires acceptés",
    },
    {
      icon: MapPin,
      title: "Partout au Gabon",
      description: "Libreville, Port-Gentil, Franceville et toutes les provinces",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden" aria-label="Section d'accueil">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt="Véhicule de luxe au Gabon"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-transparent" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl space-y-6 animate-slide-up">
              <Badge variant="secondary" className="bg-primary/20 text-primary border-0">
                <Sparkles className="h-3 w-3 mr-1" />
                La 1ère plateforme auto au Gabon
              </Badge>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-tight">
                Trouvez votre véhicule <span className="text-primary">idéal</span>
              </h1>

              <p className="text-lg text-background/80 max-w-lg">
                Achetez ou louez votre prochain véhicule parmi des centaines d'offres
                vérifiées sur tout le territoire gabonais.
              </p>

              {/* CTA Button */}
              <Button variant="hero" size="lg" asChild>
                <Link href="/#vehicules">
                  Voir les offres
                </Link>
              </Button>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="text-background">
                  <p className="text-3xl font-bold">500+</p>
                  <p className="text-sm text-background/70">Véhicules</p>
                </div>
                <div className="text-background">
                  <p className="text-3xl font-bold">50+</p>
                  <p className="text-sm text-background/70">Agences</p>
                </div>
                <div className="text-background">
                  <p className="text-3xl font-bold">9</p>
                  <p className="text-sm text-background/70">Provinces</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Vehicles */}
        <section id="vehicules" className="py-16" aria-label="Véhicules en vedette">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Véhicules en vedette
                </h2>
                <p className="text-muted-foreground mt-1">
                  Les meilleures offres du moment
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/search">
                  Voir tout
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Horizontal scrollable carousel */}
            <div className="relative">
              <div
                className="overflow-x-auto scrollbar-hide"
                onScroll={(e) => {
                  const scrollLeft = e.currentTarget.scrollLeft;
                  const cardWidth = e.currentTarget.offsetWidth / vehiclesPerSlide;
                  const index = Math.round(scrollLeft / cardWidth);
                  setVehicleScrollIndex(Math.min(index, Math.max(0, featuredVehicles.length - vehiclesPerSlide)));
                }}
              >
                <div className="flex gap-6 pb-4">
                  {featuredVehicles.map((vehicle) => (
                    <div key={vehicle.id} className="min-w-[calc(100vw-2rem)] sm:min-w-[calc(50vw-2rem)] lg:min-w-[calc(25vw-1.5rem)]">
                      <VehicleCard vehicle={vehicle} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Scroll indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: Math.ceil(featuredVehicles.length / vehiclesPerSlide) }).map(
                  (_, index) => (
                    <button
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${index === vehicleScrollIndex ? "bg-primary w-8" : "bg-muted w-2"
                        }`}
                      aria-label={`Aller à la diapositive ${index + 1}`}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="pourquoi-nous" className="py-16 bg-primary text-primary-foreground" aria-label="Pourquoi choisir Drivo">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                Pourquoi choisir Drivo ?
              </h2>
              <p className="text-primary-foreground/80 mt-2 max-w-2xl mx-auto">
                La plateforme de confiance pour acheter ou louer votre véhicule au Gabon
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-primary-foreground/80">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="nos-agences" className="py-16" aria-label="Appel à l'action">
          <div className="container mx-auto px-4">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-muted to-background border-2 border-primary/20 overflow-hidden relative">
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -left-10 -top-10 w-40 h-40 bg-success/10 rounded-full blur-3xl" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                    Vous êtes une agence ?
                  </h2>
                  <p className="text-muted-foreground max-w-lg">
                    Rejoignez Drivo et touchez des milliers de clients potentiels.
                    Gérez vos annonces facilement et boostez vos ventes.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="hero" size="xl" asChild>
                    <Link href="/inscription?role=agency">
                      <Car className="h-5 w-5 mr-2" />
                      Devenir partenaire
                    </Link>
                  </Button>
                  <Button variant="outline" size="xl" asChild>
                    <Link href="/contact">En savoir plus</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Partner Agencies Carousel */}
        <section className="py-8 bg-background" aria-label="Agences partenaires">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                Agences partenaires
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Découvrez nos agences partenaires de confiance à travers tout le Gabon
              </p>
            </div>

            <div
              className="relative group"
              onMouseEnter={() => setIsAutoplay(false)}
              onMouseLeave={() => setIsAutoplay(true)}
            >
              <div className="overflow-hidden rounded-2xl">
                <div
                  className="flex transition-all duration-700 ease-in-out gap-6"
                  style={{ transform: `translateX(-${agencySlide * 100}%)` }}
                >
                  {mockAgencies.map((agency, index) => (
                    <div
                      key={agency.id}
                      className="min-w-[calc(100%-1rem)] sm:min-w-[calc(50%-1rem)] lg:min-w-[calc(33.333%-1rem)] flex-shrink-0"
                    >
                      <Card className="p-6 h-full bg-card border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <CardContent className="p-0 flex flex-col items-center text-center h-full">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 ring-2 ring-primary/30">
                            <img
                              src={agency.logo}
                              alt={agency.name}
                              className="w-10 h-10 rounded"
                            />
                          </div>
                          <h3 className="font-semibold text-lg mb-1">{agency.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{agency.location}</p>
                          <div className="flex items-center gap-1 mb-3">
                            <Star className="h-4 w-4 fill-warning text-warning" />
                            <span className="text-sm font-medium">{agency.rating}</span>
                            <span className="text-sm text-muted-foreground">({agency.reviews} avis)</span>
                          </div>
                          {agency.verified && (
                            <Badge variant="success" className="mb-3">Agence vérifiée</Badge>
                          )}
                          <Button variant="outline" size="sm" className="w-full mt-auto hover:bg-primary hover:text-primary-foreground transition-all duration-200" asChild>
                            <Link href="/authentification">
                              Voir les véhicules
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Controls */}
              {mockAgencies.length > agenciesPerSlide && (
                <div className="flex justify-center items-center gap-3 mt-8">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setAgencySlide(Math.max(0, agencySlide - 1))}
                    disabled={agencySlide === 0}
                    aria-label="Précédent"
                    className="md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>

                  {/* Slide indicators */}
                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.ceil(mockAgencies.length / agenciesPerSlide) }).map(
                      (_, index) => (
                        <button
                          key={index}
                          onClick={() => setAgencySlide(index)}
                          className={`h-2 rounded-full transition-all duration-300 ${index === agencySlide ? "bg-primary w-8" : "bg-muted w-2"
                            }`}
                          aria-label={`Aller à la diapositive ${index + 1}`}
                        />
                      )
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setAgencySlide(Math.min(maxAgencySlide, agencySlide + 1))}
                    disabled={agencySlide >= maxAgencySlide}
                    aria-label="Suivant"
                    className="md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="nos-clients" className="py-16 bg-muted" aria-label="Témoignages">
          <div className="w-full">
            <div className="text-center mb-12 px-4">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Ce que disent nos clients
              </h2>
            </div>

            {/* Continuous scrolling ticker */}
            <div className="overflow-hidden px-4 sm:px-0">
              <div className="flex gap-6 animate-scroll">
                {[
                  {
                    name: "Jean-Pierre M.",
                    role: "Acheteur",
                    content: "J'ai trouvé ma Toyota en moins d'une semaine. Le processus était simple et sécurisé.",
                    rating: 5,
                  },
                  {
                    name: "Marie-Claire N.",
                    role: "Locataire",
                    content: "Super service de location ! L'agence était très réactive et le véhicule impeccable.",
                    rating: 5,
                  },
                  {
                    name: "Patrick O.",
                    role: "Agence partenaire",
                    content: "Drivo nous a permis d'augmenter nos ventes de 40%. Une plateforme indispensable !",
                    rating: 5,
                  },
                  {
                    name: "Jean-Pierre M.",
                    role: "Acheteur",
                    content: "J'ai trouvé ma Toyota en moins d'une semaine. Le processus était simple et sécurisé.",
                    rating: 5,
                  },
                  {
                    name: "Marie-Claire N.",
                    role: "Locataire",
                    content: "Super service de location ! L'agence était très réactive et le véhicule impeccable.",
                    rating: 5,
                  },
                  {
                    name: "Patrick O.",
                    role: "Agence partenaire",
                    content: "Drivo nous a permis d'augmenter nos ventes de 40%. Une plateforme indispensable !",
                    rating: 5,
                  },
                ].map((testimonial, index) => (
                  <Card key={index} className="p-6 flex-shrink-0 w-[calc(100vw-2rem)] sm:w-[calc(50vw-2rem)] md:w-[calc(33.333%-1rem)]">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                      ))}
                    </div>
                    <p className="text-foreground mb-4 min-h-[60px]">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
