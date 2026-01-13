import { Link } from "react-router-dom";
import { Heart, Trash2, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import { useApp } from "@/context/AppContext";

const FavoritesPage = () => {
  const { vehicles, favorites } = useApp();
  
  const favoriteVehicles = vehicles.filter((v) => favorites.includes(v.id));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                <Heart className="h-8 w-8 text-destructive" />
                Mes favoris
              </h1>
              <p className="text-muted-foreground mt-1">
                {favoriteVehicles.length} véhicule{favoriteVehicles.length !== 1 ? "s" : ""} sauvegardé{favoriteVehicles.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {favoriteVehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Heart className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Aucun favori pour l'instant
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Explorez notre catalogue et ajoutez des véhicules à vos favoris pour les retrouver facilement.
              </p>
              <Button variant="hero" asChild>
                <Link to="/recherche">
                  <Car className="h-5 w-5 mr-2" />
                  Explorer les véhicules
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FavoritesPage;
