import { Car, MapPin, Heart, Fuel, Calendar, Settings2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Vehicle, formatPrice, formatNumber } from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import { Link } from "react-router-dom";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const { favorites, toggleFavorite } = useApp();
  const isFavorite = favorites.includes(vehicle.id);

  return (
    <Card className="overflow-hidden group cursor-pointer" aria-label={`Véhicule: ${vehicle.title}`}>
      <Link to={`/vehicule/${vehicle.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={vehicle.image}
            alt={vehicle.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Type badge */}
          <div className="absolute top-3 left-3 flex gap-2">
            {vehicle.type === "vente" && (
              <Badge variant="sale">À vendre</Badge>
            )}
            {vehicle.type === "location" && (
              <Badge variant="rental">Location</Badge>
            )}
            {vehicle.type === "both" && (
              <>
                <Badge variant="sale">Vente</Badge>
                <Badge variant="rental">Location</Badge>
              </>
            )}
          </div>

          {/* Favorite button */}
          <Button
            variant="glass"
            size="iconSm"
            className="absolute top-3 right-3 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(vehicle.id);
            }}
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isFavorite ? "fill-destructive text-destructive" : "text-foreground"
              }`}
            />
          </Button>

          {/* Agency badge */}
          {vehicle.agency.verified && (
            <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1">
              <img
                src={vehicle.agency.logo}
                alt={vehicle.agency.name}
                className="w-5 h-5 rounded-full"
              />
              <span className="text-xs font-medium text-foreground">
                {vehicle.agency.name}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <Link to={`/vehicule/${vehicle.id}`}>
          <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {vehicle.title}
          </h3>
        </Link>

        {/* Quick specs */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {vehicle.year}
          </span>
          <span className="flex items-center gap-1">
            <Settings2 className="h-4 w-4" />
            {formatNumber(vehicle.km)} km
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="h-4 w-4" />
            {vehicle.fuel}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          {vehicle.location}
        </div>

        {/* Price */}
        <div className="pt-2 border-t border-border">
          <div className="flex items-end justify-between">
            <div>
              {vehicle.type !== "location" && (
                <p className="text-lg font-bold text-foreground">
                  {formatPrice(vehicle.price)}
                </p>
              )}
              {vehicle.pricePerDay && (
                <p className="text-sm text-primary font-medium">
                  {formatPrice(vehicle.pricePerDay)}/jour
                </p>
              )}
            </div>
            <Button variant="icon" size="iconSm" asChild>
              <Link to={`/vehicule/${vehicle.id}`} aria-label="Voir les détails">
                <Car className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VehicleCard;
