import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ChevronRight,
  Car,
  Shield,
  Clock,
  CreditCard,
  MapPin,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import { useApp } from "@/context/AppContext";
import heroImage from "@/assets/hero-car.jpg";

const Index = () => {
  const { vehicles } = useApp();
  const [searchQuery, setSearchQuery] = useState("");

  const featuredVehicles = vehicles.slice(0, 4);
  
  const categories = [
    { id: "sedan", label: "Berlines", icon: "🚗", count: 24 },
    { id: "suv", label: "SUV / 4x4", icon: "🚙", count: 18 },
    { id: "compact", label: "Citadines", icon: "🚘", count: 15 },
    { id: "pickup", label: "Pick-up", icon: "🛻", count: 12 },
    { id: "luxe", label: "Luxe", icon: "✨", count: 8 },
  ];

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

              {/* Search Bar */}
              <div className="bg-card/95 backdrop-blur-md rounded-2xl p-4 shadow-xl animate-scale-in">
                <form
                  className="flex flex-col md:flex-row gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.location.href = `/recherche?q=${searchQuery}`;
                  }}
                >
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Marque, modèle, ou mot-clé..."
                      className="pl-12 h-12"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      aria-label="Rechercher un véhicule"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="h-12 hidden md:flex" asChild>
                      <Link to="/recherche?type=location">
                        <Clock className="h-4 w-4 mr-2" />
                        Location
                      </Link>
                    </Button>
                    <Button variant="hero" size="lg" className="h-12 flex-1 md:flex-none" type="submit">
                      <Search className="h-4 w-4 mr-2" />
                      Rechercher
                    </Button>
                  </div>
                </form>
              </div>

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

        {/* Categories Section */}
        <section className="py-16 bg-muted" aria-label="Catégories de véhicules">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Parcourir par catégorie
                </h2>
                <p className="text-muted-foreground mt-1">
                  Trouvez le type de véhicule qui correspond à vos besoins
                </p>
              </div>
              <Button variant="ghost" className="hidden md:flex" asChild>
                <Link to="/recherche">
                  Tout voir
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/recherche?category=${category.id}`}
                  className="group"
                >
                  <Card className="p-6 text-center hover:-translate-y-1">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category.label}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.count} véhicules
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Vehicles */}
        <section className="py-16" aria-label="Véhicules en vedette">
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
                <Link to="/recherche">
                  Voir tout
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-primary text-primary-foreground" aria-label="Pourquoi choisir Drivo">
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
        <section className="py-16" aria-label="Appel à l'action">
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
                    <Link to="/inscription?role=agency">
                      <Car className="h-5 w-5 mr-2" />
                      Devenir partenaire
                    </Link>
                  </Button>
                  <Button variant="outline" size="xl" asChild>
                    <Link to="/contact">En savoir plus</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-muted" aria-label="Témoignages">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Ce que disent nos clients
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              ].map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
